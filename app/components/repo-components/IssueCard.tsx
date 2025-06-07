import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import type { IssuesData } from '@/app/store/useRepositoryStore';
import { cn } from '@/lib/utils';
import { color } from 'framer-motion';
import { Code, Coins, ExternalLink, GitPullRequest } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const difficultyColorMap: Record<string, string> = {
  Easy: 'bg-emerald-100/50 text-emerald-900 border-emerald-300/50 backdrop-blur-sm',
  Medium: 'bg-amber-100/50 text-amber-900 border-amber-300/50 backdrop-blur-sm',
  Hard: 'bg-rose-100/50 text-rose-900 border-rose-300/50 backdrop-blur-sm',
};

const IssueCard = (props: IssuesData) => {
  const {
    title,
    url,
    language,
    // bounty,
    // difficulty,
    isClaimed,
    claimedByList,
    // multiplierActive,
    // multiplierValue,
    completionStatus,
    PRsActive,
  } = props;

  // const effectiveBounty =
  //   multiplierActive && multiplierValue
  //     ? Math.round(bounty * multiplierValue)
  //     : bounty;

  return (
    <Card
      className="mb-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-sm transition-all duration-300 hover:bg-white/30 hover:shadow-lg relative overflow-hidden"
      aria-label={`Issue: ${title} ${
        completionStatus
          ? '- Completed'
          : isClaimed
            ? '- Claimed'
            : '- Available'
      }`}
    >
      <div className="relative z-10">
        <CardHeader className="p-4 sm:p-5 pb-2 border-b border-white/30">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <CardTitle className="group mb-0 flex-grow min-w-0 font-semibold text-base sm:text-lg">
              <Link
                href={url}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-500 focus:text-gray-500 transition-colors duration-200"
                aria-label={`Open issue "${title}" in a new tab`}
              >
                <span className="text-gray-800 truncate">{title}</span>
                <ExternalLink
                  className="h-4 w-4 shrink-0 transition-transform duration-200 hover:scale-110"
                  aria-hidden="true"
                />
              </Link>
            </CardTitle>
            <div className="flex flex-shrink-0 gap-2 sm:ml-4">
              {/* <Badge
                className={`${
                  difficultyColorMap[difficulty] ||
                  'border-gray-400/50 bg-gray-200/50 text-gray-900 backdrop-blur-sm'
                } font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 focus:scale-105 px-3 py-1.5`}
                aria-label={`Difficulty: ${difficulty}`}
              >
                {difficulty}
              </Badge> */}
              {/* {multiplierActive && multiplierValue && (
                <Badge
                  className="transition-all scale-[1.05] bg-yellow-100 border-yellow-300 text-yellow-800 text-xs sm:text-sm font-medium px-2 py-1.5 backdrop-blur-sm"
                  aria-label={`Multiplier: ${multiplierValue}x`}
                >
                  ⚡{multiplierValue}x Multiplier
                </Badge>
              )} */}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-3 border-t border-white/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div
              className="flex flex-wrap gap-2"
              aria-label="Issue languages"
            >
              {language.map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  className="flex items-center px-3 py-1.5 text-xs sm:text-sm bg-white/40 border-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/50 focus:bg-white/50 transition-all duration-200"
                >
                  <img
                    className="mr-1.5"
                    src={`/icons/${lang.toLowerCase()}.svg`}
                    alt={lang}
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span>{lang}</span>
                </Badge>
              ))}
              {PRsActive > 0 && (
                <Badge
                  className="flex items-center px-3 py-1.5 text-xs sm:text-sm bg-white/40 border-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/50 focus:bg-white/50 transition-all duration-200"
                  aria-label={`${PRsActive} Pull Request${
                    PRsActive > 1 ? 's' : ''
                  } active`}
                >
                  <GitPullRequest
                    className="mr-1.5 h-4 w-4 text-gray-600"
                    aria-hidden="true"
                  />
                  <span>
                    {PRsActive} PR{PRsActive > 1 ? 's' : ''}
                  </span>
                </Badge>
              )}
            </div>

            <div className="sm:ml-4 flex flex-wrap items-center gap-3">
              {/* <div
                className="flex items-center group"
                aria-label={`Bounty: ${effectiveBounty} points`}
              >
                <Coins
                  className={cn(
                    'mr-1.5 h-5 w-5 text-gray-600 transition-colors duration-200',
                  )}
                  color="var(--color-orange-400)"
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'font-extrabold text-base sm:text-lg text-orange-400 transition-all duration-200',
                  )}
                >
                  {effectiveBounty}
                </span>
                {multiplierActive &&
                  multiplierValue &&
                  bounty !== effectiveBounty && (
                    <span
                      className="ml-1.5 text-gray-500 text-xs sm:text-sm line-through"
                      aria-label={`Original bounty: ${bounty}`}
                    >
                      {bounty}
                    </span>
                  )}
              </div> */}
              {isClaimed ? (
                <div className="flex items-center flex-wrap gap-2">
                  {claimedByList.slice(0, 2).map((user, idx) => (
                    <Badge
                      key={user}
                      className="bg-sky-100 border-blue-800 text-blue-900 text-xs sm:text-sm px-3 py-1.5 font-medium"
                      aria-label={`Claimed by ${user}`}
                    >
                      @{user}
                    </Badge>
                  ))}
                  {claimedByList.length > 2 && (
                    <Badge className="bg-sky-100 border-blue-800 text-blue-900 text-xs px-2 py-1.5 font-medium">
                      +{claimedByList.length - 2} more
                    </Badge>
                  )}
                </div>
              ) : (
                <Badge
                  className="bg-green-100 border-green-800 text-green-900 text-xs sm:text-sm px-3 py-1.5 font-medium"
                  aria-label="Issue is available"
                >
                  Available
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default IssueCard;
