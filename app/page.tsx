// src/app/page.tsx
'use client';
import HallOfFame from './components/dashboard-components/hallOfFame';
import Leaderboard from './components/dashboard-components/leaderboard';
import './globals.css';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { ArrowRight, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Cloud from './components/dashboard-components/Cloud';
import Logtable from './components/dashboard-components/Logtable';
import SunGlareEffect from './components/dashboard-components/SunGlareEffect';
import { handleSignIn } from './lib/utils';
import { useAuthStore } from './store/useAuthStore';

const Dashboard = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'AUTH_SUCCESS'
      ) {
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col text-white">
      <SunGlareEffect />
      <Cloud />
      <div className="z-20 h-[80px] shrink-0">
        <Navbar />
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-[40%_minmax(0,1fr)] gap-8 items-start py-12 md:py-0 flex-grow">
        <div className="z-10 flex flex-col items-center md:items-start justify-center text-left py-0 md:py-12 md:h-[calc(100vh-80px)]">
          <h1 className="font-extrabold text-5xl tracking-tight sm:text-6xl md:text-5xl text-white">
            Amrita
          </h1>
          <h1 className="mb-4 md:mb-6 font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-yellow-300">
            Summer of Code
          </h1>
          <p className="mb-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-200 text-center md:text-left px-4 md:px-0">
            After a successful Winter of Code, the ACM student chapter is back
            with the <strong>Summer of Code</strong>. Collaborate, learn, build
            innovative projects and showcase your skills!
          </p>
          <div className="flex flex-row gap-4 sm:flex-row">
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="flex cursor-pointer transform items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium sm:px-8 sm:py-3 sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
                >
                  <Github size={22} />
                  Log in with GitHub
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="transform cursor-pointer rounded-lg bg-yellow-400 px-6 py-2 text-sm font-medium sm:px-8 sm:py-3 sm:font-semibold text-gray-900 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-amber-700"
                >
                  Register Now
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => router.push(`/profile/${user.github_username}`)}
                className="flex cursor-pointer transform items-center justify-between gap-2 rounded-3xl bg-gray-800 px-2 py-2 text-sm font-medium w-fit sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
              >
                <img
                  src={`https://github.com/${user.github_username}.png`}
                  alt={user.github_username}
                  className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                />
                <span className="font-semibold text-base">
                  Track My Progress
                </span>
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
        <div className="relative z-10 flex w-full flex-1 flex-col items-center py-8 md:py-4 md:h-[calc(100vh-80px)]">
          <Tabs
            defaultValue="leaderboard"
            className="w-full flex flex-col h-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/20 p-1 rounded-3xl backdrop-blur-sm mb-2 shrink-0">
              <TabsTrigger
                value="live-activity"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-800 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-3xl transition-all cursor-pointer"
              >
                Live Activity
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-800 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-3xl transition-all cursor-pointer"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="hall-of-fame"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-800 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-3xl transition-all cursor-pointer"
              >
                Hall of Fame
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="live-activity"
              className="flex-grow overflow-y-auto"
            >
              <Logtable />
            </TabsContent>
            <TabsContent
              value="leaderboard"
              className="flex-grow overflow-y-auto"
            >
              <Leaderboard user={user ? user : null} />
            </TabsContent>
            <TabsContent
              value="hall-of-fame"
              className="flex-grow overflow-y-auto"
            >
              <HallOfFame />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
