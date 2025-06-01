import { useState, useEffect } from 'react';
import { FiUser, FiAward, FiShield, FiSettings, FiLogOut, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CredentialCard from '../components/CredentialCard';
import Footer from '../components/Footer';
import ProfileForm from '../components/ProfileForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('credentials');
  const [profile, setProfile] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  
  const credentials = [
    {
      id: "0x8a7d...3f2b",
      title: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      issuedDate: "May 15, 2023",
      txHash: "0x8a7d6f3e2c1a9b8e5d4f7g6h5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8a7b6c5d4e3f2b"
    },
    {
      id: "0x5d4f...7g6h",
      title: "Machine Learning Specialization",
      institution: "Coursera",
      issuedDate: "March 2, 2023",
      txHash: "0x5d4f7g6h5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8a7b6c5d4e3f2b1a9b8e5d4f7g6h"
    },
    {
      id: "0x2m1n...0o9p",
      title: "Blockchain Developer Certification",
      institution: "Ethereum Foundation",
      issuedDate: "January 10, 2023",
      txHash: "0x2m1n0o9p8q7r6s5t4u3v2w1x0y9z8a7b6c5d4e3f2b1a9b8e5d4f7g6h5j4k3l2m1n0o9p"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage')); // update login state in Header
    navigate('/login');
  };

  useEffect(() => {
    // Optional: Redirect to login if not authenticated
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch profile on mount
    fetch('http://localhost:3000/api/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
              <div className="flex items-center mb-6">
                <img 
                  src={profile.avatar || "https://randomuser.me/api/portraits/men/46.jpg"}
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <p
                    className="text-sm text-gray-500 truncate max-w-[140px]" // adjust max-w as needed
                    title={profile.email}
                  >
                    {profile.email}
                  </p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('credentials')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'credentials' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiAward className="mr-3" /> My Credentials
                </button>
                <button
                  onClick={() => setActiveTab('verifications')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'verifications' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiShield className="mr-3" /> Verifications
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiUser className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg flex items-center text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3" /> Logout
                </button>
              </nav>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 text-white"
            >
              <h3 className="font-semibold mb-2">Request Credential</h3>
              <p className="text-sm mb-4">Ask your institution to issue a verifiable credential</p>
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <FiPlus className="mr-2" /> Request Now
              </button>
            </motion.div>
          </motion.div>
          
          {/* Main Content */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Credentials</h2>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                  <FiPlus className="mr-2" /> Add Credential
                </button>
              </div>
              
              {activeTab === 'credentials' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {credentials.map((credential, index) => (
                    <CredentialCard key={index} credential={credential} />
                  ))}
                </div>
              )}
              
              {activeTab === 'verifications' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiShield size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No verification requests</h3>
                  <p className="text-gray-500">When someone requests to verify your credentials, they'll appear here.</p>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <ProfileForm profile={profile} setProfile={setProfile} />
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                  {/* Settings form would go here */}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;