'use client';
import Image from 'next/image';
import { Card, CardDescription, CardHeader } from '../ui/card';

export interface ProjectCardProps {
  name: string;
  projectUrl: string;
  blurb: string;
  techstack: string[];
  maintainer: string[];
}

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <Card
      className="border bg-cover pb-4"
      style={{ backgroundImage: "url('cardBackground2.png')" }}
    >
      <div className="flex flex-col space-y-2">
        <CardHeader className="pb-1 font-semibold text-2xl text-[#ffffff] sm:text-3xl">
          <a
            href={props.projectUrl}
            className="flex"
          >
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={30}
              height={30}
              className="mr-4"
            />
            {props.name}
          </a>
        </CardHeader>

        {/* Commented out for "Coming soon" */}
        <div className="flex space-x-1 px-4">
          {props.techstack.map((tech) => (
            <div
              key={tech}
              className="rounded-lg py-1 pl-2 text-white text-xs"
            >
              <Image
                className="center"
                key={tech}
                src={`/icons/${tech.toLowerCase()}.svg`}
                alt={tech}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
        <CardDescription className="px-6 text-1xl text-gray-500">
          {' '}
          {props.blurb}
        </CardDescription>

        {/* <CardDescription className="text-1xl px-6 text-gray-300">
          Details coming soon 🎉
        </CardDescription> */}

        {
          <div className="flex flex-row items-center space-x-2 px-3 pt-4">
            <p className="px-3 text-base text-white">Maintainers : </p>
            {props.maintainer.map((maintainer) => (
              <a
                key={maintainer}
                href={`https://github.com/${maintainer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 inline-block"
              >
                <Image
                  src={`https://github.com/${maintainer}.png`}
                  alt={maintainer}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </a>
            ))}
          </div>
        }
      </div>
    </Card>
  );
};

export default ProjectCard;
