import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle, FiShare2, FiDownload } from 'react-icons/fi';

const CredentialCard = ({ credential }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <FiAward size={20} className="text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{credential.title}</h3>
              <p className="text-sm text-gray-500">{credential.institution}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
            <FiCheckCircle className="mr-1" size={12} /> Verified
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Issued On</p>
            <p className="text-sm font-medium">{credential.issuedDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Credential ID</p>
            <p className="text-sm font-medium font-mono truncate">{credential.id}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium">
            <FiShare2 size={16} className="mr-2" /> Share
          </button>
          <button className="text-gray-700 hover:text-gray-900 flex items-center text-sm font-medium">
            <FiDownload size={16} className="mr-2" /> Download
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <a 
          href={`https://etherscan.io/tx/${credential.txHash}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
        >
          View on blockchain explorer
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default CredentialCard;