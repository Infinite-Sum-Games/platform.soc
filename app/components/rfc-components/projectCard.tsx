import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { ChevronRight, Github } from 'lucide-react';
import type React from 'react';

export interface ProjectCardProps {
  id: string;
  name: string;
  url: string;
  description: string;
  tech: string[];
  maintainerUsernames: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  url,
  description,
  tech,
  maintainerUsernames,
}) => {
  return (
    <Card
      className="bg-white/20 backdrop-blur-md border border-white/30 shadow-sm w-full transition-all duration-300 hover:bg-white/30 hover:shadow-lg"
      id={id}
    >
      <div className="flex h-full flex-row items-center justify-between p-4 sm:p-5">
        <div>
          <CardHeader className="p-0 pb-2 border-b border-white/30">
            <div className="flex flex-row items-center ">
              <CardTitle className="mb-0">
                <a
                  href={url}
                  className="text-xl sm:text-2xl font-bold flex flex-row items-center text-gray-800 hover:text-gray-600 focus:text-gray-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className="hidden md:block mr-3 h-5 w-5 flex-shrink-0"
                    color="#4B5563"
                    aria-hidden="true"
                  />
                  <span className="line-clamp-2 text-left">{name}</span>
                </a>
              </CardTitle>
            </div>
            <div className="flex flex-row items-center mt-1">
              {maintainerUsernames.map((username, index) => (
                <a
                  href={`https://www.github.com/${username}`}
                  key={username}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-500 focus:text-gray-500 transition-colors duration-200"
                >
                  <span
                    key={username}
                    className="text-sm"
                  >
                    @{username}
                    {index < maintainerUsernames.length - 1 && ',\u00A0'}
                  </span>
                </a>
              ))}
            </div>
          </CardHeader>
          <CardDescription className="mt-2 text-gray-700 text-sm sm:text-base">
            {description}
          </CardDescription>
          <div className="mt-4 flex flex-row flex-wrap items-center gap-3 border-t border-white/30 pt-3">
            {tech.map((techname) => (
              <Badge
                key={techname}
                variant="outline"
                className="flex items-center px-2 py-1.5 text-sm sm:text-sm bg-white/40 border-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/50 focus:bg-white/50 transition-all duration-200"
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

export default ProjectCard;
