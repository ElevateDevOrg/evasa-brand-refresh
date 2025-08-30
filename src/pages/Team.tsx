import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamGrid from '@/components/TeamGrid';
import TeamCard from '@/components/TeamCard';
import ScrollToTop from '@/components/ScrollToTop';
import teamData from '@/content/team.json';

const CompanyName = 'EVASA';

const Team = () => {
  useEffect(() => {
    const title = `Team | ${CompanyName}`;
    const description = 'Meet the team behind EVASA — the people who deliver accredited verification and client outcomes.';

    // Title
    const previousTitle = document.title;
    document.title = title;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    let createdMeta = false;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      createdMeta = true;
    }
    meta.setAttribute('content', description);
    if (createdMeta) document.head.appendChild(meta);

    // JSON-LD minimal Organization
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: CompanyName,
      employee: teamData.map((m) => ({
        '@type': 'Person',
        name: m.name,
        jobTitle: m.role,
        image: m.photo ? `/headshots/${m.photo.toLowerCase().endsWith('.webp') ? m.photo : m.photo.replace(/\.[a-zA-Z0-9]+$/, '.webp')}` : '/placeholder.svg',
      })),
    });
    document.head.appendChild(script);

    // Optionally preload top-row images (first 4)
    const preloadLinks: HTMLLinkElement[] = [];
    teamData.slice(0, 4).forEach((m) => {
      if (!m.photo) return;
      const href = `/headshots/${m.photo.toLowerCase().endsWith('.webp') ? m.photo : m.photo.replace(/\.[a-zA-Z0-9]+$/, '.webp')}`;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    return () => {
      document.title = previousTitle;
      if (script && script.parentNode) script.parentNode.removeChild(script);
      preloadLinks.forEach((l) => l.parentNode && l.parentNode.removeChild(l));
    };
  }, []);

  // Leadership subset for top section
  const leadership = teamData
    .filter((m) => (m.department ?? '').toLowerCase() === 'leadership')
    .sort((a, b) => (a.order === b.order ? a.name.localeCompare(b.name) : a.order - b.order));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Leadership section */}
        {leadership.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 scroll-mt-20" aria-labelledby="leadership-heading">
            <div className="mb-8">
              <h2 id="leadership-heading" className="text-3xl font-bold tracking-tight">Leadership</h2>
            </div>
            <ul role="list" className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {leadership.map((member) => (
                <li key={member.id} className="contents">
                  <TeamCard member={member} variant="compact" showBioInCompact />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Everyone else */}
        <TeamGrid excludeDepartments={["Leadership"]} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Team;


