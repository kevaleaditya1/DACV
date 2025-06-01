import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      navigate('/dashboard');
      window.dispatchEvent(new Event('storage')); // update login state in Header
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded mb-2">
            Login
          </button>
          <div className="text-center mt-2">
            Not registered? <Link to="/register" className="text-primary-600 underline">Register now</Link>
          </div>
          {message && <div className="mt-2 text-center text-red-500">{message}</div>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;