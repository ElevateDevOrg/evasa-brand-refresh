import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LogoMarquee from '@/components/LogoMarquee';

const Index = () => {
  useEffect(() => {
    // Check if there's a section to scroll to after page load
    const scrollToSection = sessionStorage.getItem('scrollToSection');
    if (scrollToSection) {
      // Clear the stored section
      sessionStorage.removeItem('scrollToSection');
      
      // Wait a bit for the page to fully load, then scroll
      setTimeout(() => {
        const targetSection = document.getElementById(scrollToSection.substring(1));
        if (targetSection) {
          const headerHeight = 80; // 20 * 4 = 80px (h-20)
          const elementPosition = targetSection.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <h2 className="sr-only">Clients</h2>
          <LogoMarquee height={56} speedSec={40} pauseOnHover={false} forceMotion />
        </section>
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
