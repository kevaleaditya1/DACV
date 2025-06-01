import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
        return;
      }
      localStorage.setItem('token', data.token);
      setMessage('Registration successful!');
      navigate('/dashboard');
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
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
            Register
          </button>
          <div className="text-center mt-2">
            Already have an account? <a href="/login" className="text-primary-600 underline">Login</a>
          </div>
          {message && <div className="mt-2 text-center text-red-500">{message}</div>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;