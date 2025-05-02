'use client';
import { Separator } from '@/app/components/ui/separator';
import Image from 'next/image';
import Leaderboard from './components/dashboard-components/leaderboard';
import Usercard from './components/dashboard-components/usercard';
import './globals.css';
import { useSession } from 'next-auth/react';
import Navbar from './components/Navbar';
import Home from './components/dashboard-components/Home';
import Snowfall from './components/dashboard-components/Snowfall';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="h-fit">
      <div className="mx-auto overflow-clip px-3 md:px-0">
        <div className="grid grid-cols-1 items-start justify-start gap-3 md:grid-cols-2">
          <div>
            <Navbar />

            {session?.user ? (
              <div className="w-full pt-20">
                <Usercard />
              </div>
            ) : (
              <Home />
            )}
          </div>

          <Separator className="md:hidden" />

          <div className="relative mt-[16px]">
            <Leaderboard />
          </div>
        </div>
      </div>
      <Image
        src="/snowbg.png"
        alt="Snow Floor"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="absolur -z-40 top-0 bottom-0 left-0 hidden object-contain md:block"
      />
      <Snowfall />
    </div>
  );
};

export default Dashboard;
