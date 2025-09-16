import TeamCard, { TeamMember } from '@/components/TeamCard';
import teamData from '@/content/team.json';
import { z } from 'zod';

const TeamMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  qualifications: z.string().optional(),
  involvedSince: z.union([z.string(), z.number()]).optional(),
  department: z.string().optional(),
  bio: z.string().min(1).max(600),
  photo: z.string().optional(),
  order: z.number(),
  featured: z.boolean().optional(),
});

const TeamSchema = z.array(TeamMemberSchema);
type ParsedTeamMember = z.infer<typeof TeamMemberSchema>;
type ParsedTeam = z.infer<typeof TeamSchema>;

const validateAndSort = (data: unknown): TeamMember[] => {
  const parsed = TeamSchema.safeParse(data);
  if (!parsed.success) {
    // In dev, throw to highlight issues; in prod, fail gracefully with empty list
    if (import.meta.env.DEV) {
      throw new Error(`Invalid team data: ${parsed.error.toString()}`);
    }
    return [];
  }

  const members: ParsedTeam = parsed.data;

  // Ensure unique order; if duplicates, stable sort by name within same order
  const seenOrders = new Set<number>();
  const hasDuplicateOrder = members.some((m) => {
    if (seenOrders.has(m.order)) return true;
    seenOrders.add(m.order);
    return false;
  });

  const sorted = [...members].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.name.localeCompare(b.name);
  });

  if (hasDuplicateOrder && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('[team] Duplicate "order" values detected. Sorted by name within duplicates.');
  }

  return sorted as TeamMember[];
};

type TeamGridProps = {
  excludeDepartments?: string[];
};

const TeamGrid = ({ excludeDepartments }: TeamGridProps) => {
  const members = validateAndSort(teamData).filter((m) => {
    if (!excludeDepartments || excludeDepartments.length === 0) return true;
    const dept = m.department ?? '';
    return !excludeDepartments.includes(dept);
  });

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10" aria-labelledby="team-heading">
      <div className="mb-8">
        <h2 id="team-heading" className="text-3xl font-bold tracking-tight">Our Team</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">The people behind EVASA&apos;s verification work and client success.</p>
      </div>
      <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <li key={member.id} className="contents">
            <TeamCard member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamGrid;


