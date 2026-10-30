import { useId, type JSX } from 'react';
import type { TripSceneName } from '../types';

interface TripSceneProps {
  scene: TripSceneName;
  size?: number | string;
}

export const sceneLabels: Record<TripSceneName, string> = {
  'frozen-lake': 'Зимнее озеро',
  'big-city': 'Большой город',
  japan: 'Япония',
  city: 'Город у моря',
  'forest-lake': 'Лес и озеро',
  mountains: 'Горы',
  'old-town': 'Старый город',
  river: 'Река',
};

function FrozenLake({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9EC3EA" />
          <stop offset="1" stopColor="#E6F0FA" />
        </linearGradient>
        <linearGradient id={`${id}-ice`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9DDF2" />
          <stop offset="1" stopColor="#7FB6DE" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="148" cy="48" r="14" fill="#FFF6DA" />
      <path d="M0 98 L30 72 L52 88 L80 62 L112 92 L140 70 L170 90 L200 76 L200 112 L0 112 Z" fill="#C9D9EA" />
      <path d="M30 72 L38 79 L30 78 L24 77 Z M80 62 L90 71 L82 70 L72 69 Z M140 70 L148 76 L140 76 L133 76 Z" fill="#FFFFFF" />
      <path d="M0 104 L40 92 L76 100 L120 90 L160 102 L200 94 L200 116 L0 116 Z" fill="#9FB7CF" />
      <rect y="112" width="200" height="60" fill={`url(#${id}-ice)`} />
      <path d="M18 128 L44 136 L58 130 M70 150 L96 142 L112 150 L130 144 M140 124 L162 132 L186 126 M30 160 L52 156" stroke="#EAF6FF" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M118 118 L126 96 L134 92 L142 100 L150 118 Z" fill="#6B5A57" />
      <path d="M126 96 L134 92 L138 97 L130 100 Z" fill="#FFFFFF" />
      <path d="M0 170 C40 160 80 168 120 164 C150 161 178 166 200 162 L200 200 L0 200 Z" fill="#FFFFFF" />
      <path d="M24 170 L30 150 L36 170 Z M34 172 L42 142 L50 172 Z" fill="#2F5D50" />
      <path d="M30 150 L33 158 L27 158 Z M42 142 L46 152 L38 152 Z" fill="#FFFFFF" />
    </>
  );
}

function City({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6A97A" />
          <stop offset="0.6" stopColor="#F9D8A6" />
          <stop offset="1" stopColor="#FCEBD0" />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5C8FB8" />
          <stop offset="1" stopColor="#2E5E8C" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="56" cy="64" r="18" fill="#FFE7B0" />
      <path d="M120 40 C130 34 146 36 150 44 C160 42 168 48 164 54 L116 54 C110 50 114 42 120 40 Z" fill="#FFFFFF" opacity="0.8" />
      <g fill="#8E5A63">
        <rect x="8" y="104" width="22" height="34" />
        <rect x="30" y="96" width="16" height="42" />
        <rect x="150" y="100" width="20" height="38" />
        <rect x="170" y="108" width="26" height="30" />
      </g>
      <g fill="#E07A87">
        <rect x="58" y="110" width="84" height="28" />
        <path d="M70 110 A30 30 0 0 1 130 110 Z" />
        <circle cx="100" cy="78" r="3" />
        <rect x="99" y="72" width="2" height="8" />
        <path d="M54 110 A10 10 0 0 1 74 110 Z" />
        <path d="M126 110 A10 10 0 0 1 146 110 Z" />
        <rect x="48" y="62" width="5" height="76" />
        <path d="M46 64 L50.5 48 L55 64 Z" />
        <rect x="147" y="62" width="5" height="76" />
        <path d="M145 64 L149.5 48 L154 64 Z" />
      </g>
      <g fill="#F9D8A6" opacity="0.9">
        <rect x="66" y="120" width="4" height="7" rx="2" />
        <rect x="78" y="120" width="4" height="7" rx="2" />
        <rect x="90" y="120" width="4" height="7" rx="2" />
        <rect x="106" y="120" width="4" height="7" rx="2" />
        <rect x="118" y="120" width="4" height="7" rx="2" />
        <rect x="130" y="120" width="4" height="7" rx="2" />
      </g>
      <rect y="138" width="200" height="62" fill={`url(#${id}-sea)`} />
      <path d="M14 152 H44 M120 158 H160 M60 176 H96 M150 184 H186" stroke="#DCE7F4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M70 160 L130 160 L122 170 L78 170 Z" fill="#FFFFFF" />
      <rect x="86" y="152" width="26" height="8" fill="#FFFFFF" />
      <rect x="96" y="146" width="6" height="6" fill="#E07A87" />
      <path d="M88 155 H110" stroke="#5C8FB8" strokeWidth="2" />
    </>
  );
}

function ForestLake({ id }: { id: string }) {
  const pines = [
    [8, 132, 22],
    [24, 126, 28],
    [42, 134, 20],
    [150, 130, 24],
    [166, 122, 32],
    [186, 132, 22],
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FB2E0" />
          <stop offset="1" stopColor="#D8EAF8" />
        </linearGradient>
        <linearGradient id={`${id}-lake`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4F87B8" />
          <stop offset="1" stopColor="#2F6491" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <path d="M30 50 C38 40 56 42 60 50 C72 48 78 58 70 62 L28 62 C20 60 22 52 30 50 Z" fill="#FFFFFF" />
      <path d="M128 36 C134 30 148 32 150 38 C158 37 162 44 156 46 L126 46 C120 44 122 38 128 36 Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M0 112 C40 96 80 104 110 98 C140 92 170 100 200 96 L200 140 L0 140 Z" fill="#5E8C6A" />
      <path d="M0 122 C50 112 90 118 130 112 C160 108 180 114 200 110 L200 140 L0 140 Z" fill="#3F6F52" />
      {pines.map(([x, base, h]) => (
        <g key={`${x}-${base}`}>
          <rect x={x - 1.5} y={base - 4} width="3" height="6" fill="#4A3A2E" />
          <path d={`M${x} ${base - h} L${x + h * 0.32} ${base - 3} L${x - h * 0.32} ${base - 3} Z`} fill="#24533D" />
        </g>
      ))}
      <rect y="138" width="200" height="62" fill={`url(#${id}-lake)`} />
      <path d="M20 150 H50 M120 156 H170 M50 178 H92 M136 186 H176" stroke="#DCE7F4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M66 152 C74 142 96 142 104 152 Z" fill="#8C8C8C" />
      <path d="M74 146 C80 142 90 142 96 146 L92 148 L78 148 Z" fill="#A8A8A8" />
      <path d="M118 168 L150 168 L144 174 L124 174 Z" fill="#E07A87" />
      <path d="M134 168 L134 150 L146 166 Z" fill="#FFFFFF" />
    </>
  );
}

function Mountains({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FA8DC" />
          <stop offset="1" stopColor="#CFE3F5" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <path d="M140 34 C146 28 160 30 162 36 C170 35 174 42 168 44 L138 44 C132 42 134 36 140 34 Z" fill="#FFFFFF" />
      <path d="M-10 130 L50 46 L92 102 L122 64 L210 130 Z" fill="#7E8EA3" />
      <path d="M50 46 L64 66 L56 62 L48 70 L40 60 Z M122 64 L136 76 L128 76 L120 82 L112 76 Z" fill="#FFFFFF" />
      <path d="M-10 138 L30 96 L70 124 L110 90 L150 118 L210 98 L210 150 L-10 150 Z" fill="#5C7A6B" />
      <path d="M0 140 C50 128 100 136 140 130 C170 126 190 130 200 128 L200 200 L0 200 Z" fill="#7DB36A" />
      <path d="M0 168 C60 158 120 170 200 160 L200 200 L0 200 Z" fill="#69A158" />
      <g>
        <rect x="128" y="96" width="14" height="52" fill="#B7A99A" />
        <path d="M126 96 L135 84 L144 96 Z" fill="#6E5A4E" />
        <rect x="133" y="104" width="4" height="6" fill="#4A3D35" />
        <rect x="150" y="110" width="12" height="40" fill="#C6B8A8" />
        <path d="M148 110 L156 100 L164 110 Z" fill="#6E5A4E" />
        <rect x="154" y="118" width="4" height="5" fill="#4A3D35" />
        <rect x="112" y="128" width="30" height="20" fill="#D8CCBE" />
        <path d="M110 128 L127 118 L144 128 Z" fill="#E07A87" />
      </g>
      <path d="M40 200 C60 178 80 164 112 150" stroke="#E8DCC4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="150" r="3" fill="#FFFFFF" />
      <circle cx="70" cy="176" r="3" fill="#F6D06F" />
      <circle cx="176" cy="172" r="3" fill="#FFFFFF" />
    </>
  );
}

function OldTown({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5D4A86" />
          <stop offset="0.55" stopColor="#C77B8E" />
          <stop offset="1" stopColor="#F2C1A0" />
        </linearGradient>
        <linearGradient id={`${id}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6C6FA0" />
          <stop offset="1" stopColor="#3D4372" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="40" cy="40" r="2" fill="#FFFFFF" />
      <circle cx="70" cy="24" r="1.5" fill="#FFFFFF" />
      <circle cx="160" cy="30" r="2" fill="#FFFFFF" />
      <circle cx="150" cy="58" r="10" fill="#FFF1D6" />
      <path d="M0 132 L0 112 L200 108 L200 132 Z" fill="#8C6C82" />
      <g fill="#F4ECE2">
        <rect x="14" y="104" width="172" height="30" />
        <rect x="20" y="92" width="16" height="42" />
        <rect x="164" y="92" width="16" height="42" />
        <rect x="88" y="66" width="24" height="68" />
        <rect x="56" y="98" width="20" height="36" />
        <rect x="126" y="96" width="18" height="38" />
      </g>
      <g fill="#3E7D63">
        <path d="M18 92 L28 76 L38 92 Z" />
        <path d="M162 92 L172 76 L182 92 Z" />
        <path d="M86 66 L100 34 L114 66 Z" />
        <path d="M54 98 L66 84 L78 98 Z" />
      </g>
      <path d="M124 96 A11 11 0 0 1 146 96 Z" fill="#4C8DB0" />
      <rect x="134" y="80" width="2" height="6" fill="#F2C94C" />
      <circle cx="135" cy="80" r="2" fill="#F2C94C" />
      <g fill="#F2C94C" opacity="0.9">
        <rect x="96" y="80" width="8" height="10" rx="4" />
        <rect x="24" y="110" width="8" height="6" rx="3" />
        <rect x="62" y="110" width="8" height="6" rx="3" />
        <rect x="130" y="110" width="8" height="6" rx="3" />
        <rect x="168" y="110" width="8" height="6" rx="3" />
      </g>
      <rect y="134" width="200" height="66" fill={`url(#${id}-river)`} />
      <path d="M90 142 H110 M84 152 H116 M92 164 H108" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M14 172 H50 M150 180 H186" stroke="#DCE7F4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

function River({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B880" />
          <stop offset="1" stopColor="#FBE3C2" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5FA3B8" />
          <stop offset="1" stopColor="#2F7189" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="100" cy="72" r="16" fill="#FFE2A8" />
      <path d="M-10 60 L30 52 L56 70 L60 150 L-10 160 Z" fill="#A67C66" />
      <path d="M30 52 L56 70 L50 74 L28 60 Z" fill="#3F6F52" />
      <path d="M210 70 L168 58 L144 80 L140 150 L210 160 Z" fill="#9A6F5B" />
      <path d="M168 58 L144 80 L152 82 L170 66 Z" fill="#3F6F52" />
      <path d="M-10 56 C10 46 30 48 40 54 L30 52 L-10 60 Z M150 64 C170 52 190 56 210 64 L210 70 L168 58 Z" fill="#2F5D45" />
      <path d="M56 112 C80 106 120 106 144 112 L150 200 L50 200 Z" fill={`url(#${id}-water)`} />
      <path d="M-10 150 L60 140 C70 160 60 180 40 200 L-10 200 Z" fill="#4F7A57" />
      <path d="M210 150 L140 140 C132 160 144 180 166 200 L210 200 Z" fill="#4F7A57" />
      <path d="M86 126 H108 M78 150 H98 M108 166 H128 M88 184 H112" stroke="#DCE7F4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M84 140 L116 140 L112 146 L88 146 Z" fill="#E9E0D2" />
      <path d="M92 140 L100 124 L108 140 Z" fill="#E07A87" />
      <path d="M18 150 L24 140 L30 150 Z" fill="#F4A259" />
      <path d="M24 140 L24 150" stroke="#7A4A2E" strokeWidth="1" />
    </>
  );
}

function BigCity({ id }: { id: string }) {
  const towers = [
    [30, 92, 10],
    [78, 84, 12],
    [150, 90, 10],
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8E7BD8" />
          <stop offset="0.6" stopColor="#E7A9C4" />
          <stop offset="1" stopColor="#FFE2CF" />
        </linearGradient>
        <linearGradient id={`${id}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6F7FB8" />
          <stop offset="1" stopColor="#3E4A82" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="44" cy="40" r="10" fill="#FFF2EC" opacity="0.9" />
      <g fill="#7C6AA8" opacity="0.55">
        <rect x="0" y="86" width="16" height="44" />
        <rect x="168" y="70" width="14" height="60" />
        <path d="M168 70 L175 52 L182 70 Z" />
        <rect x="184" y="92" width="16" height="38" />
      </g>
      <rect x="0" y="108" width="200" height="26" fill="#B4433F" />
      <g fill="#B4433F">
        {Array.from({ length: 20 }, (_, i) => (
          <path key={i} d={`M${i * 10 + 1} 108 L${i * 10 + 3} 102 L${i * 10 + 7} 102 L${i * 10 + 9} 108 Z`} />
        ))}
      </g>
      {towers.map(([x, top, w]) => (
        <g key={x}>
          <rect x={x} y={top} width={w} height={134 - top} fill="#A23B38" />
          <path d={`M${x - 2} ${top} L${x + w / 2} ${top - 26} L${x + w + 2} ${top} Z`} fill="#3E6B52" />
          <circle cx={x + w / 2} cy={top - 29} r="2.4" fill="#F4C84A" />
        </g>
      ))}
      <rect x="104" y="80" width="30" height="28" fill="#F3E6D6" />
      <path d="M104 80 C104 66 112 60 112 52 C112 60 120 66 120 80 Z" fill="#E36F5A" />
      <path d="M118 80 C118 70 126 64 126 58 C126 64 134 70 134 80 Z" fill="#4E9A7A" />
      <circle cx="112" cy="50" r="2" fill="#F4C84A" />
      <circle cx="126" cy="56" r="2" fill="#F4C84A" />
      <rect y="134" width="200" height="66" fill={`url(#${id}-river)`} />
      <path d="M20 150 H56 M120 156 H164 M60 176 H100 M140 186 H180" stroke="#FFF2EC" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M64 164 L120 164 L112 172 L72 172 Z" fill="#FFF2EC" />
      <rect x="80" y="157" width="28" height="7" rx="2" fill="#FFF2EC" />
      <path d="M84 160 H104" stroke="#E07A87" strokeWidth="2" />
    </>
  );
}

function Japan({ id }: { id: string }) {
  const petals = [
    [134, 64], [148, 54], [162, 62], [176, 54], [186, 70], [140, 80], [158, 76], [174, 84], [190, 88], [152, 92],
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9C8EC" />
          <stop offset="1" stopColor="#FFF2EC" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="60" cy="46" r="16" fill="#E2554B" />
      <path d="M10 130 L80 64 C86 58 94 58 100 64 L170 130 Z" fill="#6E79A8" />
      <path d="M80 64 C86 58 94 58 100 64 L112 76 L104 74 L96 82 L88 74 L78 80 L70 74 Z" fill="#FFFFFF" />
      <path d="M0 132 C50 120 120 124 200 116 L200 200 L0 200 Z" fill="#8DBF7A" />
      <path d="M0 160 C60 150 130 162 200 150 L200 200 L0 200 Z" fill="#76AD66" />
      <g fill="#D6453D">
        <rect x="30" y="122" width="6" height="52" />
        <rect x="66" y="122" width="6" height="52" />
        <path d="M20 116 L82 116 L80 122 L22 122 Z" />
        <rect x="26" y="130" width="50" height="4" />
      </g>
      <rect x="18" y="113" width="66" height="4" rx="2" fill="#2B2140" />
      <path d="M158 180 C156 150 150 124 146 104 M150 128 L130 112 M152 140 L176 122" stroke="#6B4A3E" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g fill="#F6B6C8">
        <circle cx="148" cy="78" r="26" />
        <circle cx="176" cy="74" r="22" />
        <circle cx="128" cy="98" r="16" />
        <circle cx="178" cy="104" r="16" />
      </g>
      <g fill="#FFFFFF" opacity="0.8">
        {petals.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />
        ))}
      </g>
      <g fill="#F6B6C8">
        <circle cx="110" cy="150" r="2.2" />
        <circle cx="96" cy="170" r="2" />
        <circle cx="124" cy="178" r="2.2" />
      </g>
    </>
  );
}

const scenes: Record<TripSceneName, (props: { id: string }) => JSX.Element> = {
  'frozen-lake': FrozenLake,
  'big-city': BigCity,
  japan: Japan,
  city: City,
  'forest-lake': ForestLake,
  mountains: Mountains,
  'old-town': OldTown,
  river: River,
};

export default function TripScene({ scene, size = '100%' }: TripSceneProps) {
  const id = useId().replace(/:/g, '');
  const Scene = scenes[scene];
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={sceneLabels[scene]}
      style={{ display: 'block', borderRadius: '50%' }}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <Scene id={id} />
      </g>
    </svg>
  );
}
