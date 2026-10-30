interface IslandIconProps {
  size?: number;
  color?: string;
}

export default function IslandIcon({ size = 28, color = '#2E3A27' }: IslandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Остров" style={{ display: 'block' }}>
      <g fill={color}>
        <circle cx="38" cy="10" r="5.5" />
        <path d="M5 38 C9 29 20 27 30 29 C37 30 41 34 43 38 Z" />
        <path d="M18 15 C13 8 5 8 2 14 C7 12 12 16 18 15 Z" />
        <path d="M18 15 C21 7 29 5 33 10 C27 10 23 12 18 15 Z" />
        <path d="M18 15 C24 13 31 17 31 24 C27 19 23 17 18 15 Z" />
        <path d="M18 15 C12 16 7 21 8 27 C11 21 14 18 18 15 Z" />
      </g>
      <path d="M23 30 C23 24 21 19 18 15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M3 43 C7 40.5 10 40.5 14 43 C18 45.5 21 45.5 25 43 C29 40.5 32 40.5 36 43 C40 45.5 42 45.5 45 43"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
