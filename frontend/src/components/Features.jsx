import { motion } from 'framer-motion';
import { FiLock, FiDatabase, FiGlobe, FiCheckCircle } from 'react-icons/fi';

const features = [
  {
    icon: <FiLock size={24} className="text-primary-500" />,
    title: "Tamper-Proof Records",
    description: "All credentials are immutably stored on the blockchain, making them impossible to alter or falsify.",
  },
  {
    icon: <FiDatabase size={24} className="text-primary-500" />,
    title: "Decentralized Storage",
    description: "No single point of failure. Credentials are distributed across the network for maximum reliability.",
  },
  {
    icon: <FiGlobe size={24} className="text-primary-500" />,
    title: "Global Verification",
    description: "Verify credentials from anywhere in the world instantly, without intermediaries.",
  },
  {
    icon: <FiCheckCircle size={24} className="text-primary-500" />,
    title: "Instant Validation",
    description: "Employers and institutions can validate credentials in seconds with our verification tool.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Blockchain Verification?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Traditional credential verification is slow, expensive, and vulnerable to fraud. Our blockchain solution solves these problems.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 hover:bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;