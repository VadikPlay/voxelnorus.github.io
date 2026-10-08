import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        {/* Electric cyan gradient */}
        <linearGradient id="orbitElectricCyan" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="45%" stopColor="#00A3FF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Chassis background gradient */}
        <linearGradient id="orbitChassis" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#121826" />
          <stop offset="100%" stopColor="#080C14" />
        </linearGradient>

        {/* Subtle glow filter */}
        <filter id="neonPulse" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00A3FF" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Rounded tech chassis badge with hairline border */}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="9"
        fill="url(#orbitChassis)"
        stroke="#1E293B"
        strokeWidth="1"
      />

      {/* Subtle inner chassis hairline */}
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        rx="8"
        stroke="rgba(0, 163, 255, 0.15)"
        strokeWidth="1"
        fill="none"
      />

      {/* 1. Background ellipse arc (tilted orbital plane) */}
      <ellipse
        cx="20"
        cy="20"
        rx="13"
        ry="6"
        transform="rotate(-28 20 20)"
        stroke="#1E2E4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Central Core Sphere / Autonomous Node */}
      <circle
        cx="20"
        cy="20"
        r="4.8"
        fill="#0A101D"
        stroke="url(#orbitElectricCyan)"
        strokeWidth="1.8"
      />

      {/* Central energy spark */}
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="#FFFFFF"
        opacity="0.9"
      />

      {/* 3. Foreground dynamic orbital sweep (glowing cyan loop slicing through) */}
      <path
        d="M 9.5 24 C 11.5 28.5, 20.5 28, 27.5 23 C 33 19, 34 14.5, 30.5 12"
        stroke="url(#orbitElectricCyan)"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        filter="url(#neonPulse)"
      />

      {/* 4. Trailing planetary particle on orbit */}
      <circle
        cx="29"
        cy="13.5"
        r="1.8"
        fill="#38BDF8"
      />
      <circle
        cx="10"
        cy="25"
        r="1.2"
        fill="#0066FF"
      />
    </svg>
  );
};
