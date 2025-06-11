'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { tierStyles } from '../../components/profile-components/BadgeVariants';

interface BadgeProps {
  username: string;
  pullRequests: string;
  language: string;
  position: 'first' | 'second';
  icon: JSX.Element;
}

const badgeNamesMapping: Record<string, string> = {
  'rust-first': '2 Piners and maximum effort',
  'rust-second': 'Crabby Coder',
  'zig-first': "Salamander's spirit",
  'zig-second': "Salamander's Totem",
  'python-first': 'Mamba Mentality',
  'python-second': 'Basilisk Defanged',
  'go-first': 'Apex Gopher',
  'go-second': "Gopher's Apprentice",
  'javascript-first': 'Forge Smelter',
  'javascript-second': 'Prop Driller',
  'cpp-first': 'The Iron Sentinel',
  'cpp-second': 'Pointer Warden',
  'java-first': 'The JVM Juggernaut',
  'java-second': 'Bytecode Bender',
  'kotlin-first': 'Nullbane Mystic',
  'kotlin-second': 'Coroutiner',
  'flutter-first': 'Winged Architect',
  'flutter-second': 'Pixel Whisperer',
  'haskell-first': 'Monad Sage',
  'haskell-second': 'Lazy Architect',
};

const Badge: React.FC<BadgeProps> = ({
  username,
  pullRequests,
  language,
  position,
  icon,
}) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => setPortalContainer(document.body), []);

  const updateTooltipPosition = useCallback(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const tooltipWidth = 160;
      const offsetY = 10;
      const x = rect.left + rect.width / 2 - tooltipWidth / 2 + scrollX;
      const y = rect.top - offsetY - 80 + scrollY;
      const padding = 10;
      const adjustedX = Math.max(
        padding,
        Math.min(x, window.innerWidth - tooltipWidth - padding),
      );
      const adjustedY = Math.max(padding, y);
      setTooltipPosition({ x: adjustedX, y: adjustedY });
    }
  }, []);

  useEffect(() => {
    if (hovered && !isMobile) {
      updateTooltipPosition();
      const handleScroll = () => updateTooltipPosition();
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [hovered, isMobile, updateTooltipPosition]);

  const isClaimed = username !== '-';
  const tier = position === 'first' ? 'gold' : 'silver';

  const badgeKey = `${language.toLowerCase()}-${position}`;
  const badgeName = badgeNamesMapping[badgeKey] || 'Badge of Honor';

  const glowEffect: Record<string, string> = {
    bronze: 'shadow-amber-400/30',
    silver: 'shadow-gray-300/30',
    gold: 'shadow-yellow-400/30',
    diamond: 'shadow-cyan-400/30',
  };

  return (
    <div className="relative text-center flex flex-col items-center justify-center">
      <div
        ref={nodeRef}
        className={`relative w-16 h-16 rounded-full border-2 border-white/30 transition-all duration-300 ${
          isClaimed
            ? `bg-gradient-to-br ${tierStyles[tier].gradient} shadow-lg ${glowEffect[tier]}`
            : `bg-gradient-to-br ${tierStyles[tier].locked} opacity-60`
        } ${hovered ? 'scale-110 z-10' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-bold text-gray-900">
          {tier === 'silver' && '🥈'}
          {tier === 'gold' && '🥇'}
        </div>
      </div>
      <p className="text-sm text-gray-900 font-bold leading-tight mt-2">
        {badgeName}
      </p>
      <p
        className="text-sm text-gray-800 truncate max-w-[80px] font-mono"
        title={`@${username}`}
      >
        {isClaimed ? `@${username}` : 'Unclaimed'}
      </p>
      <p className="text-xs text-gray-600 text-center">
        {isClaimed ? `${pullRequests} PRs` : ''}
      </p>

      {hovered &&
        portalContainer &&
        !isMobile &&
        createPortal(
          <div
            className="fixed z-50 w-40 bg-white/75 backdrop-blur-md rounded-xl shadow-lg border border-white/50 p-2"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <h3
              className={`text-xs font-bold ${
                isClaimed ? 'text-gray-900' : 'text-gray-700'
              }`}
            >
              {`${language} ${position === 'first' ? '1st' : '2nd'} Place`}
            </h3>
            <p className="text-[10px] text-gray-700 mt-1">
              {isClaimed ? `Held by @${username}` : 'Not yet claimed'}
            </p>
            {isClaimed && (
              <p className="text-[10px] text-blue-400 mt-1">
                {`${pullRequests} Pull Requests`}
              </p>
            )}
            <div className="absolute w-2 h-2 bg-white/10 rotate-45 bottom-[-4px] left-1/2 -ml-1 border-b border-r border-white/20" />
          </div>,
          portalContainer,
        )}
    </div>
  );
};

export default Badge;
