import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiUsers, FiBarChart2 } from 'react-icons/fi';

const benefits = [
  {
    icon: <FiBook size={20} className="text-primary-500" />,
    text: "Streamline credential issuance"
  },
  {
    icon: <FiUsers size={20} className="text-primary-500" />,
    text: "Reduce administrative costs"
  },
  {
    icon: <FiBarChart2 size={20} className="text-primary-500" />,
    text: "Enhance institutional reputation"
  }
];

const Institutions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Educational institution" 
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">For Educational Institutions</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our network of trusted institutions issuing verifiable credentials on the blockchain. 
              Enhance your students' employability while reducing administrative overhead.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <span className="mr-3 bg-primary-100 p-2 rounded-full">{benefit.icon}</span>
                  <span className="text-gray-700">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/issuer" 
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Learn More <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/dashboard" 
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Institution Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Institutions;