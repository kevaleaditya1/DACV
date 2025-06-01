import { motion } from 'framer-motion';
import { FiUpload, FiUsers, FiBarChart2, FiShield } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    icon: <FiUpload size={24} className="text-primary-500" />,
    title: "Easy Credential Issuance",
    description: "Our intuitive dashboard makes it simple to issue digital credentials to your students and alumni."
  },
  {
    icon: <FiUsers size={24} className="text-primary-500" />,
    title: "Batch Processing",
    description: "Issue credentials to entire graduating classes with our batch processing tools."
  },
  {
    icon: <FiBarChart2 size={24} className="text-primary-500" />,
    title: "Analytics Dashboard",
    description: "Track how often your credentials are being verified and by whom."
  },
  {
    icon: <FiShield size={24} className="text-primary-500" />,
    title: "Enhanced Security",
    description: "Protect your institution's reputation with tamper-proof credential issuance."
  }
];

const Issuer = () => {
  return (
    <div>
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              For <span className="text-primary-600">Educational Institutions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Join our network of forward-thinking institutions issuing verifiable credentials on the blockchain.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Request Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits for Institutions</h2>
              <p className="text-lg text-gray-600">
                Blockchain credential verification offers numerous advantages for educational institutions of all sizes.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 hover:bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
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
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Graduation ceremony" 
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get Started Today</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team will guide you through the onboarding process and help you issue your first blockchain credentials in no time.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Schedule a Consultation</h3>
                    <p className="text-gray-600">We'll assess your needs and recommend the best approach.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Integration Setup</h3>
                    <p className="text-gray-600">Our team will help integrate with your existing systems.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Issue First Credentials</h3>
                    <p className="text-gray-600">Start issuing verifiable credentials to your students.</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-8 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Contact Our Team
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Issuer;