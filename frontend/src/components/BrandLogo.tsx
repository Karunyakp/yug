type BrandLogoProps = {
  compact?: boolean;
  className?: string;
  textClassName?: string;
};

export default function BrandLogo({ compact = false, className = '', textClassName = '' }: BrandLogoProps) {
  const shieldSize = compact ? 'h-9 w-9' : 'h-20 w-20';
  const textSize = compact ? 'text-lg' : 'text-[4.2rem] leading-[0.9]';

  return (
    <div className={`flex ${compact ? 'items-center gap-3' : 'flex-col items-center'} ${className}`}>
      <svg
        viewBox="0 0 220 220"
        className={shieldSize}
        aria-label="CodeGuard logo"
        role="img"
      >
        <defs>
          <linearGradient id="codeguard-shield" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1de2ff" />
            <stop offset="100%" stopColor="#1ea7ff" />
          </linearGradient>
        </defs>
        <path
          d="M110 18 L178 44 L178 98 C178 147 149 181 110 198 C71 181 42 147 42 98 L42 44 L110 18 Z"
          fill="url(#codeguard-shield)"
          stroke="#7ae9ff"
          strokeWidth="8"
        />
        <path
          d="M110 42 L164 62 L164 98 C164 131 143 156 110 174 C77 156 56 131 56 98 L56 62 L110 42 Z"
          fill="none"
          stroke="rgba(255,255,255,0.86)"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="M80 82 L99 104 L80 126 M140 82 L121 104 L140 126"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M95 70 L110 150 L125 70"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
        />
      </svg>

      {!compact && (
        <div className={`font-black tracking-[-0.08em] text-white ${textSize} ${textClassName}`}>
          <span>Code</span>
          <span className="text-cyan-300">Guard</span>
        </div>
      )}

      {compact && (
        <div className={`flex items-end text-white ${textClassName}`}>
          <span className="text-xl font-black tracking-[-0.06em]">Code</span>
          <span className="text-xl font-black tracking-[-0.06em] text-cyan-300">Guard</span>
        </div>
      )}
    </div>
  );
}
