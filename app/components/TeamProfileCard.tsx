import React from 'react';

interface CardProps {
  name: string;
  username: string;
  avatar: string;
  designation: string;
  tags: string[];
  onClick?: () => void;
}

export default function TeamProfileCard({
  name,
  username,
  avatar,
  tags,
  designation,
}: CardProps) {
  return (
    <div className="cursor-pointer group relative h-full w-full max-w-sm overflow-hidden rounded-3xl bg-white/40 border border-white/30 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/50">
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex items-center h-full md:p-2 p-5">
          <img
            className="rounded-full w-1/4 m-1"
            src={avatar}
            alt="github-avatar"
          />
          <div className="ml-1">
            <div className="font-bold">{name}</div>
            <div className="font-semibold">{tags.join(', ')}</div>
            <div>{designation}</div>
          </div>
        </div>
      </a>
    </div>
  );
}
