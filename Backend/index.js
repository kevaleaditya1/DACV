import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { prisma } from './prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cors } from 'hono/cors';

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

// Start the server on port 3000 (or any port you like)
serve({ fetch: app.fetch, port: 3000 });