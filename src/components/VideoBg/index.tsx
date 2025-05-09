import { CSSProperties } from 'react';
import styles from './VideoBg.module.css';

interface VideoBgProps {
  videoSrc: string;
  grainSrc?: string; // opcional, pode ter um valor padrão
}

function VideoBg({ videoSrc, grainSrc }: VideoBgProps) {
  const grainStyle: CSSProperties = grainSrc ? {
    '--grain-image': `url(${grainSrc})`,
  } as CSSProperties : {};

  return (
    <div className={styles.container_videoBg} style={grainStyle}>
      <video autoPlay loop muted data-testid="video">
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoBg;
