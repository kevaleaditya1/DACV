import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { prisma } from './prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cors } from 'hono/cors';
import fs from 'fs';
import path from 'path';

const app = new Hono();
const JWT_SECRET = 'your-secret-key';

// Enable CORS for all routes
app.use('*', cors());

// Register
app.post('/api/auth/register', async (c) => {
  const { email, password } = await c.req.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return c.json({ message: 'User already exists' }, 400);
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return c.json({ token });
});

// Login
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ message: 'Invalid credentials' }, 401);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return c.json({ message: 'Invalid credentials' }, 401);
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return c.json({ token });
});

app.get('/', (c) => c.text('Hono + Prisma Auth API'));

// Middleware to authenticate JWT and get user
const auth = async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader) return c.json({ message: 'Unauthorized' }, 401);
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    c.user = payload;
    await next();
  } catch {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};

// Get profile
app.get('/api/profile', auth, async (c) => {
  const user = await prisma.user.findUnique({
    where: { id: c.user.userId },
    select: { id: true, email: true, name: true, avatar: true } // <-- add avatar here
  });
  return c.json(user);
});

// Serve static files from /uploads (add this near your app/server setup)
import { serveStatic } from '@hono/node-server/serve-static';
app.use('/uploads/*', serveStatic({ root: './' }));

// Update profile
app.put('/api/profile', auth, async (c) => {
  if (c.req.header('content-type')?.startsWith('multipart/form-data')) {
    const form = await c.req.formData();
    const name = form.get('name');
    const phone = form.get('phone');
    const address = form.get('address');
    const rollNumber = form.get('rollNumber');
    const branch = form.get('branch');
    const year = form.get('year') ? Number(form.get('year')) : null;
    const avatarFile = form.get('avatar');

    let avatar;
    if (avatarFile && avatarFile.name) {
      // Save file to /uploads
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}_${avatarFile.name}`;
      const filePath = `uploads/${fileName}`;
      fs.writeFileSync(filePath, buffer);
      avatar = `/uploads/${fileName}`;
    }

    let updateData = { name, phone, address, rollNumber, branch, year };
    if (avatar) updateData.avatar = avatar;

    const user = await prisma.user.update({
      where: { id: c.user.userId },
      data: updateData
    });
    return c.json({ message: 'Profile updated!', user });
  } else {
    // fallback for JSON (no file)
    let { name, phone, address, rollNumber, branch, year, avatar } = await c.req.json();
    year = year !== undefined && year !== null && year !== '' ? Number(year) : null;
    const user = await prisma.user.update({
      where: { id: c.user.userId },
      data: { name, phone, address, rollNumber, branch, year, avatar }
    });
    return c.json({ message: 'Profile updated!', user });
  }
});

// Start the server on port 3000 (or any port you like)
serve({ fetch: app.fetch, port: 3000 });