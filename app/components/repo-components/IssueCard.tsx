import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import type { IssuesData } from '@/app/store/useRepositoryStore';
import { cn } from '@/lib/utils';
import { Code, ExternalLink, GitPullRequest, Star, Tag } from 'lucide-react';
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
    bounty,
    difficulty,
    isClaimed,
    claimedByList,
    multiplierActive,
    multiplierValue,
    completionStatus,
    PRsActive,
  } = props;

  const effectiveBounty =
    multiplierActive && multiplierValue
      ? Math.round(bounty * multiplierValue)
      : bounty;

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
            <CardTitle className="group mb-0 flex items-center font-semibold text-base sm:text-lg">
              <span className="mr-2 line-clamp-2 text-gray-800 transition-colors duration-200">
                {title}
              </span>
              <Link
                href={url}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-500 focus:text-gray-500 transition-colors duration-200"
                aria-label={`Open issue "${title}" in a new tab`}
              >
                <ExternalLink
                  className="h-4 w-4 transition-transform duration-200 hover:scale-110"
                  aria-hidden="true"
                />
              </Link>
            </CardTitle>
            <div className="flex shrink-0 gap-2">
              <Badge
                className={`${
                  difficultyColorMap[difficulty] ||
                  'border-gray-400/50 bg-gray-200/50 text-gray-900 backdrop-blur-sm'
                } font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 focus:scale-105 px-3 py-1.5`}
                aria-label={`Difficulty: ${difficulty}`}
              >
                {difficulty}
              </Badge>
              {multiplierActive && multiplierValue && (
                <Badge
                  className="bg-white/40 border-white/40 text-gray-800 text-xs sm:text-sm backdrop-blur-sm px-3 py-1.5 hover:bg-white/50 focus:bg-white/50 transition-all duration-200"
                  aria-label={`Multiplier: ${multiplierValue}x`}
                >
                  <Star
                    className="mr-1.5 h-4 w-4 text-gray-600"
                    aria-hidden="true"
                  />
                  {multiplierValue}x
                </Badge>
              )}
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
              <div
                className="flex items-center group"
                aria-label={`Bounty: ${effectiveBounty} points`}
              >
                <Tag
                  className={cn(
                    'mr-1.5 h-4 w-4 text-gray-600 transition-colors duration-200',
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'font-semibold text-sm sm:text-base text-gray-800 transition-all duration-200',
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
              </div>

              {isClaimed ? (
                <Badge
                  className="bg-white/40 border-white/40 text-gray-800 text-xs sm:text-sm transition-all duration-200 backdrop-blur-sm px-3 py-1.5 hover:bg-white/50 focus:bg-white/50"
                  aria-label={
                    claimedByList.length > 0
                      ? `Claimed by ${claimedByList[0]}`
                      : 'Claimed'
                  }
                >
                  <span className="flex items-center">
                    {claimedByList.length > 0 && (
                      <span className="mr-1.5 font-normal">
                        @{claimedByList[0]}
                      </span>
                    )}
                    <span className="font-medium">Claimed</span>
                  </span>
                </Badge>
              ) : (
                <Badge
                  className="bg-white/40 border-white/40 text-gray-800 text-xs sm:text-sm transition-all duration-200 backdrop-blur-sm px-3 py-1.5 hover:bg-white/50 focus:bg-white/50"
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
