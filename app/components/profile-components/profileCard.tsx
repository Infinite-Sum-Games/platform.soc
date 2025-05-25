'use client';

import { useAuthStore } from '@/app/store/useAuthStore';
import { AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

export interface Profile {
  name: string;
  username: string;
  rank: number;
  allTimeRank: number;
  bounty: number;
  pendingIssues: number;
}

const Spinner = () => (
  <Loader2 className="animate-spin h-8 w-8 text-gray-600 mb-4" />
);

const LoadingCard = () => (
  <div className="w-full flex items-center justify-center min-h-[320px] py-12">
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl bg-[#101624] bg-opacity-90 shadow-2xl px-8 py-10 flex flex-col items-center border-2 border-blue-900/30">
        <Spinner />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Searching for your profile...
        </h2>
        <p className="text-base text-gray-600 text-center">
          Please wait for a while <span className="animate-pulse">😊</span>
        </p>
      </div>
    </div>
  </div>
);

const ErrorCard = () => (
  <div className="w-full flex items-center justify-center min-h-[320px] py-12">
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl bg-[#101624] bg-opacity-90 shadow-2xl px-8 py-10 flex flex-col items-center border-2 border-red-900/30">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Oops! Something went wrong.
        </h2>
        <p className="text-base text-gray-600 text-center">
          Please try again later <span className="animate-pulse">😊</span>
        </p>
      </div>
    </div>
  </div>
);

const BountyBar = ({
  value,
  max,
  width = 220,
  height = 18,
}: {
  value: number;
  max: number;
  width?: number;
  height?: number;
}) => {
  const percentage = (value / max) * 100;
  const milestones = [25, 50, 75, 100];

  return (
    <div className="w-full flex flex-col gap-1 items-center">
      <div
        className="flex justify-between mb-1 px-1 w-full"
        style={{ maxWidth: width }}
      >
        {milestones.map((milestone) => (
          <span
            key={milestone}
            className="text-[12px] text-gray-600 font-medium"
            style={{ minWidth: 32, textAlign: 'center' }}
          >
            {milestone}%
          </span>
        ))}
      </div>
      <div
        className="relative flex items-center"
        style={{ width }}
      >
        {/* Bar background */}
        <div className="absolute left-0 top-0 w-full h-full rounded-full bg-white/20 border border-white/30" />
        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-500"
          style={{ width: `${percentage}%`, zIndex: 1 }}
        />
        {/* Milestone markers */}
        {milestones.map(
          (milestone) =>
            milestone !== 100 && (
              <div
                key={milestone}
                className="absolute top-0 h-full w-0.5 bg-white/50"
                style={{ left: `calc(${milestone}% - 1px)`, zIndex: 2 }}
              />
            ),
        )}
        {/* Value inside filled part */}
        <span
          className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-800 z-10"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
        >
          {value}
        </span>
        {/* Spacer for bar height */}
        <div style={{ height, width }} />
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="relative md:w-full ml-auto mr-auto min-h-[60vh] bg-linear-to-br">
    <div className="absolute inset-0 bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    <div className="relative mx-auto max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl animate-pulse">
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300/30" />
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
              <div className="h-8 w-48 rounded bg-gray-300/30" />
              <div className="h-5 w-32 rounded bg-gray-300/20" />
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 w-full flex flex-col lg:flex-row gap-4 md:gap-8">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="bg-white/10 rounded-xl overflow-hidden shadow-lg divide-y divide-white/10">
                <div className="flex flex-wrap justify-between px-4 py-4 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center md:items-start gap-2"
                    >
                      <div className="h-7 w-16 rounded bg-gray-300/30" />
                      <div className="h-4 w-20 rounded bg-gray-300/20" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center px-4 py-4">
                  <div className="h-4 w-16 rounded bg-gray-300/20 mb-2" />
                  <div className="h-5 w-16 rounded-full bg-gray-300/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Skeleton */}
          <div className="w-full flex flex-col gap-4 md:gap-6 mt-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:flex-1 rounded-xl flex flex-col items-center">
                <div className="h-6 w-32 rounded bg-gray-300/20 mb-2" />
                <div className="h-[200px] w-full rounded-xl bg-gray-300/20" />
              </div>
              <div className="w-full md:flex-1 rounded-xl flex flex-col items-center">
                <div className="h-6 w-32 rounded bg-gray-300/20 mb-2" />
                <div className="h-[220px] w-full rounded-xl bg-gray-300/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileCard = () => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(!user);
  const [userData, setUserData] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.email.split('@')[0],
        username: user.github_username,
        rank: 1,
        allTimeRank: 1,
        bounty: user.bounty,
        pendingIssues: 0,
      });
      setLoading(false);
    }
  }, [user]);

  if (loading) return <ProfileSkeleton />;
  if (!userData) return <ErrorCard />;

  // Dummy analytics data (replace with real fetch if needed)
  const graphData = {
    prStats: {
      opened: 54,
      merged: 22,
      issuesSolved: 34,
    },
    contributionStats: {
      codeContribution: 0,
      testing: 0,
      bugFixes: 0,
      documentation: 0,
      features: 0,
      uiux: 0,
    },
  };
  const pieData = [
    { name: 'PRs Opened', value: graphData.prStats.opened, fill: '#f0b073' },
    { name: 'PRs Merged', value: graphData.prStats.merged, fill: '#eeea97' },
    {
      name: 'Issues Solved',
      value: graphData.prStats.issuesSolved,
      fill: '#9cd0e4',
    },
  ];
  const radarData = [
    {
      attribute: 'Code Contribution',
      value: graphData.contributionStats.codeContribution,
    },
    { attribute: 'Testing', value: graphData.contributionStats.testing },
    { attribute: 'Bugs Fixes', value: graphData.contributionStats.bugFixes },
    {
      attribute: 'Documentation',
      value: graphData.contributionStats.documentation,
    },
    { attribute: 'Features', value: graphData.contributionStats.features },
    { attribute: 'UI/UX', value: graphData.contributionStats.uiux },
  ];

  // Chart configurations for ChartContainer
  const pieChartConfig = {
    opened: { label: 'PRs Opened' },
    merged: { label: 'PRs Merged' },
    solved: { label: 'Issues Solved' },
  };
  const radarChartConfig = {
    code: { label: 'Code Contribution' },
  };

  return (
    <div className="relative w-full min-h-[60vh] bg-linear-to-br">
      {/* Background with subtle frosted glass effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Profile Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-2xl shadow-2xl border border-white/30">
          {/* Rank Badge */}
          <div className="absolute top-3 right-3 flex justify-center items-center">
            <div className="relative">
              <div className="badge-futuristic w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-slate-100 via-gray-300 to-slate-200 text-gray-900 shadow-xl ring-4 ring-white/10 flex items-center justify-center text-3xl sm:text-4xl font-bold">
                {userData.rank}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
                RANK
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              {/* Profile Info */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-white/20 p-1 bg-linear-to-br from-blue-500 to-purple-inker transition-all duration-300 group-hover:ring-blue-500/50">
                  <Image
                    src={`https://github.com/${userData.username}.png`}
                    alt={`${userData.username} profile`}
                    width={128}
                    height={128}
                    className="rounded-full transition-transform duration-300 group-hover:brightness-110"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-blue-500 to-purple-600 text-gray-800 text-xs font-bold px-4 py-1 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-blue-500/25 group-hover:shadow-xl">
                  Contributor
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h2 className="text-2xl sm:text-4xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {userData.name}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 font-light mt-1">
                  @{userData.username}
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 w-full flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Stats Container */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="bg-white/25 backdrop-blur-2xl rounded-xl overflow-hidden shadow-lg border border-white/30 divide-y divide-white/10">
                  {/* Stats Row */}
                  <div className="flex flex-wrap justify-between px-4 py-3 sm:px-6 sm:py-4 gap-3">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span
                          role="img"
                          aria-label="bounty"
                        >
                          💰
                        </span>
                        {userData.bounty}
                      </span>
                      <span className="text-xs text-gray-600 font-medium mt-1">
                        Bounty Points
                      </span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span
                          role="img"
                          aria-label="trophy"
                        >
                          🏆
                        </span>
                        {userData.allTimeRank}
                      </span>
                      <span className="text-xs text-gray-600 font-medium mt-1">
                        All Time Best Rank
                      </span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span
                          role="img"
                          aria-label="pending"
                        >
                          ⏳
                        </span>
                        {userData.pendingIssues}
                      </span>
                      <span className="text-xs text-gray-600 font-medium mt-1">
                        Pending Issues
                      </span>
                    </div>
                  </div>

                  {/* Bounty Progress */}
                  <div className="flex flex-col items-center justify-center px-4 py-3 sm:px-6 sm:py-4 w-full">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Bounty Progress
                    </h3>
                    <div className="w-full max-w-xs">
                      <BountyBar
                        value={userData.bounty}
                        max={1000}
                        width={220}
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="w-full flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Pie Chart */}
                    <div className="w-full sm:flex-1 bg-white/25 backdrop-blur-2xl rounded-xl border border-white/30 shadow-lg p-3 sm:p-4 overflow-hidden">
                      <h3 className="text-base font-semibold mb-2 text-center text-gray-800">
                        Contribution Chart
                      </h3>
                      <div className="h-[160px] sm:h-[180px] w-full max-w-full">
                        <ChartContainer
                          config={pieChartConfig}
                          className="h-full w-full"
                        >
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                          >
                            <PieChart>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                label={false}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {pieData.map((entry) => (
                          <div
                            key={entry.name}
                            className="flex items-center gap-1"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: entry.fill }}
                            />
                            <span className="text-xs text-gray-800 font-bold">
                              {entry.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="w-full sm:flex-1 bg-white/25 backdrop-blur-2xl rounded-xl border border-white/30 shadow-lg p-3 sm:p-4 overflow-hidden">
                      <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">
                        Issue Distribution
                      </h3>
                      <div className="h-[180px] sm:h-[200px] w-full max-w-full">
                        <ChartContainer
                          config={radarChartConfig}
                          className="h-full w-full"
                        >
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                          >
                            <RadarChart
                              outerRadius={60}
                              cy={90}
                              data={radarData}
                            >
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <PolarGrid stroke="#f28b30" />
                              <PolarAngleAxis
                                dataKey="attribute"
                                tick={{ fill: '#2e2e2e', fontSize: 10 }}
                                tickLine={false}
                              />
                              <Radar
                                name="Skills"
                                dataKey="value"
                                stroke="#22c55e"
                                fill="#4ade80"
                                fillOpacity={0.6}
                                dot={{ r: 2, fill: '#22c55e', fillOpacity: 1 }}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({
  text,
  time,
  highlight = false,
}: {
  text: string;
  time: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
      highlight
        ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
        : 'bg-white/5 hover:bg-white/10'
    }`}
  >
    <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-center gap-3 relative">
      <div
        className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125 ${
          highlight ? 'bg-blue-400' : 'bg-blue-200'
        }`}
      />
      <p className="text-gray-800 transition-colors duration-300 group-hover:text-gray-600">
        {text}
      </p>
    </div>
    <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 relative">
      {time}
    </span>
  </div>
);

// Recent Activity Section
export const RecentActivitySection = () => (
  <div className="w-full max-w-5xl mx-auto mt-10 bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Recent Activity
    </h3>
    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
      <ActivityItem
        text="Solved issue #423: Database optimization"
        time="2d ago"
      />
      <ActivityItem
        text="Submitted PR for bug fix on authentication service"
        time="5d ago"
      />
      <ActivityItem
        text="Reached Rank 2 on the leaderboard"
        time="1w ago"
        highlight
      />
    </div>
  </div>
);

export default ProfileCard;
