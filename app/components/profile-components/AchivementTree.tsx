import { useEffect, useState } from 'react';
import BadgeNode from './BadgeNode';
import { categories } from './data';
import type { Badge, Category, Connection } from './types';

// AchievementTree Component
export default function AchievementTree({
  category,
  badges,
  onClick,
}: {
  category: Category;
  badges: Badge[];
  onClick: (badge: Badge) => void;
}) {
  // Add state for responsive calculations
  const [isMobile, setIsMobile] = useState(false);

  // Add useEffect to handle responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Same breakpoint as sm: in Tailwind
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const categoryBadges = badges.filter(
    (b: Badge) => b.category === category.id,
  );
  const catDetails = categories.find((c: Category) => c.id === category.id);

  // Calculate connections between badges based on requirements
  const connections: Record<string, Connection> = {};

  // Replace forEach with for...of
  for (const badge of categoryBadges) {
    if (badge.requires) {
      for (const reqId of badge.requires) {
        // Only create connections within same category for cleaner UI
        const reqBadge = badges.find(
          (b: Badge) => b.id === reqId && b.category === category.id,
        );
        if (reqBadge) {
          const key = `${reqBadge.id}-${badge.id}`;
          connections[key] = {
            from: reqBadge.id,
            to: badge.id,
            unlocked: reqBadge.unlocked && badge.unlocked,
          };
        }
      }
    }
  }

  // Calculate responsive scales
  const badgeWidth = isMobile ? 80 : 100; // Reduce width on mobile
  const badgeHeight = isMobile ? 32 : 40; // Reduce height on mobile

  // Special layout for "lang_mastery" category (Language Competition)
  if (category.id === 'lang_mastery') {
    // Group badges by language (positions are paired: 1-2 Rust, 3-4 Zig, etc.)
    const languageGroups: { language: string; badges: Badge[] }[] = [
      {
        language: 'Rust',
        badges: categoryBadges.filter((b) => b.position <= 2),
      },
      // {
      //   language: 'Zig',
      //   badges: categoryBadges.filter(
      //     (b) => b.position >= 3 && b.position <= 4,
      //   ),
      // },
      {
        language: 'Python',
        badges: categoryBadges.filter(
          (b) => b.position >= 5 && b.position <= 6,
        ),
      },
      {
        language: 'Go',
        badges: categoryBadges.filter(
          (b) => b.position >= 7 && b.position <= 8,
        ),
      },
      {
        language: 'JS/TS',
        badges: categoryBadges.filter(
          (b) => b.position >= 9 && b.position <= 10,
        ),
      },
    ];

    // Scale vertical connections for mobile
    const verticalLineHeight = isMobile ? 110 : 132;
    const verticalX = isMobile ? 40 : 72; // Center of badge
    const verticalY1 = isMobile ? 56 : 72; // Center of first badge
    const verticalY2 = isMobile ? 110 : 136; // Center of second badge

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{catDetails?.icon ?? '❓'}</span>
          <h2 className="text-lg text-gray-900 font-bold">
            {catDetails?.name ?? 'Unknown Category'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {languageGroups.map((group) => (
            <div
              key={`language-${group.language}`}
              className="relative flex flex-col items-center"
            >
              {/* Language Header */}
              <h3 className="text-sm text-gray-900 font-semibold mb-1">
                {group.language}
              </h3>

              {/* Connection Lines for this language group */}
              <svg
                className="absolute top-8 w-full h-full pointer-events-none"
                aria-hidden="true"
                role="presentation"
                style={{ height: verticalLineHeight }}
              >
                <title>Connection lines between badges</title>
                {Object.values(connections)
                  .filter(
                    (conn) =>
                      group.badges.some((b) => b.id === conn.from) &&
                      group.badges.some((b) => b.id === conn.to),
                  )
                  .map((conn: Connection) => {
                    const fromBadge = group.badges.find(
                      (b) => b.id === conn.from,
                    );
                    const toBadge = group.badges.find((b) => b.id === conn.to);

                    if (!fromBadge || !toBadge) return null;

                    return (
                      <line
                        key={`conn-${conn.from}-${conn.to}`}
                        x1={verticalX}
                        y1={verticalY1}
                        x2={verticalX}
                        y2={verticalY2}
                        stroke={conn.unlocked ? '#4ADE80' : '#6B7280'}
                        strokeWidth="2"
                        strokeDasharray={conn.unlocked ? '' : '4,4'}
                      />
                    );
                  })}
              </svg>

              {/* Badges */}
              <div className="flex flex-col items-center gap-2">
                {group.badges
                  .sort((a: Badge, b: Badge) => a.position - b.position)
                  .map((badge: Badge) => (
                    <BadgeNode
                      key={badge.id}
                      badge={badge}
                      allBadges={badges}
                      onClick={onClick}
                      expanded={false}
                      connectionStates={connections}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default layout for other categories
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{catDetails?.icon ?? '❓'}</span>
        <h2 className="text-lg text-gray-900 font-bold">
          {catDetails?.name ?? 'Unknown Category'}
        </h2>
      </div>

      <div className="relative">
        {/* Connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          role="presentation"
        >
          <title>Achievement connections</title>
          {Object.values(connections).map((conn: Connection) => {
            const fromBadge = categoryBadges.find(
              (b: Badge) => b.id === conn.from,
            );
            const toBadge = categoryBadges.find((b) => b.id === conn.to);

            if (!fromBadge || !toBadge) return null;

            // Calculate positions for straight horizontal lines with responsive scaling
            const fromX =
              (fromBadge.position - 1) * badgeWidth + badgeWidth / 2;
            const toX = (toBadge.position - 1) * badgeWidth + badgeWidth / 2;

            return (
              <line
                key={`conn-${conn.from}-${conn.to}`}
                x1={fromX}
                y1={badgeHeight}
                x2={toX}
                y2={badgeHeight}
                stroke={conn.unlocked ? '#4ADE80' : '#6B7280'}
                strokeWidth="2"
                strokeDasharray={conn.unlocked ? '' : '4,4'}
              />
            );
          })}
        </svg>

        {/* Badges */}
        <div className="flex flex-wrap items-center">
          {categoryBadges
            .sort((a: Badge, b: Badge) => a.position - b.position)
            .map((badge: Badge) => (
              <div
                key={badge.id}
                className="mx-1 sm:mx-2 first:ml-0 last:mr-0"
                style={{ order: badge.position }}
              >
                <BadgeNode
                  badge={badge}
                  allBadges={badges}
                  onClick={onClick}
                  expanded={false}
                  connectionStates={connections}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
