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
import { make_api_call } from '@/app/lib/api';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Logtable from './components/dashboard-components/Logtable';
import { useTheme } from './components/theme-context';
import { useAuthStore } from './store/useAuthStore';

const Dashboard = () => {
  const router = useRouter();
  const theme = process.env.NEXT_PUBLIC_THEME;
  const { classes } = useTheme();

  const user = useAuthStore((state) => state.user);
  const handleOAuth = async () => {
    // Get the latest state directly
    const currentUser = useAuthStore.getState().user;

    // If no user or no token, redirect to login
    if (!currentUser || !currentUser.accessToken) {
      console.error('No access token found. User might not be logged in.');
      toast.error('You must be logged in first.');
      router.push('/login');
      return;
    }

    try {
      const { success, data, error } = await make_api_call<{ url?: string }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/github`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!success) {
        throw new Error(error || 'Failed to initiate GitHub login');
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No URL returned from backend');
      }
    } catch (error) {
      console.error('OAuth Error:', error);
      toast.error('Failed to connect with GitHub. Please try again.');
    }
  };

  return (
    <div className="relative flex w-full flex-col text-white">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-[40%_minmax(0,1fr)] gap-8 items-start py-12 md:py-0 flex-grow">
        <div className="z-10 flex flex-col items-center md:items-start justify-center text-left py-0 md:py-12 md:h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-0.5 mb-4">
            <p className="text-xs sm:text-sm text-white font-medium">
              Brought to you by
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/amrita-logo.svg"
                alt="Amrita Logo"
                width={100}
                height={0}
                className="h-auto max-w-[100px] object-contain"
              />
              <Image
                src="/acm-logo.webp"
                alt="ACM Logo"
                width={60}
                height={0}
                className="h-auto max-w-[60px] object-contain"
              />
              <Image
                src="/anokha-logo.png"
                alt="Anokha Logo"
                width={120}
                height={0}
                className="h-auto max-w-[120px] object-contain"
              />
            </div>
          </div>

          <h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl md:text-5xl text-white">
            Amrita
          </h1>
          <h1 className="mb-4 md:mb-6 font-extrabold text-4xl sm:text-5xl md:text-5xl tracking-tight text-blue-400">
            Winter of Code 2.0
          </h1>
          <p className="mb-6 max-w-2xl text-base text-md md:text-lg text-gray-100 text-center md:text-left px-4 md:px-0">
            After a successful Winter of Code last year, the ACM student chapter
            is back with the{' '}
            <strong className="text-blue-400">Winter of Code 2.0</strong>.
            Collaborate, learn, build innovative projects and showcase your
            skills!
          </p>
          <div className="flex flex-col gap-4 w-full sm:w-auto md:w-1/2 items-center md:items-start">
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="w-full transform cursor-pointer rounded-lg bg-blue-400 py-2 text-md font-medium sm:py-3 sm:font-semibold text-gray-900 shadow-lg transition duration-300 ease-in-out hover:scale-102 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-800"
                >
                  Login Now
                </button>
              </>
            ) : (
              <>
                {/* show only if githubUsername is empty */}
                {!user.githubUsername ? (
                  <button
                    type="button"
                    onClick={handleOAuth}
                    className="w-full flex cursor-pointer transform items-center justify-center gap-2 rounded-lg bg-gray-800 py-2 text-md font-medium sm:py-3 sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-102 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="mr-2 h-6 w-6"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                    Link with GitHub
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/profile/${user.githubUsername}`)
                    }
                    className="w-fit flex cursor-pointer transform items-center justify-start gap-3 rounded-3xl bg-gray-800 px-3 py-2 text-sm font-medium sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-102 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 focus:ring-offset-slate-900 sm:gap-3"
                  >
                    <img
                      src={`https://github.com/${user.githubUsername}.png`}
                      alt={user.githubUsername}
                      className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                    />
                    <span className="font-semibold text-lg lg:text-base whitespace-nowrap">
                      Track My Progress
                    </span>
                    <ArrowRight size={24} />
                  </button>
                )}
              </>
            )}
          </div>

          <a
            href="https://github.com/Infinite-Sum-Games"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-medium text-gray-100 transition hover:opacity-100 hover:underline underline-offset-2"
          >
            <span>Co-developed with </span>
            <Image
              src="/isg-logo.jpg"
              alt="Infinite Sum Games"
              width={18}
              height={18}
              className="rounded-sm object-contain"
            />
            <span className=" font-medium">Infinite Sum Games</span>
          </a>
        </div>
        <div className="relative z-10 flex w-full flex-1 flex-col items-center py-8 md:py-4 md:h-[calc(100vh-80px)]">
          <Tabs
            defaultValue="leaderboard"
            className="w-full flex flex-col h-full"
          >
            <TabsList
              className={`grid w-full grid-cols-3 p-1 rounded-3xl backdrop-blur-sm mb-2 shrink-0 ${classes.cardBg}`}
            >
              <TabsTrigger
                value="live-activity"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white rounded-3xl transition-all cursor-pointer"
              >
                Live Activity
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white rounded-3xl transition-all cursor-pointer"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="hall-of-fame"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white rounded-3xl transition-all cursor-pointer"
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
