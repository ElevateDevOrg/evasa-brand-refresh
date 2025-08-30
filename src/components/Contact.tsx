import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@evasa.co.za",
      description: "Get in touch for consultations"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+27 (0)21 XXX XXXX",
      description: "Speak with our experts"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Cape Town, South Africa",
      description: "Schedule an appointment"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 8:00 - 17:00",
      description: "We're here to help"
    }
  ];

  const { isVisible: headerVisible, elementRef: headerRef } = useScrollAnimation(0.15);
  const { isVisible: infoVisible, elementRef: infoRef } = useScrollAnimation(0.15, 100);
  const { isVisible: formVisible, elementRef: formRef } = useScrollAnimation(0.15, 150);

  return (
    <section id="contact" className="section-professional bg-gradient-subtle">
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 will-change-smooth ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-normal">
            Ready to begin your B-BBEE verification journey? Our team can guide you through the process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div
            ref={infoRef}
            className={`space-y-8 transition-all duration-700 will-change-smooth ${
              infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div>
              <h3 className="text-xl font-playfair font-semibold text-primary mb-4">
                Get In Touch
              </h3>
              <p className="text-sm text-foreground/70 leading-normal mb-6">
                Whether you need a full B-BBEE verification, consulting services, or a quick question, we’re here to help.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title}
                  className="card-professional transition-professional"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-primary p-2 rounded-lg transition-professional">
                        <info.icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-0.5">{info.title}</h4>
                        <p className="text-sm font-medium text-foreground mb-0.5">{info.details}</p>
                        <p className="text-xs text-foreground/70">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`transition-all duration-700 will-change-smooth ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="text-xl font-playfair text-primary">
                  Request a Quote
                </CardTitle>
                <p className="text-sm text-foreground/70">
                  Fill out the form below and we’ll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter your first name"
                      className="h-9 transition-professional focus:ring-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter your last name"
                      className="h-9 transition-professional focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="h-9 transition-professional focus:ring-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="Your company name"
                    className="h-9 transition-professional focus:ring-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Required</Label>
                  <select 
                    id="service"
                    className="w-full h-9 px-3 py-2 border border-input rounded-md bg-background text-foreground transition-professional focus:ring-2 focus:ring-secondary focus:border-secondary"
                  >
                    <option value="">Select a service</option>
                    <option value="verification">B-BBEE Verification</option>
                    <option value="consulting">B-BBEE Consulting</option>
                    <option value="rating">Rating & Analysis</option>
                    <option value="ownership">Ownership Assessment</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your requirements..."
                    rows={3}
                    className="transition-professional focus:ring-secondary"
                  />
                </div>

                <Button className="w-full btn-gold group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-foreground/60 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;