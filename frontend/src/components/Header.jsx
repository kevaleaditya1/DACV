import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiShield, FiHome, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for login/logout changes in other tabs
  useEffect(() => {
    const syncLogin = () => setLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
            </motion.div>
            <span className="text-xl font-bold text-gray-800">CredVerify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Home</Link>
            <Link to="/verify" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Verify</Link>
            <Link to="/issuer" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">For Institutions</Link>
            
            <div className="flex space-x-4">
              {loggedIn ? (
                <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center space-x-2">
                  <FiUser size={16} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link to="/login" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors flex items-center space-x-2">
                  <FiUser size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 space-y-4"
          >
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <FiHome size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/verify" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <FiShield size={18} />
              <span>Verify Credentials</span>
            </Link>
            <Link 
              to="/issuer" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <FiAward size={18} />
              <span>For Institutions</span>
            </Link>
            {loggedIn ? (
              <Link 
                to="/dashboard" 
                className="block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <FiUser size={18} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <FiUser size={18} />
                <span>Login</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;