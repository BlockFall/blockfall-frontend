import logoFull from '../assets/logo-full.svg';
import logoInline from '../assets/logo-inline.svg';

const heights = { sm: 96, md: 160, lg: 232};

export default function Logo({ size = 'md', variant = 'full' }) {
  const h = heights[size] ?? heights.md;
  const src = variant === 'inline' ? logoInline : logoFull;
  return (
    <img
      src={src}
      alt="BlockFall"
      style={{ height: h, width: 'auto', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  );
}
