import { motion } from 'framer-motion';
import { FiUpload, FiLink, FiSearch, FiAward } from 'react-icons/fi';

const steps = [
  {
    icon: <FiUpload size={24} className="text-primary-500" />,
    title: "Institution Issues Credential",
    description: "Educational institutions issue digital credentials to students, recorded on the blockchain.",
  },
  {
    icon: <FiLink size={24} className="text-primary-500" />,
    title: "Student Receives Digital Badge",
    description: "Students receive a verifiable digital badge or certificate they can share with employers.",
  },
  {
    icon: <FiSearch size={24} className="text-primary-500" />,
    title: "Employer Verifies Credential",
    description: "Employers can instantly verify the authenticity of credentials using our platform.",
  },
  {
    icon: <FiAward size={24} className="text-primary-500" />,
    title: "Trustworthy Hiring Process",
    description: "Reduces credential fraud and streamlines the hiring process for everyone.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple three-step process for issuing, receiving, and verifying academic credentials.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center lg:text-left"
              >
                <div className="lg:absolute lg:-top-6 lg:-left-6 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center text-white mb-4 mx-auto lg:mx-0">
                  {step.icon}
                </div>
                <div className="lg:pl-8">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mb-4 mx-auto lg:mx-0 lg:absolute lg:-top-4 lg:-left-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;