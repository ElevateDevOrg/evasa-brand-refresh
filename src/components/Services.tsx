import { FileCheck, Users, BarChart3, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import officeImage from '@/assets/office-building.jpg';
import consultingImage from '@/assets/consulting.jpg';
import verificationImage from '@/assets/verification.png';
import ratingImage from '@/assets/analysis.jpg';
import assessmentImage from '@/assets/assessment.jpg';

const Services = () => {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollAnimation(0.2);
  const { isVisible: cardsVisible, elementRef: cardsRef } = useScrollAnimation(0.1, 200);
  const { isVisible: ctaVisible, elementRef: ctaRef } = useScrollAnimation(0.2, 400);

  const services = [
    {
      icon: FileCheck,
      title: "BEE Verification",
      description: "Comprehensive B-BBEE verification services with 40+ years of combined experience in the verification space",
      features: ["Complete B-BBEE scorecards", "Private equity structures", "Joint venture assessments", "Annual compliance"],
      image: verificationImage
    },
    {
      icon: Users,
      title: "BEE Consulting",
      description: "Strategic B-BBEE advisory services (note: precludes verification services for 4 years post-consulting)",
      features: ["Strategic planning", "Implementation guidance", "Policy development", "Training programs"],
      image: consultingImage
    },
    {
      icon: BarChart3,
      title: "Rating & Analysis",
      description: "Non-verified rating and GAP Analysis to identify your current position and improvement areas",
      features: ["Current position assessment", "Gap identification", "Improvement roadmap", "Benchmarking analysis"],
      image: ratingImage
    },
    {
      icon: Building2,
      title: "Ownership Assessment",
      description: "Comprehensive Ownership Assessment and Verification services with ownership structure analysis and B-BBEE compliance",
      features: ["Ownership structure analysis", "Verification certificates", "Legal compliance", "Due diligence support"],
      image: assessmentImage
    }
  ];

  return (
    <section id="services" className="section-professional bg-gradient-subtle">
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 will-change-smooth ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
            Our <span className="text-gradient-red">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            EVASA is a Broad-Based Black Economic Empowerment ("B-BBEE") Verification agency. Our principals are highly experienced BEE and auditing practitioners, with a cumulative 40 years in the B-BBEE verification, B-BBEE advisory and auditing space. We provide a full-service offering in the verification process, assisting clients from initial engagement, through the verification process itself, to final B-BBEE certification.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className={`card-professional card-hover group hover:shadow-xl hover:-translate-y-1 transition-professional will-change-smooth ${
                cardsVisible 
                  ? `opacity-100 translate-y-0` 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: cardsVisible ? `${index * 90}ms` : '0ms',
                transitionDuration: '700ms'
              }}
            >
              <CardHeader className="relative">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-primary p-3 rounded-lg group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-playfair text-primary mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 group/btn hover:bg-accent/10 hover:text-accent transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-700 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-100'
          }`}
        >
          <div className="bg-card border border-border rounded-xl p-8 inline-block shadow-elegant">
            <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Contact our experienced team for a comprehensive consultation and quote.
            </p>
            <Button 
              size="lg" 
              className="btn-red"
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
              Request Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;