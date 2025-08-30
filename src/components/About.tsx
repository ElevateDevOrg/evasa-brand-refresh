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

  // Leadership section has moved to the Team page
  const founders: never[] = [];

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

        {/* Leadership Team moved to /team */}
      </div>
    </section>
  );
};

export default About;