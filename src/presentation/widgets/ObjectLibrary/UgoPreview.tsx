import React from 'react';
import { ObjectType } from '@/domain/types/ObjectType';

export const UgoPreview: React.FC<{ type: ObjectType }> = ({ type }) => {
  const common = {
    width: 28,
    height: 24,
    viewBox: '-40 -40 80 80',
    fill: 'none',
    stroke: '#34495E',
    strokeWidth: 3,
    strokeLinecap: 'square' as const,
  };

  switch (type) {
    case ObjectType.CIRCUIT_BREAKER:
      return (
        <svg {...common}>
          <line x1="0" y1="-35" x2="0" y2="-12" />
          <line x1="0" y1="-12" x2="-12" y2="14" />
          <line x1="0" y1="14" x2="0" y2="35" />
          <circle cx="0" cy="-12" r="3" fill="#34495E" stroke="none" />
        </svg>
      );
    case ObjectType.FUSE:
      return (
        <svg {...common}>
          <line x1="0" y1="-35" x2="0" y2="35" />
          <rect x="-10" y="-18" width="20" height="36" />
        </svg>
      );
    case ObjectType.LAMP:
      return (
        <svg {...common}>
          <line x1="0" y1="-35" x2="0" y2="-20" />
          <circle cx="0" cy="0" r="20" />
          <line x1="-14" y1="-14" x2="14" y2="14" />
          <line x1="-14" y1="14" x2="14" y2="-14" />
          <line x1="0" y1="20" x2="0" y2="35" />
        </svg>
      );
    case ObjectType.MOTOR:
      return (
        <svg {...common}>
          <circle cx="0" cy="0" r="24" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="22"
            fill="#34495E"
            stroke="none"
            fontWeight="bold"
          >
            M
          </text>
        </svg>
      );
    case ObjectType.RELAY:
    case ObjectType.CONTACTOR:
      return (
        <svg {...common}>
          <line x1="0" y1="-35" x2="0" y2="-16" />
          <rect x="-18" y="-16" width="36" height="32" />
          <line x1="-12" y1="10" x2="12" y2="-10" />
          <line x1="0" y1="16" x2="0" y2="35" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="-20" y="-14" width="40" height="28" rx="3" />
          <line x1="0" y1="-30" x2="0" y2="-14" />
          <line x1="0" y1="14" x2="0" y2="30" />
        </svg>
      );
  }
};
