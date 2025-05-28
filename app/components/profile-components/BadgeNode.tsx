'use client';
import { Lock } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Badge, Connection, TierStyles } from './types';

interface BadgeNodeProps {
  badge: Badge;
  allBadges: Badge[];
  onClick: (badge: Badge) => void;
  expanded?: boolean;
  connectionStates?: Record<string, Connection>;
}

interface TooltipPosition {
  x: number;
  y: number;
}

function BadgeNode({
  badge,
  allBadges,
  onClick,
  expanded,
  connectionStates,
}: BadgeNodeProps) {
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });
  const nodeRef = useRef<HTMLButtonElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize portal container on mount
  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const updateTooltipPosition = useCallback(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  }, []);

  // Update tooltip position when hovered changes or on scroll events
  useEffect(() => {
    if (hovered && !isMobile) {
      updateTooltipPosition();

      const handleScroll = () => {
        updateTooltipPosition();
      };

      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [hovered, updateTooltipPosition, isMobile]);

  const tierStyles: TierStyles = {
    bronze: 'from-amber-600 via-amber-700 to-orange-800 border-amber-400',
    silver: 'from-slate-400 via-silver-300 to-slate-600 border-slate-200',
    gold: 'from-yellow-400 via-amber-500 to-yellow-600 border-yellow-300',
    diamond: 'from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300',
  };

  const tierStylesLocked: TierStyles = {
    bronze: 'from-gray-500 via-gray-600 to-gray-700 border-gray-400',
    silver: 'from-gray-400 via-gray-500 to-gray-600 border-gray-300',
    gold: 'from-gray-300 via-gray-400 to-gray-500 border-gray-200',
    diamond: 'from-gray-200 via-gray-300 to-gray-400 border-gray-100',
  };

  const glowEffect: TierStyles = {
    bronze: 'shadow-amber-500/40',
    silver: 'shadow-slate-300/40',
    gold: 'shadow-yellow-400/40',
    diamond: 'shadow-cyan-400/40',
  };

  const isLocked =
    !badge.unlocked &&
    badge.requires?.some((reqId) => {
      const requiredBadge = allBadges.find((b) => b.id === reqId);
      return requiredBadge && !requiredBadge.unlocked;
    });

  return (
    <div className="relative">
      <button
        ref={nodeRef}
        type="button"
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 cursor-pointer transition-all duration-300 ${
          badge.unlocked
            ? `bg-linear-to-br ${tierStyles[badge.tier]} shadow-lg ${
                glowEffect[badge.tier]
              }`
            : `bg-linear-to-br ${tierStylesLocked[badge.tier]} ${
                isLocked ? 'opacity-100' : ''
              }`
        } ${hovered ? 'scale-110 z-10' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(badge)}
        aria-label={`View details for ${badge.title}`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0">
            <svg
              className="w-full h-full opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-labelledby={`pattern-title-${badge.id}`}
            >
              <title id={`pattern-title-${badge.id}`}>Ripple background</title>
              {Array.from({ length: 5 }).map((_, i) => (
                <circle
                  key={`circle-${badge.id}-${i}`}
                  cx="50"
                  cy="50"
                  r={20 + i * 15}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <img
            src={badge.icon}
            alt={badge.title}
            className={`w-full h-full object-cover transition-all ${
              badge.unlocked ? '' : 'grayscale opacity-60'
            }`}
          />

          {!badge.unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Lock className="w-4 h-4 text-gray-900" />
            </div>
          )}
        </div>

        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-bold text-gray-900">
          {badge.tier === 'bronze' && '🥉'}
          {badge.tier === 'silver' && '🥈'}
          {badge.tier === 'gold' && '🥇'}
          {badge.tier === 'diamond' && '💎'}
        </div>

        {!badge.unlocked && badge.progress !== undefined && (
          <svg
            className="absolute -top-2 -right-2 w-6 h-6 rotate-270"
            role="img"
            aria-labelledby={`progress-title-${badge.id}`}
          >
            <title id={`progress-title-${badge.id}`}>Progress indicator</title>
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#374151"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 6}`}
              strokeDashoffset={`${
                2 * Math.PI * 6 * (1 - badge.progress / 100)
              }`}
              fill="none"
            />
          </svg>
        )}
      </button>

      {hovered &&
        portalContainer &&
        !isMobile &&
        createPortal(
          <div
            className="fixed z-50 w-40 bg-white/75 backdrop-blur-md rounded-xl shadow-lg border border-white/50 p-2"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 10}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <h3
              className={`text-xs font-bold ${
                badge.unlocked ? 'text-gray-900' : 'text-gray-700'
              }`}
            >
              {badge.title}
            </h3>
            <p className="text-[10px] text-gray-700 mt-1">
              {badge.description}
            </p>
            {!badge.unlocked && badge.progress !== undefined && (
              <div className="mt-1">
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className="bg-blue-400 h-1 rounded-full"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {badge.progress}% Complete
                </p>
              </div>
            )}
            {badge.unlocked && badge.date && (
              <p className="text-[10px] text-blue-300 mt-1">
                Unlocked on {badge.date}
              </p>
            )}
            <div className="absolute w-2 h-2 bg-white/10 rotate-45 bottom-[-4px] left-1/2 -ml-1 border-b border-r border-white/20" />
          </div>,
          portalContainer,
        )}
    </div>
  );
}

export default BadgeNode;
