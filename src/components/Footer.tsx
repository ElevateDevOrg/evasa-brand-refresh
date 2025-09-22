import { Award, Mail, Phone, MapPin } from 'lucide-react';

const LEGAL_DOCUMENTS = [
  { label: 'Appeals Process', href: '/legal/FORM-9_R2_appeals-process.pdf' },
  { label: 'Complaints Process', href: '/legal/FORM-20_R2_complaints-process.pdf' },
  { label: 'Impartiality Statement', href: '/legal/FORM-77_R2_impartiality-statement.pdf' },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-secondary p-2 rounded-lg">
                <Award className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold">EVASA</h3>
                <p className="text-sm opacity-80">Empowerment Verification Agency</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              EVASA is a B-BBEE Verification agency with highly experienced principals bringing 
              70+ years of combined expertise in verification, advisory, and auditing.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@evasa.co.za</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+27 (0)82 410 6081</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Cape Town, South Africa</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Our Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <a
                  href="#services"
                  className="hover:text-secondary transition-professional cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#services');
                      window.location.href = '/';
                    }
                  }}
                >
                  B-BBEE Verification
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-secondary transition-professional cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#services');
                      window.location.href = '/';
                    }
                  }}
                >
                  B-BBEE Consulting
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-secondary transition-professional cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#services');
                      window.location.href = '/';
                    }
                  }}
                >
                  Rating & Analysis
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-secondary transition-professional cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#services');
                      window.location.href = '/';
                    }
                  }}
                >
                  Ownership Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Company</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <a
                  href="#about"
                  className="hover:text-secondary transition-professional"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('about');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#about');
                      window.location.href = '/';
                    }
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-secondary transition-professional">
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-secondary transition-professional"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#services');
                      window.location.href = '/';
                    }
                  }}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-secondary transition-professional"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('contact');
                    if (target) {
                      const headerHeight = 80;
                      const elementPosition = target.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    } else {
                      sessionStorage.setItem('scrollToSection', '#contact');
                      window.location.href = '/';
                    }
                  }}
                >
                  Contact
                </a>
              </li>
              
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Legal</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              {LEGAL_DOCUMENTS.map((doc) => (
                <li key={doc.href}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-professional"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 EVASA (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-primary-foreground/60">
                Professional B-BBEE Verification Services
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-secondary font-medium">
                  SANAS Accredited
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;