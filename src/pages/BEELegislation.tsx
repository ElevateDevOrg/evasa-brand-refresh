import React from 'react';
import { Download, FileText, BookOpen, Search, ExternalLink, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import legalManifest from '@/content/legal.json';
import type { LegalManifest, LegalCategory } from '@/types/legal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const BEELegislation = () => {
  const manifest = (legalManifest as unknown) as LegalManifest;
  const legislationCats = manifest.categories.filter(c => c.section === 'Legislation');
  const affidavitCats = manifest.categories.filter(c => c.section === 'Affidavits');

  const [query, setQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'Legislation' | 'Affidavits'>('Legislation');
  const [activeAffidavitTab, setActiveAffidavitTab] = React.useState(
    affidavitCats[0]?.key ?? 'eme-affidavits'
  );
  const [legislationOpen, setLegislationOpen] = React.useState<string[]>([]);

  function filterDocuments(category: LegalCategory) {
    if (!query) return category.documents;
    const q = query.toLowerCase();
    return category.documents.filter(d => d.title.toLowerCase().includes(q));
  }

  // Compute which Legislation accordions should be open when searching
  const legislationItems = React.useMemo(() => {
    return legislationCats.map((category) => ({ category, docs: filterDocuments(category) }));
  }, [legislationCats, query]);
  React.useEffect(() => {
    if (query) {
      // Auto-open categories with matches while searching
      const openKeys = legislationCats
        .map((category) => ({ category, docs: filterDocuments(category) }))
        .filter((x) => x.docs.length > 0)
        .map((x) => x.category.key);
      setLegislationOpen(openKeys);
    } else {
      // Return to collapsed when search clears
      setLegislationOpen([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary-foreground/20 backdrop-blur-sm p-4 rounded-full border border-primary-foreground/30 mr-4 hover:bg-primary-foreground/30 transition-all duration-300">
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

      {/* Legislation + Affidavits */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'Legislation' | 'Affidavits')}>
              <TabsList>
                <TabsTrigger value="Legislation">Legislation</TabsTrigger>
                <TabsTrigger value="Affidavits">Affidavits</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">Updated {new Date(manifest.updatedAt).toLocaleDateString()}</div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'Legislation' | 'Affidavits')} className="w-full">
            <TabsContent value="Legislation">
              <Accordion
                type="multiple"
                value={legislationOpen}
                onValueChange={(val) => setLegislationOpen(Array.isArray(val) ? val : [val])}
                className="w-full divide-y rounded-md border bg-background"
              >
                {legislationItems
                  .filter((x) => x.docs.length > 0)
                  .map(({ category, docs }) => (
                    <AccordionItem key={category.key} value={category.key}>
                      <AccordionTrigger className="px-4">
                        <div className="flex items-center gap-3 text-left">
                          <FileText className="h-4 w-4 text-accent" />
                          <span className="font-medium">{category.displayName || category.name}</span>
                          <span className="text-xs text-muted-foreground">({docs.length})</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-2">
                          <div className="divide-y rounded-md border">
                            {docs.map((doc) => (
                              <div key={doc.url} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                                <span className="truncate pr-2">{doc.title}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-2 text-xs"
                                    onClick={() => window.open(doc.url, '_blank')}
                                  >
                                    <Download className="h-3.5 w-3.5 mr-1" />
                                    Download
                                  </Button>
                                  {['doc', 'docx', 'xls', 'xlsx'].includes(doc.ext) && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(window.location.origin + doc.url)}`, '_blank')}
                                      title="Open in Office Online"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="Affidavits">
              <Tabs value={activeAffidavitTab} onValueChange={setActiveAffidavitTab}>
                <TabsList className="mb-4">
                  {affidavitCats.map((cat) => (
                    <TabsTrigger key={cat.key} value={cat.key}>{cat.name}</TabsTrigger>
                  ))}
                </TabsList>

                {affidavitCats.map((category) => {
                  const docs = filterDocuments(category);
                  return (
                    <TabsContent key={category.key} value={category.key}>
                      <Accordion type="multiple" defaultValue={[`${category.key}-docs`]} className="w-full rounded-md border bg-background">
                        <AccordionItem value={`${category.key}-docs`}>
                          <AccordionTrigger className="px-4">
                            <div className="flex items-center gap-3 text-left">
                              <FileText className="h-4 w-4 text-accent" />
                              <span className="font-medium">{category.displayName || category.name}</span>
                              <span className="text-xs text-muted-foreground">({docs.length})</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="px-2">
                              <div className="divide-y rounded-md border">
                                {docs.map((doc) => (
                                  <div key={doc.url} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                                    <span className="truncate pr-2">{doc.title}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-2 text-xs"
                                        onClick={() => window.open(doc.url, '_blank')}
                                      >
                                        <Download className="h-3.5 w-3.5 mr-1" />
                                        Download
                                      </Button>
                                      {['doc', 'docx', 'xls', 'xlsx'].includes(doc.ext) && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(window.location.origin + doc.url)}`, '_blank')}
                                          title="Open in Office Online"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {docs.length === 0 && (
                                  <div className="px-3 py-2 text-sm text-muted-foreground">No results match your search.</div>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BEELegislation;