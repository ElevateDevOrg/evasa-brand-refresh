import { Award, Users, Target, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import teamImage from '@/assets/team-meeting.png';
import duncanImage from '@/assets/duncandg.jpg';
import johnImage from '@/assets/john_degroot.jpg';

const About = () => {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollAnimation(0.2);
  const { isVisible: storyVisible, elementRef: storyRef } = useScrollAnimation(0.1, 300);
  const { isVisible: valuesVisible, elementRef: valuesRef } = useScrollAnimation(0.1, 400);
  const { isVisible: leadershipVisible, elementRef: leadershipRef } = useScrollAnimation(0.1, 500);

  const founders = [
    {
      name: "Duncan De Groot",
      role: "Co-Founder & Director",
      experience: "10+ years B-BBEE experience",
      background: "Ex-Group Executive at Empowerdex with responsibility for Cape Town, Durban and Pretoria branches. Presented at conferences and appeared on television as a BEE expert.",
      qualifications: "BComm, MBA (University of Cape Town)",
      image: duncanImage
    },
    {
      name: "John De Groot", 
      role: "Co-Founder & Director",
      experience: "18+ years post-qualification",
      background: "Chartered Accountant through Deloitte & Touche. Ex-Director of Empowerdex Audit Inc with extensive experience in Audit, Tax, B-BBEE and Accounting.",
      qualifications: "B.Bus.Sci, CA(SA)",
      image: johnImage
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "Building lasting relationships through honest, transparent practices and ethical standards."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering exceptional quality in every verification and consulting engagement."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Working collaboratively with clients to achieve their transformation goals."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Focused on measurable outcomes that drive meaningful empowerment."
    }
  ];

  return (
    <section id="about" className="section-professional">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
            About <span className="text-gradient-red">Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            EVASA is a Broad-Based Black Economic Empowerment verification agency with highly experienced 
            principals who bring a cumulative 40 years of expertise in B-BBEE verification, advisory, and auditing.
          </p>
        </div>

        {/* Company Story */}
        <div 
          ref={storyRef}
          className={`grid lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700 ${
            storyVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`}
        >
          <div>
            <h3 className="text-3xl font-playfair font-semibold text-primary mb-6">
              Our Story & Mission
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                EVASA provides a full-service offering in the verification process, assisting clients from 
                initial engagement, through the verification process itself, to final B-BBEE certification.
              </p>
                <p>
                  Although EVASA prefers to focus on the verification space, we are able to provide consulting and 
                  advisory engagements as well, although these would naturally then preclude us from providing BEE 
                  verification services to that client for a period of two years post consulting assistance.
                </p>
              <p>
                Our commitment is to deliver professional, accurate, and timely B-BBEE verification services 
                that help organizations achieve their transformation objectives while maintaining the highest 
                standards of integrity and compliance.
              </p>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-200 ${
            storyVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-8 scale-100'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={teamImage} 
                alt="EVASA team meeting"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div 
            ref={valuesRef}
            className={`text-center mb-16 transition-all duration-700 ${
              valuesVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
              Our <span className="text-gradient-red">Values</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The core principles that guide our approach to B-BBEE verification and client relationships.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className={`card-professional text-center card-hover hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg transition-professional group ${
                  valuesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  transitionDelay: valuesVisible ? `${index * 130}ms` : '0ms',
                  transitionDuration: '700ms'
                }}
              >
                <CardHeader>
                  <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-playfair text-primary">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div
          ref={leadershipRef}
          className={`transition-all duration-700 will-change-smooth ${
            leadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-3xl font-playfair font-semibold text-primary text-center mb-12">
            Our Leadership Team
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <Card 
                key={founder.name} 
                className="card-professional card-hover animate-slide-in-right hover:shadow-xl hover:-translate-y-1 transition-all duration-400 group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader>
                  <div className="flex items-start space-x-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300">
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-playfair text-primary">
                        {founder.name}
                      </CardTitle>
                      <p className="text-accent font-medium">{founder.role}</p>
                      <p className="text-sm text-muted-foreground mt-1">{founder.experience}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {founder.background}
                  </p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-primary">Qualifications:</p>
                    <p className="text-sm text-muted-foreground">{founder.qualifications}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;