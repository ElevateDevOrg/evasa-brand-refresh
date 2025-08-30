import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department?: string;
  bio: string;
  photo?: string; // filename only, optional; fallback to placeholder when missing
  order: number;
  featured?: boolean;
};

type TeamCardProps = {
  member: TeamMember;
  variant?: 'default' | 'compact';
  className?: string;
  showBioInCompact?: boolean;
};

const getImageSources = (photo?: string) => {
  if (!photo || photo.trim() === '') {
    return {
      webp: '/placeholder.svg',
      fallback: '/placeholder.svg',
    };
  }

  const isWebp = photo.toLowerCase().endsWith('.webp');
  const webp = isWebp ? photo : photo.replace(/\.[a-zA-Z0-9]+$/, '.webp');
  const fallback = isWebp ? photo.replace(/\.[a-zA-Z0-9]+$/, '.jpg') : photo;

  return {
    webp: `/headshots/${webp}`,
    fallback: `/headshots/${fallback}`,
  };
};

const TeamCard = ({ member, variant = 'default', className, showBioInCompact = false }: TeamCardProps) => {
  const { webp, fallback } = getImageSources(member.photo);

  return (
    <article className="group focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary rounded-lg">
      <Card className={cn('h-full overflow-hidden', className)}>
        <div className="bg-muted/40">
          <AspectRatio ratio={3 / 4}>
            <picture>
              <source srcSet={webp} type="image/webp" />
              <img
                src={fallback}
                alt={member.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
          </AspectRatio>
        </div>
        <CardContent className={cn(variant === 'compact' ? 'pt-3' : 'pt-4')}>
          <h4 className={cn('font-semibold tracking-tight', variant === 'compact' ? 'text-base' : 'text-lg')}>{member.name}</h4>
          <p className={cn('text-muted-foreground', variant === 'compact' ? 'text-xs' : 'text-sm')}>{member.role}</p>
          {(variant !== 'compact' || showBioInCompact) && (
            <p className={cn('mt-2 leading-relaxed', variant === 'compact' ? 'text-xs' : 'text-sm')}>{member.bio}</p>
          )}
        </CardContent>
      </Card>
    </article>
  );
};

export default TeamCard;


