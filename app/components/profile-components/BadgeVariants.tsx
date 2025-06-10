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

export const tierStyles = {
  bronze: {
    gradient: 'from-amber-600 via-amber-700 to-orange-800 border-amber-400',
    glow: 'shadow-amber-500/40',
    locked: 'from-gray-500 via-gray-600 to-gray-700 border-amber-400/30',
  },
  silver: {
    gradient: 'from-slate-400 via-slate-300 to-slate-600 border-slate-200',
    glow: 'shadow-slate-300/40',
    locked: 'from-gray-400 via-gray-500 to-gray-600 border-slate-300/30',
  },
  gold: {
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600 border-yellow-300',
    glow: 'shadow-yellow-400/40',
    locked: 'from-gray-300 via-gray-400 to-gray-500 border-yellow-200/30',
  },
  diamond: {
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300',
    glow: 'shadow-cyan-400/40',
    locked: 'from-gray-200 via-gray-300 to-gray-400 border-cyan-100/30',
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
    <div className="relative w-[280px] mx-auto overflow-visible group transition-all duration-500">
      <div
        className={`relative z-20 w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-2xl ${tierStyles[tier].gradient} ${tierStyles[tier].glow} transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
        <Image
          src={icon}
          alt="Badge Icon"
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className={`relative w-full h-[320px] rounded-3xl bg-gradient-to-br ${tierStyles[tier].gradient} shadow-2xl border-2 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl backdrop-blur-md`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-3xl" />
        <BackgroundWaves
          width={280}
          height={320}
          id="expanded"
        />
        <div className="relative flex flex-col gap-3 text-white px-6 pt-16 pb-6 h-full text-center">
          <div className="text-xl font-bold tracking-wide text-white drop-shadow-lg">
            {title}
          </div>
          <div className="text-sm tracking-wider text-white/80 font-medium">
            {date}
          </div>
          <div className="text-sm leading-relaxed text-white/90 overflow-y-auto max-h-24 px-2">
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
    <div className="relative w-[200px] mx-auto overflow-visible group transition-all duration-500">
      <div
        className={`relative z-20 w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-3 shadow-xl ${tierStyles[tier].gradient} ${tierStyles[tier].glow} transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
        <Image
          src={icon}
          alt="Badge Icon"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className={`relative w-full h-[120px] rounded-2xl bg-gradient-to-br ${tierStyles[tier].gradient} shadow-xl border-2 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl backdrop-blur-md`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-2xl" />
        <BackgroundWaves
          width={200}
          height={120}
          id="collapsed"
        />
        <div className="relative flex items-center justify-center h-full text-center text-base font-bold text-white px-6 drop-shadow-lg">
          {title}
        </div>
      </div>
    </div>
  );
}

export function Locked({ title, icon, tier, progress }: BadgeProps) {
  return (
    <div className="relative w-[200px] mx-auto overflow-visible group transition-all duration-500">
      <div
        className={`relative z-20 w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-3 shadow-xl transition-all duration-500 group-hover:scale-110 bg-gradient-to-br ${tierStyles[tier].locked}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30 pointer-events-none" />
        <Image
          src={icon}
          alt="Badge Icon"
          width={80}
          height={80}
          className="object-cover w-full h-full grayscale opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Lock className="w-6 h-6 text-white/80 drop-shadow-lg" />
        </div>
      </div>

      <div
        className={`relative w-full h-[140px] rounded-2xl bg-gradient-to-br ${tierStyles[tier].locked} shadow-xl border-2 transition-all duration-500 group-hover:scale-105 backdrop-blur-md`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30 rounded-2xl" />
        <BackgroundWaves
          width={200}
          height={140}
          id="locked"
        />
        <div className="relative text-center text-white/70 text-base font-semibold pt-8 px-6 drop-shadow-lg">
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
      <div className="w-full bg-black/20 rounded-full h-2 backdrop-blur-sm shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-700 shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-sm mt-3 text-white/80 text-center font-medium drop-shadow-sm">
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
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-labelledby={`ribbonTitle-${id}`}
    >
      <title id={`ribbonTitle-${id}`}>Dynamic wave background</title>
      <defs>
        <linearGradient
          id={`waveGradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="rgba(255,255,255,0.3)"
          />
          <stop
            offset="50%"
            stopColor="rgba(255,255,255,0.1)"
          />
          <stop
            offset="100%"
            stopColor="rgba(255,255,255,0.2)"
          />
        </linearGradient>
      </defs>
      {Array.from({ length: 4 }).map((_, i) => (
        <path
          key={`wave-${id}-${Math.random().toString(36).substr(2, 9)}`}
          d={`M 0 ${20 + i * (height / 4)} Q ${width / 4} ${
            15 + i * (height / 3)
          }, ${width / 2} ${25 + i * (height / 4)} T ${width} ${
            20 + i * (height / 3)
          }`}
          fill="none"
          stroke={`url(#waveGradient-${id})`}
          strokeWidth="2"
          opacity={0.6 - i * 0.1}
        />
      ))}
    </svg>
  );
}
