import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShield, FiClipboard, FiCheckCircle } from 'react-icons/fi';

const Verification = () => {
  const [credentialId, setCredentialId] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    // Simulate verification logic
    setIsVerified(credentialId.length > 10);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-10 border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield size={24} className="text-primary-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify a Credential</h2>
            <p className="text-gray-600">
              Check the authenticity of any academic credential issued on our platform
            </p>
          </div>
          
          <form onSubmit={handleVerify} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="credential-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Credential ID or Verification Link
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="credential-id"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter credential ID or URL"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="md:pt-7">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  Verify Credential
                </button>
              </div>
            </div>
          </form>
          
          {isVerified !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-lg ${isVerified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 mt-1 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
                  {isVerified ? (
                    <FiCheckCircle size={20} />
                  ) : (
                    <FiClipboard size={20} />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${isVerified ? 'text-green-800' : 'text-red-800'}`}>
                    {isVerified ? 'Credential Verified' : 'Credential Not Found'}
                  </h3>
                  <div className={`mt-1 text-sm ${isVerified ? 'text-green-700' : 'text-red-700'}`}>
                    {isVerified ? (
                      <p>This credential has been verified and is authentic. It was issued by MIT on 15 June 2023.</p>
                    ) : (
                      <p>We couldn't find a credential with that ID. Please check the ID and try again.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Need help verifying a credential? <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Verification;
