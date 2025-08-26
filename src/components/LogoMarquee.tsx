import clients from "@/content/clients.json";
import styles from "./LogoMarquee.module.css";
// Resolve logos from src assets at build-time; supports multiple formats
const logoModules = import.meta.glob("@/assets/logos/*", { eager: true, as: "url" });

type Client = {
  name: string;
  file: string;
  url?: string;
};

type LogoMarqueeProps = {
  height?: number;
  speedSec?: number;
  pauseOnHover?: boolean;
  forceMotion?: boolean;
};

export default function LogoMarquee({
  height = 48,
  speedSec = 30,
  pauseOnHover = true,
  forceMotion = false,
}: LogoMarqueeProps) {
  const loop: Client[] = [...(clients as Client[]), ...(clients as Client[])];

  const resolveLogoUrl = (fileName: string): string => {
    // Try src/assets/logos first
    for (const [path, url] of Object.entries(logoModules)) {
      if (path.endsWith(`/` + fileName)) {
        return url as string;
      }
    }
    // Fallback to public/logos
    return `/logos/${fileName}`;
  };

  return (
    <section
      className={`${styles.wrapper} ${forceMotion ? styles.force : ''}`}
      aria-label="Selected clients we have worked with"
      style={
        {
          ["--logo-h" as any]: `${height}px`,
          ["--speed" as any]: `${speedSec}s`,
          ["--pause-on-hover" as any]: pauseOnHover ? "paused" : "running",
        } as React.CSSProperties
      }
    >
      <div className={styles.maskLeft} aria-hidden="true" />
      <div className={styles.maskRight} aria-hidden="true" />

      <ul className={styles.track} role="list" aria-live="off">
        {loop.map((item, idx) => (
          <li key={`${item.file}-${idx}`} className={styles.item}>
            {/* Using standard img to work in Vite without Next Image */}
            <img
              src={resolveLogoUrl(item.file)}
              alt=""
              aria-hidden="true"
              height={height}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}


