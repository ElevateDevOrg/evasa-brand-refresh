import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import evasaLogo from '@/assets/evasa_logo_hp.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '/team' },
    { name: 'BEE Legislation', href: '/bee-legislation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 transition-professional">
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-200 ease-out"
           style={{ width: `${scrollProgress}%` }}>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={evasaLogo} 
              alt="EVASA - Empowerment Verification Agency of South Africa"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent font-medium transition-professional relative group"
                onClick={(e) => {
                  // Handle hash links with proper scrolling
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.getElementById(item.href.substring(1));
                    if (targetSection) {
                      // Section exists on current page, scroll to it
                      const headerHeight = 80; // 20 * 4 = 80px (h-20)
                      const elementPosition = targetSection.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                                          } else {
                        // Section doesn't exist on current page, navigate to home page first
                        // Store the target section to scroll to after page load
                        sessionStorage.setItem('scrollToSection', item.href);
                        window.location.href = '/';
                      }
                  }
                  // For non-hash links (like /bee-legislation), let them navigate normally
                }}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-professional"
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
              Get Quote
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-professional"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent font-medium py-2 transition-professional"
                  onClick={(e) => {
                    // Handle hash links with proper scrolling
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      const targetSection = document.getElementById(item.href.substring(1));
                      if (targetSection) {
                        // Section exists on current page, scroll to it
                        const headerHeight = 80; // 20 * 4 = 80px (h-20)
                        const elementPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      } else {
                        // Section doesn't exist on current page, navigate to home page first
                        // Store the target section to scroll to after page load
                        sessionStorage.setItem('scrollToSection', item.href);
                        window.location.href = '/';
                      }
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground mt-4"
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
                  setIsMenuOpen(false); // Close mobile menu after clicking
                }}
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;