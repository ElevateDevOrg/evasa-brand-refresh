import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import heroImage from '@/assets/hero-handshake.jpg';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional business partnership"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ 
            transform: `scale(${1 + scrollY * 0.0002})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
                      <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30 hover:bg-secondary/30 transition-all duration-300">
                <span className="text-secondary font-medium text-sm">
                  🏆 B-BBEE Verification Experts
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary-foreground mb-6 leading-tight">
              B-BBEE <span className="text-accent hover:text-accent/80 transition-colors duration-300">Verification</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Full service offering with 40+ years of combined experience in B-BBEE verification, advisory, and auditing excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground group transition-professional"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const headerHeight = 80; // 20 * 4 = 80px (h-20)
                    const elementPosition = contactSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/50 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm bg-white/10 transition-professional"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    const headerHeight = 80; // 20 * 4 = 80px (h-20)
                    const elementPosition = aboutSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Read About Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-secondary mr-2 group-hover:text-accent transition-colors duration-300" />
                  <span className="text-2xl font-bold text-primary-foreground group-hover:text-accent transition-colors duration-300">40+</span>
                </div>
                <p className="text-primary-foreground/80 text-sm group-hover:text-primary-foreground transition-colors duration-300">Years Experience</p>
              </div>
              <div className="text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-secondary mr-2 group-hover:text-accent transition-colors duration-300" />
                  <span className="text-2xl font-bold text-primary-foreground group-hover:text-accent transition-colors duration-300">100%</span>
                </div>
                <p className="text-primary-foreground/80 text-sm group-hover:text-primary-foreground transition-colors duration-300">Success Rate</p>
              </div>
              <div className="text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-secondary mr-2 group-hover:text-accent transition-colors duration-300" />
                  <span className="text-2xl font-bold text-primary-foreground group-hover:text-accent transition-colors duration-300">500+</span>
                </div>
                <p className="text-primary-foreground/80 text-sm group-hover:text-primary-foreground transition-colors duration-300">Clients Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;