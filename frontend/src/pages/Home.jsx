import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Institutions from '../components/Institutions';
import Verification from '../components/Verification';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Institutions />
      <Verification />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;