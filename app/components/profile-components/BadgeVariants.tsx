import { Lock } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface BadgeProps {
  title: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  description?: string;
  date?: string;
  progress?: number;
}

const tierStyles = {
  bronze: {
    gradient: 'from-amber-600 via-amber-700 to-orange-800 border-amber-400',
    glow: 'shadow-amber-500/40',
    locked: 'from-gray-500 via-gray-600 to-gray-700 border-gray-400',
  },
  silver: {
    gradient: 'from-slate-400 via-silver-300 to-slate-600 border-slate-200',
    glow: 'shadow-slate-300/40',
    locked: 'from-gray-400 via-gray-500 to-gray-600 border-gray-300',
  },
  gold: {
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600 border-yellow-300',
    glow: 'shadow-yellow-400/40',
    locked: 'from-gray-300 via-gray-400 to-gray-500 border-gray-200',
  },
  diamond: {
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300',
    glow: 'shadow-cyan-400/40',
    locked: 'from-gray-200 via-gray-300 to-gray-400 border-gray-100',
  },
};

export function Expanded({
  title,
  description = '',
  date = '',
  icon,
  tier,
  progress,
}: BadgeProps) {
  return (
    <div className="relative w-[200px] mx-auto overflow-visible group transition-all duration-300">
      <div
        className={`relative z-20 w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 shadow-lg ${tierStyles[tier].gradient} ${tierStyles[tier].glow} transition-transform duration-300 group-hover:scale-110`}
      >
        <Image
          src={icon}
          alt="Badge Icon"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className={`relative w-full h-[240px] rounded-2xl bg-white/15 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 group-hover:scale-105 bg-linear-to-br ${tierStyles[tier].gradient}`}
      >
        <BackgroundWaves
          width={200}
          height={240}
          id="expanded"
        />
        <div className="relative flex flex-col gap-2 text-white px-4 pt-14 pb-4 h-full text-center">
          <div className="text-lg font-bold tracking-wide text-gray-900">
            {title}
          </div>
          <div className="text-xs tracking-wider text-blue-300">{date}</div>
          <div className="text-xs leading-relaxed text-gray-200 overflow-y-auto max-h-20">
            {description}
          </div>
          {progress !== undefined && <ProgressBar progress={progress} />}
        </div>
      </div>
    </div>
  );
}

export function Collapsed({ title, icon, tier }: BadgeProps) {
  return (
    <div className="relative w-[140px] mx-auto overflow-visible group transition-all duration-300">
      <div
        className={`relative z-20 w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 shadow-lg ${tierStyles[tier].gradient} ${tierStyles[tier].glow} transition-transform duration-300 group-hover:scale-110`}
      >
        <Image
          src={icon}
          alt="Badge Icon"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className={`relative w-full h-[80px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 group-hover:scale-105 bg-linear-to-br ${tierStyles[tier].gradient}`}
      >
        <BackgroundWaves
          width={140}
          height={80}
          id="collapsed"
        />
        <div className="relative flex items-center justify-center h-full text-center text-sm font-semibold text-gray-900 px-4">
          {title}
        </div>
      </div>
    </div>
  );
}

export function Locked({ title, icon, tier, progress }: BadgeProps) {
  return (
    <div className="relative w-[140px] mx-auto overflow-visible group transition-all duration-300">
      <div className="relative z-20 w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={icon}
          alt="Badge Icon"
          width={64}
          height={64}
          className="object-cover w-full h-full grayscale opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Lock className="w-4 h-4 text-gray-900" />
        </div>
      </div>

      <div
        className={`relative w-full h-[100px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 group-hover:scale-105 bg-linear-to-br ${tierStyles[tier].locked}`}
      >
        <BackgroundWaves
          width={140}
          height={100}
          id="locked"
        />
        <div className="relative text-center text-gray-400 text-sm font-semibold pt-6 px-4">
          {title}
        </div>
        {progress !== undefined && <ProgressBar progress={progress} />}
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-auto">
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div
          className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs mt-2 text-gray-400 text-center">
        {progress}% to Unlock
      </div>
    </div>
  );
}

function BackgroundWaves({
  width,
  height,
  id,
}: {
  width: number;
  height: number;
  id: string;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-labelledby={`ribbonTitle-${id}`}
    >
      <title id={`ribbonTitle-${id}`}>Dynamic wave background</title>
      {Array.from({ length: 3 }).map((_, i) => (
        <path
          key={`wave-${id}-${Math.random().toString(36).substr(2, 9)}`}
          d={`M 0 ${15 + i * (height / 3)} Q ${width / 4} ${
            10 + i * (height / 2)
          }, ${width / 2} ${20 + i * (height / 3)} T ${width} ${
            15 + i * (height / 2)
          }`}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
