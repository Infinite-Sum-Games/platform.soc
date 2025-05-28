'use client';
// src/components/AchievementSystem/BadgeDetails.tsx
import { Lock } from 'lucide-react';
import type { Badge } from './types';

interface BadgeDetailsProps {
  badge: Badge | null;
  onClose: () => void;
}

function BadgeDetails({ badge, onClose }: BadgeDetailsProps) {
  if (!badge) return null;

  const tierStyles: Record<string, string> = {
    bronze: 'from-amber-500 via-amber-600 to-orange-600',
    silver: 'from-gray-300 via-gray-400 to-gray-500',
    gold: 'from-yellow-300 via-yellow-400 to-yellow-500',
    diamond: 'from-cyan-400 via-blue-500 to-indigo-500',
  };

  const tierStylesLocked: Record<string, string> = {
    bronze: 'from-gray-500 via-gray-600 to-gray-700',
    silver: 'from-gray-400 via-gray-500 to-gray-600',
    gold: 'from-gray-300 via-gray-400 to-gray-500',
    diamond: 'from-gray-200 via-gray-300 to-gray-400',
  };

  const tierEmoji: Record<string, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
  };

  const isUnlocked = badge.unlocked;
  const gradient = isUnlocked
    ? tierStyles[badge.tier]
    : tierStylesLocked[badge.tier];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl border overflow-hidden mx-4">
        {/* Header */}
        <div className={`h-28 bg-linear-to-br ${gradient} relative`}>
          {/* Wave pattern */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 128"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <title>Decorative wave pattern</title>
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={`wave-path-${i}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`}
                d={`M 0 ${20 + i * 10} Q 100 ${10 + i * 15}, 200 ${
                  25 + i * 8
                } T 400 ${18 + i * 12}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Icon */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 relative">
              <img
                src={badge.icon}
                alt={badge.title}
                className={`rounded-xl border-4 border-white w-full h-full object-cover ${
                  isUnlocked ? 'shadow-lg' : 'grayscale opacity-60'
                }`}
              />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                  <Lock className="w-7 h-7 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-5 px-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {badge.title}
            </h2>
            <span className="text-base">{tierEmoji[badge.tier]}</span>
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">
            {badge.description || 'No Description'}
          </p>

          {isUnlocked && badge.date && (
            <div className="flex justify-center mb-4">
              <span className="text-xs bg-blue-50 text-blue-500 px-3 py-1 rounded-full border border-blue-200">
                Unlocked on {badge.date}
              </span>
            </div>
          )}

          {!isUnlocked && badge.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            type="button"
            className="mt-3 w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
