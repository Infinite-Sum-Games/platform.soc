'use client';
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import EditionCard from '../components/EditionCard';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';

const editions = [
  {
    title: 'Amrita Winter of Code 2024',
    description:
      'Amrita Winter of Code (AWOC), the first edition held from December 2024 to February 2025, ' +
      'sets a high benchmark. This event introduced a performance-based reward system ' +
      'where contributors earned monetary rewards based on bounty points, while maintainers ' +
      'saw real progress on their repositories.Every contributor was rewarded, and project maintainers saw meaningful progress on their repositories.' +
      'The event was fully open-source, publicly visible, and driven by students.',
    dateRange: 'Dec 2024 - Feb 2025',
    stats: "200+ Participants\n7000+ Bounties\n20+ Projects\n100+ PR's merged",
    link: 'https://woc-leaderboard.vercel.app',
    img1: '/edition1/pic1.png',
    img2: '/edition1/pic2.png',
    thumbnail: '/edition1/thumbnail.png',
    conclusion:
      'It brought together 283 participants and distributed over 7000 open-source bounties.' +
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

      <section className="mt-10 mx-auto space-y-10 px-4 w-9/12">
        {editions.map((edition) => (
          <EditionCard
            key={edition.title}
            {...edition}
            isExpanded={expandedIndex === edition.title}
            onToggle={() => toggle(edition.title)}
          />
        ))}
      </section>
    </div>
  );
};

export default pastEvents;
