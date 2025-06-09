'use client';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AchievementTree from './AchivementTree';
import BadgeDetails from './BadgeDetails';
import { badgeMap, categories } from './data';
import type { Badge, Category } from './types';

interface GameAchievementSystemProps {
  badges: string[] | undefined;
}

function GameAchievementSystem({ badges }: GameAchievementSystemProps) {
  const { github_username } = useParams();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [achievements, setAchievements] = useState<Badge[]>([]);

  // Check if viewing own profile
  const isOwnProfile = user?.github_username === github_username;

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const unlockedBadgeObjects: Badge[] = (badges || [])
          .map((title) => badgeMap[title])
          .filter(Boolean)
          .map((badge) => ({ ...badge, unlocked: true }));

        const unlockedIds = new Set(unlockedBadgeObjects.map((b) => b.id));

        const lockedBadgeObjects: Badge[] = Object.values(badgeMap)
          .filter((badge) => !unlockedIds.has(badge.id))
          .map((badge) => ({ ...badge, unlocked: false }));

        setAchievements([...unlockedBadgeObjects, ...lockedBadgeObjects]);
      } catch (err) {
        console.error('Error processing badges:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [badges]);

  // If not own profile, only show unlocked badges
  const filteredBadges = achievements.filter((badge: Badge) => {
    if (!isOwnProfile) return badge.unlocked; // Only show unlocked for others

    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  const unlockedCount = achievements.filter((b) => b.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // Check if there are any badges to display
  const hasVisibleBadges = categories.some((category: Category) => {
    const categoryBadges = filteredBadges.filter(
      (b: Badge) => b.category === category.id,
    );
    return categoryBadges.length > 0;
  });

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-4 bg-white/25 backdrop-blur-2xl rounded-xl p-4 border border-white/30">
        <div className="flex flex-col items-center">
          <div className="h-8 bg-gray-300/30 rounded w-64 mb-2" />
          <div className="h-4 bg-gray-300/30 rounded w-full mb-3" />
          <div className="h-4 bg-gray-300/30 rounded w-3/4 mb-3" />
          <div className="w-24 bg-gray-300/30 rounded-full h-1.5 mb-1" />
          <div className="h-3 bg-gray-300/30 rounded w-20 mb-3" />
        </div>
        {/* Filter Controls Skeleton - only show for own profile */}
        {isOwnProfile && (
          <div className="mt-3 flex justify-center gap-3">
            <div className="h-6 bg-gray-300/30 rounded-xl w-16" />
            <div className="h-6 bg-gray-300/30 rounded-xl w-24" />
            <div className="h-6 bg-gray-300/30 rounded-xl w-20" />
          </div>
        )}
      </div>

      {/* Achievement Tree Skeletons */}
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="mb-4 bg-white/25 backdrop-blur-2xl rounded-xl p-4 border border-white/30"
        >
          {/* Category Title */}
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 bg-gray-300/30 rounded-full mr-2" />
            <div className="h-6 bg-gray-300/30 rounded w-40" />
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((badge) => (
              <div
                key={badge}
                className="flex flex-col items-center"
              >
                <div className="h-20 w-20 bg-gray-300/30 rounded-full mb-2" />
                <div className="h-4 bg-gray-300/30 rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="mx-4">
      <div className="bg-white/25 backdrop-blur-2xl rounded-xl p-8 border border-white/30 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Empty trophy room icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Trophy Room is Empty
        </h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          {isOwnProfile
            ? 'Start contributing to projects and completing challenges to unlock your first achievements!'
            : `${github_username} hasn't unlocked any achievements yet. Check back later to see their progress!`}
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col sm:px-6 lg:px-0 py-8">
      <div className="relative w-full max-w-full flex-1 overflow-y-auto overflow-x-visible  rounded-2xl">
        <div className="bg-white/20 backdrop-blur-2xl text-gray-900 p-3  border border-white/30 flex flex-col min-h-full ">
          <div className="max-w-full mx-auto w-full overflow-y-auto flex-1 rounded-md">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                {/* Header */}
                <div className="mb-4 bg-white/25 backdrop-blur-2xl rounded-xl p-4 border border-white/30 divide-y divide-white/10">
                  <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Trophy Room
                    </h1>
                    <p className="text-gray-700 text-sm text-center mb-3">
                      {isOwnProfile
                        ? 'Unlock skills and advance through the tech tree by contributing to projects. Track your progress and compete in language mastery challenges!'
                        : `Explore ${github_username}'s achievement collection and see their coding journey through various challenges and contributions.`}
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="w-24 bg-white/10 rounded-full h-1.5 mb-1">
                        <div
                          className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">
                        {unlockedCount}/{totalCount} Achievements (
                        {progressPercentage}%)
                      </span>
                    </div>
                  </div>
                  {/* Filter Controls - only show for own profile */}
                  {isOwnProfile && (
                    <div className="mt-3 flex justify-center gap-3">
                      <button
                        className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                          filter === 'all'
                            ? 'bg-white/25 backdrop-blur-md text-gray-900'
                            : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                        }`}
                        onClick={() => setFilter('all')}
                        type="button"
                      >
                        All
                      </button>
                      <button
                        className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                          filter === 'unlocked'
                            ? 'bg-white/25 backdrop-blur-md text-gray-900'
                            : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                        }`}
                        onClick={() => setFilter('unlocked')}
                        type="button"
                      >
                        Unlocked
                      </button>
                      <button
                        className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                          filter === 'locked'
                            ? 'bg-white/25 backdrop-blur-md text-gray-900'
                            : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                        }`}
                        onClick={() => setFilter('locked')}
                        type="button"
                      >
                        Locked
                      </button>
                    </div>
                  )}
                </div>

                <div className="">
                  {/* Show empty state if no visible badges */}
                  {!hasVisibleBadges ? (
                    <EmptyState />
                  ) : (
                    /* Achievement Trees */
                    categories.map((category: Category) => {
                      const categoryBadges = filteredBadges.filter(
                        (b: Badge) => b.category === category.id,
                      );
                      if (categoryBadges.length === 0) return null;
                      return (
                        <div
                          className="mx-4"
                          key={category.id}
                        >
                          <AchievementTree
                            category={category}
                            badges={filteredBadges}
                            onClick={handleBadgeClick}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* Badge Details Modal */}
          {selectedBadge && (
            <BadgeDetails
              badge={selectedBadge}
              onClose={() => setSelectedBadge(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameAchievementSystem;
