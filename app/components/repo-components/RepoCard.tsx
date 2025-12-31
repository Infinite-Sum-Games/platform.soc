import { useTheme } from '@/app/components/theme-context';
import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import type { ReposData } from '@/app/store/useRepositoryStore';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const RepoCard = (props: ReposData) => {
  const { classes } = useTheme();

  return (
    <Card
      className={`bg-white/45 border ${classes.selectedChipBorder} shadow-sm w-full transition-all duration-300 hover:${classes.cardHover} hover:shadow-lg`}
    >
      <div className="flex h-full flex-row items-center justify-between p-4 sm:p-5">
        <div>
          <CardHeader className={`p-0 pb-2 border-b ${classes.cardBorder}`}>
            <div className="flex flex-row items-center ">
              <CardTitle className="mb-0">
                <a
                  href={props.url}
                  className="text-xl sm:text-2xl font-bold flex flex-row items-center text-gray-900 focus:text-gray-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="hidden md:block mr-3 h-6 w-6 flex-shrink-0"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                  <span className="line-clamp-2 text-left">{props.name}</span>
                </a>
              </CardTitle>
            </div>
            <div className="flex flex-row items-center mt-1">
              {props.maintainerUsernames.map((username, index) => (
                <a
                  href={`https://www.github.com/${username}`}
                  key={username}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500 focus:text-gray-500 transition-colors duration-200 text-gray-900"
                >
                  <span
                    key={username}
                    className="text-sm"
                  >
                    @{username}
                    {index < props.maintainerUsernames.length - 1 && ',\u00A0'}
                  </span>
                </a>
              ))}
            </div>
          </CardHeader>
          <CardDescription className="mt-2 text-gray-900 text-sm sm:text-base">
            {props.description}
          </CardDescription>
          <div
            className={`mt-4 flex flex-row flex-wrap items-center gap-3 border-t ${classes.cardBorder} pt-3`}
          >
            {props.tech.map((techname) => (
              <Badge
                key={techname}
                variant="outline"
                className={`flex items-center px-2 py-1.5 text-sm sm:text-sm ${classes.cardBg} border-white/40 backdrop-blur-sm  hover:bg-white/50 focus:bg-white/50 transition-all duration-200`}
              >
                <img
                  className="mr-2"
                  src={`/icons/${techname.toLowerCase()}.svg`}
                  alt={techname}
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                <span>{techname}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="ml-4 cursor-pointer rounded-full p-2 hover:bg-white/40 focus:bg-white/40 transition-colors duration-200">
          <ChevronRight
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;
