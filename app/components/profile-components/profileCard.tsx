'use client';
import {
  AlertCircle,
  Clock,
  GitPullRequest,
  Loader2,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

export interface ProfileResponse {
  message: string;
  github_username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  bounty: number;
  pull_request_count: number;
  pull_request_merged: number;
  pending_issue_count: number;
  rank: number;
  documentation_count: number;
  bug_report_count: number;
  feature_count: number;
  test_count: number;
  badges: string[];
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

const BountyProgress = ({ value, max }: { value?: number; max: number }) => {
  if (!value) {
    value = 0;
  }
  const percentage = Math.min((value / max) * 100, 100);

  const badges = [
    {
      id: 19,
      title: 'Shaman',
      icon: '/Badges/shaman 1.jpg',
      threshold: 250,
      position: 1,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 20,
      title: 'Henchman',
      icon: '/Badges/Henchman 1.jpg',
      threshold: 500,
      position: 2,
      color: 'from-slate-400 to-slate-600',
    },
    {
      id: 21,
      title: 'Kingpin',
      icon: '/Badges/King pin.jpg',
      threshold: 750,
      position: 3,
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      id: 22,
      title: 'The Godfather',
      icon: '/Badges/God Father 1.jpg',
      threshold: 1000,
      position: 4,
      color: 'from-blue-500 to-purple-600',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full">
        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-300/40 rounded-full transform -translate-y-1/2 mx-16" />
        <div
          className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 rounded-full transform -translate-y-1/2 transition-all duration-1000 ease-out shadow-lg"
          style={{
            width: `calc(${Math.min(percentage, 100)}% - 128px)`,
            marginLeft: '4rem',
          }}
        />
        <div className="relative flex justify-between items-center px-4 sm:px-8 lg:px-16">
          {badges.map((badge) => {
            const isUnlocked = value >= badge.threshold;

            return (
              <div
                key={badge.id}
                className="flex flex-col items-center group relative"
                style={{ flex: 1 }}
              >
                <div
                  className={`
                    relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-3 lg:border-4 transition-all duration-500 flex items-center justify-center overflow-hidden
                    ${
                      isUnlocked
                        ? 'border-orange-500 bg-gradient-to-br shadow-lg sm:shadow-xl shadow-orange-500/30'
                        : 'border-gray-400/50 bg-gray-200/20 shadow-md sm:shadow-lg'
                    }
                    hover:scale-110 transform-gpu cursor-pointer hover:shadow-xl sm:hover:shadow-2xl
                  `}
                  title={`${badge.title} - ${badge.threshold} points`}
                >
                  <div className="relative w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={badge.icon}
                      alt={badge.title}
                      className={`w-full h-full object-cover rounded-full transition-all duration-300 ${
                        isUnlocked
                          ? 'brightness-100 contrast-110'
                          : 'brightness-50 contrast-75 grayscale'
                      }`}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const parent = img.parentElement;
                        if (
                          parent &&
                          !parent.querySelector('.fallback-badge')
                        ) {
                          const fallback = document.createElement('div');
                          fallback.className = `fallback-badge w-full h-full flex items-center justify-center text-white font-bold text-sm sm:text-xl lg:text-2xl rounded-full bg-gradient-to-br ${
                            badge.color
                          } ${!isUnlocked ? 'grayscale brightness-50' : ''}`;
                          fallback.textContent = badge.position.toString();
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white/80"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <title>Lock icon</title>
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 sm:border-3 border-white flex items-center justify-center shadow-md sm:shadow-lg">
                      <svg
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <title>Checkmark icon</title>
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="mt-1.5 sm:mt-2 lg:mt-3 text-center h-8 sm:h-10 lg:h-12 flex flex-col justify-start">
                  {' '}
                  <div
                    className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                      isUnlocked ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    {badge.title}
                  </div>
                  <div
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isUnlocked ? 'text-orange-600' : 'text-gray-600'
                    } hidden sm:block`}
                  >
                    {badge.threshold} pts
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="text-lg font-bold">
          <span className="text-orange-600">{value.toLocaleString()}</span>
          <span className="text-gray-600 text-base">
            {' '}
            / {max.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-gray-700 mt-1">
          {percentage.toFixed(1)}% • Next:{' '}
          {badges.find((b) => value < b.threshold)?.title || 'Complete!'}
        </div>
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

const hasValidData = (data: { value: number }[]): boolean => {
  return data.some((item) => item.value > 0);
};

interface ProfileProps {
  profile: ProfileResponse | null;
  loading: boolean;
}

const ProfileCard = ({ profile, loading }: ProfileProps) => {
  if (loading) return <ProfileSkeleton />;
  if (!profile) return <ErrorCard />;
  // Dummy analytics data (replace with real fetch if needed)
  const graphData = {
    prStats: {
      opened: profile.pull_request_count,
      merged: profile.pull_request_merged,
    },
    issueStats: {
      docs: profile.documentation_count,
      bugs: profile.bug_report_count,
      features: profile.feature_count,
      highImpact: profile.test_count,
    },
  };
  const radialData = [
    { name: 'PRs Open', value: graphData.prStats.opened, fill: '#10b981' },
    { name: 'PRs Merged', value: graphData.prStats.merged, fill: '#065f46' },
  ];

  const radarData = [
    { attribute: 'Tests Contributed', value: graphData.issueStats.highImpact },
    { attribute: 'Bugs Reported', value: graphData.issueStats.bugs },
    { attribute: 'Docs Contributed', value: graphData.issueStats.docs },
    { attribute: 'Features Suggested', value: graphData.issueStats.features },
  ];
  // Chart configurations for ChartContainer

  const radialChartConfig = {
    opened: { label: 'PRs Opened' },
    closed: { label: 'PRs Closed' },
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
                {profile.rank !== -1 ? profile.rank : '-'}
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
                    src={`https://github.com/${profile.github_username}.png`}
                    alt={`${profile.github_username} profile`}
                    width={128}
                    height={128}
                    className="rounded-full transition-transform duration-300 group-hover:brightness-110"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-blue-500 to-purple-600 text-gray-800 text-xs font-bold px-4 py-1 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-blue-500/25 group-hover:shadow-xl">
                  Contributor
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent leading-tight">
                  {[profile.first_name, profile.middle_name, profile.last_name]
                    .filter(Boolean)
                    .join(' ')}
                </h2>

                <div className="text-lg sm:text-xl text-gray-800 font-medium">
                  @{profile.github_username}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 w-full flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Stats Container */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="bg-white/25 backdrop-blur-2xl rounded-xl overflow-hidden shadow-lg border border-white/30 divide-y divide-white/10">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 px-3 py-3 sm:flex sm:flex-wrap sm:justify-between sm:px-6 sm:py-4 sm:gap-6">
                    {/* Bounty Points */}
                    <div className="flex flex-col items-center">
                      <span className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        <span className="text-base sm:text-xl lg:text-2xl">
                          {profile.bounty}
                        </span>
                      </span>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 sm:mt-1 text-center leading-tight">
                        Bounty Points
                      </span>
                    </div>

                    {/* PRs */}
                    <div className="flex flex-col items-center">
                      <span className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                        <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="text-base sm:text-xl lg:text-2xl">
                          {profile.pull_request_count}
                        </span>
                      </span>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 sm:mt-1 text-center leading-tight">
                        PRs
                      </span>
                    </div>

                    {/* Pending Issues */}
                    <div className="flex flex-col items-center">
                      <span className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        <span className="text-base sm:text-xl lg:text-2xl">
                          {profile.pending_issue_count}
                        </span>
                      </span>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 sm:mt-1 text-center leading-tight">
                        Pending Issues
                      </span>
                    </div>
                  </div>

                  {/*Bounty Progress*/}
                  <div className="flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 w-full">
                    <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl">
                      <BountyProgress
                        value={profile.bounty}
                        max={1000}
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
                      {hasValidData(radialData) ? (
                        <>
                          <div className="h-[160px] sm:h-[180px] w-full max-w-full">
                            <ChartContainer
                              config={radialChartConfig}
                              className="h-full w-full"
                            >
                              <ResponsiveContainer
                                width="100%"
                                height="100%"
                              >
                                <PieChart>
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                  />
                                  <Pie
                                    data={radialData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="65%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    label={false}
                                  >
                                    {radialData.map((entry, index) => (
                                      <Cell
                                        key={entry.name || entry.fill}
                                        fill={entry.fill}
                                      />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                          <div className="flex justify-center gap-4 mt-2">
                            {radialData.map((entry) => (
                              <div
                                key={entry.name}
                                className="flex items-center gap-1"
                              >
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: entry.fill }}
                                />
                                <span className="text-md text-gray-800 font-bold">
                                  {entry.name}: {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        // Empty state for pie chart
                        <div className="h-[160px] sm:h-[180px] w-full flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center mb-3">
                            <GitPullRequest className="w-6 h-6 text-gray-500" />
                          </div>
                          <p className="text-gray-600 text-sm font-medium">
                            No contributions yet
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Start contributing to see your chart!
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Radar Chart */}
                    <div className="w-full sm:flex-1 bg-white/25 backdrop-blur-2xl rounded-xl border border-white/30 shadow-lg p-3 sm:p-4 overflow-hidden">
                      <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">
                        Issue Distribution
                      </h3>
                      {hasValidData(radarData) ? (
                        <div className="h-[225px] sm:h-[250px] w-full max-w-full">
                          <ChartContainer
                            title="Contribution Activity"
                            config={radarChartConfig}
                          >
                            <ResponsiveContainer
                              width="100%"
                              height={240}
                            >
                              <RadarChart
                                outerRadius="75%"
                                data={radarData}
                              >
                                <PolarAngleAxis
                                  dataKey="attribute"
                                  tick={({
                                    payload,
                                    x,
                                    y,
                                    textAnchor,
                                    index,
                                  }) => {
                                    const shouldSplit =
                                      payload.value === 'Features Suggested' ||
                                      payload.value === 'Bugs Reported';
                                    const lines = shouldSplit
                                      ? payload.value.split(' ')
                                      : [payload.value];
                                    let adjustedY = y;
                                    if (payload.value === 'Tests Contributed')
                                      adjustedY = y - 10; // push upward
                                    if (payload.value === 'Docs Contributed')
                                      adjustedY = y + 10; // push downward
                                    return (
                                      <text
                                        x={x}
                                        y={adjustedY}
                                        textAnchor={textAnchor}
                                        fill="#fff"
                                        fontSize={16}
                                        fontWeight={700}
                                      >
                                        {lines.map(
                                          (line: string, i: number) => (
                                            <tspan
                                              x={x}
                                              dy={i === 0 ? 0 : 18}
                                              key={line}
                                            >
                                              {line}
                                            </tspan>
                                          ),
                                        )}
                                      </text>
                                    );
                                  }}
                                />
                                <PolarRadiusAxis
                                  tick={false}
                                  axisLine={false}
                                  domain={[0, 'dataMax']}
                                  scale="linear"
                                />
                                <g>
                                  <line
                                    x1="50%"
                                    y1="15%"
                                    x2="50%"
                                    y2="85%"
                                    stroke="#065f46"
                                    strokeWidth="2"
                                  />
                                  <line
                                    x1="30%"
                                    y1="50%"
                                    x2="70%"
                                    y2="50%"
                                    stroke="#065f46"
                                    strokeWidth="2"
                                  />
                                </g>
                                <Radar
                                  name="Activity"
                                  dataKey="value"
                                  stroke="#059669"
                                  fill="#6ee7b7"
                                  fillOpacity={0.55}
                                  dot={{
                                    r: 4,
                                    stroke: '#10b981',
                                    fill: '#ecfdf5',
                                    strokeWidth: 2,
                                  }}
                                />
                                <ChartTooltip
                                  content={
                                    <ChartTooltipContent title="Contribution Activity" />
                                  }
                                  cursor={false}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      ) : (
                        // Empty state for radar chart
                        <div className="h-[180px] sm:h-[200px] w-full flex flex-col items-center justify-center">
                          <div className="relative">
                            {/* Radar-like empty state icon */}
                            <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-400 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                              </div>
                              {/* Radar lines */}
                              <div className="absolute inset-0">
                                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 transform -translate-x-1/2" />
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 transform -translate-y-1/2" />
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm font-medium mt-3">
                            No activity data
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Complete tasks to see your profile scan!
                          </p>
                        </div>
                      )}
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
