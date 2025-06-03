'use client';
import { useEffect, useState } from 'react';
import AchievementTree from './AchivementTree';
import BadgeDetails from './BadgeDetails';
import { categories } from './data';
import { achievementData } from './data';
import type { Badge, Category } from './types';

function GameAchievementSystem() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [achievements, setAchievements] = useState<Badge[]>([]);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate a network request delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAchievements(achievementData);
      } catch (error) {
        console.error('Error loading achievement data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredBadges = achievements.filter((badge: Badge) => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  // TODO: To be fixed when rolling out the trophy room
  // const unlockedCount = achievements.filter((b: Badge) => b.unlocked).length;
  const unlockedCount = 0;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((0 / totalCount) * 100) || 0;

  // Get latest unlocked achievements (last 3 unlocked, sorted by date)
  const latestAchievements = achievements
    .filter((b: Badge) => b.unlocked && b.date)
    .sort((a: Badge, b: Badge) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

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
        {/* Filter Controls Skeleton */}
        <div className="mt-3 flex justify-center gap-3">
          <div className="h-6 bg-gray-300/30 rounded-xl w-16" />
          <div className="h-6 bg-gray-300/30 rounded-xl w-24" />
          <div className="h-6 bg-gray-300/30 rounded-xl w-20" />
        </div>
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

  return (
    <div className="h-screen flex flex-col sm:px-6 lg:px-0 py-8">
      <div className="relative w-full max-w-full grow overflow-y-auto overflow-x-visible">
        <div className="bg-white/20 backdrop-blur-2xl text-gray-900 p-3 rounded-2xl border border-white/30 flex flex-col">
          <div className="max-w-full mx-auto w-full overflow-y-auto grow rounded-md">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                {/* Header */}
                <div className="mb-4 bg-white/25 backdrop-blur-2xl rounded-xl p-4 border border-white/30 divide-y divide-white/10">
                  <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Trophy Room - Coming Soon!
                    </h1>
                    <p className="text-gray-700 text-sm text-center mb-3">
                      Unlock skills and advance through the tech tree by
                      contributing to projects. Track your progress and compete
                      in language mastery challenges!
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
                  {/* Filter Controls */}
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
                </div>

                {/* Achievement Trees */}
                {/* {categories.map((category: Category) => { */}
                {/*   const categoryBadges = filteredBadges.filter( */}
                {/*     (b: Badge) => b.category === category.id, */}
                {/*   ); */}
                {/*   if (categoryBadges.length === 0) return null; */}
                {/*   return ( */}
                {/*     <div */}
                {/*       className="mx-4" */}
                {/*       key={category.id} */}
                {/*     > */}
                {/*       <AchievementTree */}
                {/*         category={category} */}
                {/*         badges={filteredBadges} */}
                {/*         onClick={handleBadgeClick} */}
                {/*       /> */}
                {/*     </div> */}
                {/*   ); */}
                {/* })} */}
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
