'use client';
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import EditionCard from '../components/EditionCard';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';

const editions = [
  {
    title: 'Amrita Winter of Code, 2024',
    description:
      'Amrita Winter of Code (AMWOC), the inaugral edition held from December, 2024 to March, 2025, ' +
      'sets a high benchmark. This event introduced a performance-based reward system ' +
      'where contributors earned monetary rewards based on bounty points, while maintainers ' +
      'saw real progress on their repositories.Every contributor was rewarded, and project maintainers saw meaningful progress on their repositories. ' +
      'The event was fully open-source, publicly visible, and driven by students.',
    dateRange: 'Dec, 2024 - March, 2025',
    stats: [
      '7000 Bounties',
      '250+ Participants',
      '180 Issues Opened',
      '141 PRs Merged',
      '21 Projects',
      '10 Maintainers',
    ],
    link: 'https://woc-leaderboard.vercel.app',
    images: [
      '/edition1/1st_prize.JPG',
      '/edition1/2nd_prize.JPG',
      '/edition1/3rd_prize.JPG',
      '/edition1/question-discussion.JPG',
      '/edition1/group-photo.JPG',
    ],
    thumbnail: '/edition1/thumbnail.png',
    conclusion:
      'It brought together 283 participants and distributed over 7000 open-source bounties. ' +
      'This event promoted collaboration, helped students explore new technologies, and created opportunities for networking and skill development in a practical, open-source environment.',
  },
];

const pastEvents = () => {
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
  const toggle = (title: string) =>
    setExpandedIndex((prev) => (prev === title ? null : title));
  return (
    <div className="relative min-h-screen overflow-y-auto">
      <Navbar />
      <SunGlareEffect />
      <Cloud />

      <section className="mt-30 px-4 text-center">
        <h1 className="font-extrabold text-4xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl">
          Take a look back at our incredible journey!
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-white/70 drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]">
          Here's a glimpse of what we've achieved together in past editions-real
          stories, real innovations, and real impact.
        </p>
      </section>

      <section className="mt-8 space-y-10 p-4 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl px-4">
          {editions.map((edition) => (
            <EditionCard
              key={edition.title}
              {...edition}
              isExpanded={expandedIndex === edition.title}
              onToggle={() => toggle(edition.title)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default pastEvents;
