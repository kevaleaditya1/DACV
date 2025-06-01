import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: "How does blockchain make credential verification more secure?",
    answer: "Blockchain provides an immutable, decentralized ledger where credentials are recorded. Once issued, they cannot be altered or deleted, eliminating the possibility of forgery."
  },
  {
    question: "What types of credentials can be issued on your platform?",
    answer: "Our platform supports degrees, diplomas, certificates, transcripts, badges, and any other type of academic achievement. Each is cryptographically signed by the issuing institution."
  },
  {
    question: "Do students need to understand blockchain to use this?",
    answer: "No, the blockchain technology operates in the background. Students simply receive a digital credential they can share, with no need to understand the underlying technology."
  },
  {
    question: "How do employers verify credentials?",
    answer: "Employers can verify credentials instantly using our verification tool by entering the credential ID or scanning a QR code provided by the candidate."
  },
  {
    question: "What blockchain do you use?",
    answer: "Our platform is blockchain-agnostic but currently uses Ethereum for its robust smart contract capabilities and Polygon for low-cost transactions."
  }
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-gray-200 py-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        {isOpen ? (
          <FiChevronUp className="text-gray-500 ml-2" />
        ) : (
          <FiChevronDown className="text-gray-500 ml-2" />
        )}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 text-gray-600"
        >
          <p>{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about decentralized credential verification.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;