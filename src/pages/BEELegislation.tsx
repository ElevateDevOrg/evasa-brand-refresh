import { Download, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BEELegislation = () => {
  const legislationCategories = [
    {
      title: "B-BBEE Act and Amendments",
      description: "Core legislation and amendments to the Broad-Based Black Economic Empowerment Act",
      documents: [
        { name: "B-BBEE Act 53 of 2003", link: "#" },
        { name: "B-BBEE Amendment Act 46 of 2013", link: "#" },
        { name: "B-BBEE Amendment Act Regulations", link: "#" }
      ]
    },
    {
      title: "Sector Codes",
      description: "Industry-specific B-BBEE codes and guidelines",
      documents: [
        { name: "Generic Scorecard", link: "#" },
        { name: "Financial Services Sector Code", link: "#" },
        { name: "ICT Sector Code", link: "#" },
        { name: "Tourism Sector Code", link: "#" },
        { name: "Construction Sector Code", link: "#" }
      ]
    },
    {
      title: "Verification Standards",
      description: "Standards and requirements for B-BBEE verification",
      documents: [
        { name: "Verification Manual", link: "#" },
        { name: "SANAS Requirements", link: "#" },
        { name: "Verification Standards Framework", link: "#" }
      ]
    },
    {
      title: "Practice Notes and Guidelines",
      description: "Official practice notes and implementation guidelines",
      documents: [
        { name: "Practice Note 1 of 2019", link: "#" },
        { name: "Practice Note 2 of 2020", link: "#" },
        { name: "DTI Implementation Guidelines", link: "#" },
        { name: "DSBD Guidelines", link: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary-foreground/20 backdrop-blur-sm p-4 rounded-full border border-primary-foreground/30 mr-4">
                <BookOpen className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary-foreground mb-6">
              BEE Legislation
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Access key B-BBEE legislation, sector codes, and implementation guidelines
            </p>
          </div>
        </div>
      </section>

      {/* Legislation Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {legislationCategories.map((category, index) => (
              <Card key={index} className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-inter text-foreground flex items-center">
                    <FileText className="h-6 w-6 text-accent mr-3" />
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium text-foreground">{doc.name}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
                          onClick={() => window.open(doc.link, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BEELegislation;