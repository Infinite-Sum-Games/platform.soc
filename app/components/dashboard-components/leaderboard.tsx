'use client';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import useLeaderboardStore from '@/app/store/useLeaderboardStore';
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

const Leaderboard = () => {
  const { setUser } = useLeaderboardStore();
  const [leaderboardData, setLeaderboardData] = useState<TUserData[]>([]);
  const [sortCriteria, setSortCriteria] = useState<'PRs' | 'Bounty' | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // useEffect(() => {
  //   const getLeaderboardData = async () => {
  //     try {
  //       const request = await fetch('/api/leaderboard', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (request.status !== 200) {
  //         console.log('Error fetching leaderboard data', request.status);
  //       }

  //       const data = await request.json();
  //       setLeaderboardData(data.leaderboard);

  //       data.leaderboard.forEach((userData: TUserData, index: number) => {
  //         const rank = index + 1;
  //         setUser(
  //           userData.fullName,
  //           userData.username,
  //           rank,
  //           userData.bounty,
  //           userData.accountActive,
  //           userData._count,
  //         );
  //       });
  //     } catch (error) {
  //       console.log('Error fetching leaderboard data', error);
  //     }
  //   };
  //   getLeaderboardData();
  // }, [setUser]);

  useEffect(() => {
    const mockData: TUserData[] = [
      {
        fullName: 'Alice Johnson',
        username: 'alicejohnson',
        bounty: 120,
        accountActive: true,
        _count: { Solution: '15' },
      },
      {
        fullName: 'Bob Smith',
        username: 'bobsmith',
        bounty: 85,
        accountActive: true,
        _count: { Solution: '20' },
      },
      {
        fullName: 'Charlie Brown',
        username: 'charliebrown',
        bounty: 60,
        accountActive: false,
        _count: { Solution: '10' },
      },
      {
        fullName: 'Daisy Ridley',
        username: 'daisyridley',
        bounty: 100,
        accountActive: true,
        _count: { Solution: '25' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt1',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt2',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
      {
        fullName: 'Ethan Hunt',
        username: 'ethanhunt3',
        bounty: 150,
        accountActive: true,
        _count: { Solution: '30' },
      },
    ];

    setLeaderboardData(mockData);

    mockData.forEach((userData, index) => {
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
  }, [setUser]);

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
            <div
              key={data.username}
              className="my-1 flex items-center rounded-xl bg-white/10 px-3 py-2 text-gray-800 backdrop-blur-md"
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
            </div>
          ))
        )}
      </ScrollArea>
    </Card>
  );
};

export default Leaderboard;
