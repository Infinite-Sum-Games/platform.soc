'use client';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { make_api_call } from '@/app/lib/api';
import { AuthState, type AuthUser } from '@/app/store/useAuthStore';
import useLeaderboardStore from '@/app/store/useLeaderboardStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'; // Import sorting icons
import { MdCode, MdMonetizationOn } from 'react-icons/md';
import { Card, CardDescription, CardHeader } from '../ui/card';

export type TUserData = {
  fullName: string;
  username: string;
  bounty: number;
  accountActive: boolean;
  _count: { Solution: string };
};

const Leaderboard = ({ user }: { user: AuthUser | null }) => {
  const router = useRouter();
  const { setUser } = useLeaderboardStore();
  const [leaderboardData, setLeaderboardData] = useState<TUserData[]>([]);
  const [sortCriteria, setSortCriteria] = useState<'PRs' | 'Bounty' | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  /* For Leader Board
  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const result = await make_api_call<{
  //         message: string;
  //         leaderboard: {
  //           github_username: string;
  //           bounty: string;
  //           pull_requests_merged: string;
  //         }[];
  //       }>({
  //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`,
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${user?.access_token}`, 
  //         },
  //       });

  //       const formattedData: TUserData[] = (result.data?.leaderboard ?? []).map((item) => ({
  //         fullName: "", 
  //         username: item.github_username,
  //         bounty: parseInt(item.bounty),
  //         accountActive: true, 
  //         _count: { Solution: item.pull_requests_merged },
  //       }));

  //       setLeaderboardData(formattedData);

  //       formattedData.forEach((userData, index) => {
  //         const rank = index + 1;
  //         setUser(
  //           userData.fullName,
  //           userData.username,
  //           rank,
  //           userData.bounty,
  //           userData.accountActive,
  //           userData._count
  //         );
  //       });
  //     } catch (error) {
  //       console.error("Failed to fetch leaderboard:", error);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, [setUser, user?.access_token]);

  */

  // For Registered Participants

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const result = await make_api_call<{
          message: string;
          profiles: {
            full_name: string | null;
            github_username: string;
            bounty: number;
            solutions: number;
          }[];
        }>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/registrations`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });

        const formattedData: TUserData[] = (result.data?.profiles ?? []).map(
          (profile) => ({
            fullName: profile.full_name || '',
            username: profile.github_username,
            bounty: profile.bounty,
            accountActive: true,
            _count: { Solution: profile.solutions.toString() },
          }),
        );

        setLeaderboardData(formattedData);

        formattedData.forEach((userData, index) => {
          const rank = index + 1;
          setUser(
            userData.fullName,
            userData.username,
            rank,
            userData.bounty,
            userData.accountActive,
            userData._count,
          );
        });
      } catch (error) {
        console.error('Failed to fetch registration leaderboard:', error);
      }
    };

    fetchRegistrations();
  }, [setUser, user?.access_token]);

  const sortLeaderboard = (criteria: 'PRs' | 'Bounty') => {
    let order = sortOrder;
    if (sortCriteria === criteria) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      order = 'desc';
    }
    setSortCriteria(criteria);
    setSortOrder(order);

    const sortedData = [...leaderboardData].sort((a, b) => {
      const aValue =
        criteria === 'PRs' ? Number.parseInt(a._count.Solution) : a.bounty;
      const bValue =
        criteria === 'PRs' ? Number.parseInt(b._count.Solution) : b.bounty;

      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setLeaderboardData(sortedData);
  };

  const getSortIcon = (criteria: 'PRs' | 'Bounty') => {
    if (sortCriteria === null && criteria === 'Bounty') {
      return (
        <div className="relative">
          <FaSort className="absolute top-0 left-0 opacity-30" />
          <FaSortDown />
        </div>
      );
    }
    if (sortCriteria !== criteria) {
      return <FaSort />;
    }
    return (
      <div className="relative">
        <FaSort className="absolute top-0 left-0 opacity-30" />
        {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
      </div>
    );
  };

  const handleUserClick = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <Card className="z-10 flex w-full max-h-full flex-col rounded-3xl border border-white/20 bg-white/35 p-4 backdrop-blur-md">
      <CardHeader className="pb-1 font-bold text-4xl text-gray-800">
        Leaderboard
      </CardHeader>
      <CardDescription className="pb-4 text-gray-600">
        Refresh the page to see real-time leaderboard updates.
      </CardDescription>

      <div className="flex items-center rounded-xl bg-white/20 px-3 py-2 font-medium text-gray-900 shadow-sm">
        <div className="flex-grow font-medium md:w-[50%] pl-2">Name</div>
        <div className="w-[25%] text-center hidden md:flex justify-center">
          <button
            type="button"
            onClick={() => sortLeaderboard('PRs')}
            className="flex items-center cursor-pointer justify-center gap-1 rounded-3xl bg-blue-500/50 px-3 py-1 font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-blue-500/70 hover:text-gray-800 hover:shadow-md"
          >
            <MdCode className="mr-1 text-gray-900" /> PRs
            {getSortIcon('PRs')}
          </button>
        </div>
        <div className="w-auto md:w-[25%] flex justify-end pr-1">
          <button
            type="button"
            onClick={() => sortLeaderboard('Bounty')}
            className="flex items-center cursor-pointer gap-1 rounded-3xl bg-amber-500/50 px-3 py-1 font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-amber-500/70 hover:text-gray-800 hover:shadow-md"
          >
            <MdMonetizationOn className="mr-1 text-gray-900" /> Bounty
            {getSortIcon('Bounty')}
          </button>
        </div>
      </div>

      <ScrollArea className="mt-2 min-h-0 grow overflow-y-auto">
        {leaderboardData.length === 0 ? (
          <div className="py-8 text-center text-white/60 text-xl">
            Loading Leaderboard...
          </div>
        ) : (
          leaderboardData.map((data, index) => (
            <button
              key={data.username}
              type="button"
              onClick={() => handleUserClick(data.username)}
              aria-label={`View profile of ${data.fullName || data.username}`}
              className={
                user?.email
                  ? `my-1 flex items-center rounded-xl bg-white/10 px-3 py-2 
                text-gray-800 backdrop-blur-md cursor-pointer transition-all duration-200 
                hover:bg-white/20 hover:shadow-md hover:scale-[0.98] active:scale-[0.98] 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                w-full text-left`
                  : `my-1 flex items-center rounded-xl bg-white/10 px-3 py-2 text-gray-800 
                backdrop-blur-md w-full text-left pointer-events-none`
              }
            >
              <div className="flex flex-grow items-center gap-3 md:w-[50%]">
                <div className="relative">
                  <img
                    src={`https://github.com/${data.username}.png`}
                    alt={`${data.username}'s avatar`}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white ring-1 ring-white/30">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{data.fullName}</div>
                  <div className="text-gray-600 text-sm">@{data.username}</div>
                </div>
              </div>
              <div className="w-[25%] text-center hidden md:block">
                {+data._count.Solution}
              </div>
              <div className="w-auto text-right md:w-[25%] pr-1 font-bold md:text-right">
                {data.bounty}
              </div>
            </button>
          ))
        )}
      </ScrollArea>
    </Card>
  );
};

export default Leaderboard;
