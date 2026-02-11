import React from 'react';

interface CanadaSVGProps {
  className?: string;
  glowColor?: string;
}

export function CanadaSVG({ className, glowColor = 'rgba(100, 200, 255, 0.15)' }: CanadaSVGProps) {
  return (
    <svg
      viewBox="0 0 1000 700"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(100,200,255,0.08)" />
          <stop offset="100%" stopColor="rgba(100,200,255,0.02)" />
        </linearGradient>
      </defs>

      <g fill="url(#mapGrad)" stroke="rgba(100,200,255,0.3)" strokeWidth="1.2" filter="url(#glow)" strokeLinejoin="round">
        {/* British Columbia */}
        <path d="M80,280 L80,180 L100,160 L110,120 L130,100 L140,130 L160,110 L170,140 L180,120 L190,150 L200,140 L195,180 L200,200 L190,220 L195,260 L185,290 L180,320 L160,350 L140,370 L120,380 L100,360 L90,330 L80,310 Z" />

        {/* Alberta */}
        <path d="M195,180 L200,140 L220,130 L240,140 L260,130 L260,180 L260,260 L260,320 L260,370 L195,370 L185,290 L195,260 L190,220 Z" />

        {/* Saskatchewan */}
        <path d="M260,130 L280,120 L310,125 L340,120 L340,180 L340,260 L340,370 L260,370 L260,320 L260,260 L260,180 Z" />

        {/* Manitoba */}
        <path d="M340,120 L360,110 L380,120 L400,100 L420,120 L430,160 L430,200 L425,260 L420,320 L420,370 L340,370 L340,260 L340,180 Z" />

        {/* Ontario */}
        <path d="M430,160 L450,140 L480,130 L510,140 L540,120 L570,130 L590,150 L600,180 L610,220 L600,260 L580,300 L560,340 L540,370 L520,390 L490,400 L460,390 L440,380 L420,370 L420,320 L425,260 L430,200 Z" />

        {/* Quebec */}
        <path d="M590,150 L610,130 L640,110 L670,100 L700,90 L720,100 L740,120 L750,150 L755,190 L750,230 L740,270 L720,310 L700,340 L680,360 L650,380 L620,390 L590,380 L560,370 L540,370 L560,340 L580,300 L600,260 L610,220 L600,180 Z" />

        {/* New Brunswick */}
        <path d="M720,310 L740,300 L760,310 L770,340 L760,370 L740,380 L720,370 L710,350 L700,340 Z" />

        {/* Nova Scotia */}
        <path d="M760,370 L780,350 L810,340 L830,350 L840,370 L830,390 L810,400 L790,395 L770,390 Z" />

        {/* PEI */}
        <path d="M780,320 L800,315 L810,325 L800,335 L780,330 Z" />

        {/* Newfoundland */}
        <path d="M790,200 L820,180 L850,190 L870,210 L860,240 L840,260 L820,270 L800,260 L790,240 L785,220 Z" />

        {/* Yukon */}
        <path d="M80,180 L80,100 L90,60 L110,40 L130,50 L140,80 L130,100 L110,120 L100,160 Z" />

        {/* Northwest Territories */}
        <path d="M140,80 L170,60 L210,50 L260,40 L310,50 L340,60 L360,50 L380,60 L370,80 L360,110 L340,120 L310,125 L280,120 L260,130 L240,140 L220,130 L200,140 L190,150 L180,120 L170,140 L160,110 L140,130 Z" />

        {/* Nunavut */}
        <path d="M380,60 L420,40 L470,30 L520,20 L570,30 L610,50 L640,40 L670,50 L700,40 L720,60 L710,90 L700,90 L670,100 L640,110 L610,130 L590,150 L570,130 L540,120 L510,140 L480,130 L450,140 L430,160 L420,120 L400,100 L380,120 L360,110 L370,80 Z" />

        {/* Arctic Islands */}
        <path d="M350,30 L380,15 L420,10 L460,5 L500,10 L540,5 L570,15 L600,10 L630,20 L640,40 L610,50 L570,30 L520,20 L470,30 L420,40 L380,60 L360,50 Z" opacity="0.5" />
        <path d="M640,20 L670,10 L710,15 L740,30 L750,50 L740,70 L720,60 L700,40 L670,50 L640,40 Z" opacity="0.5" />

        {/* Labrador */}
        <path d="M700,90 L710,90 L720,100 L740,120 L750,150 L760,130 L780,150 L790,200 L785,220 L770,200 L755,190 L750,150 L740,120 L720,100 Z" opacity="0.7" />
      </g>

      {/* Province borders - subtle inner lines */}
      <g fill="none" stroke="rgba(100,200,255,0.1)" strokeWidth="0.5" strokeDasharray="4,4">
        {/* AB/SK border */}
        <line x1="260" y1="130" x2="260" y2="370" />
        {/* SK/MB border */}
        <line x1="340" y1="120" x2="340" y2="370" />
        {/* ON/QC approximate */}
        <path d="M590,150 L570,200 L560,260 L550,340 L540,370" />
      </g>
    </svg>
  );
}
