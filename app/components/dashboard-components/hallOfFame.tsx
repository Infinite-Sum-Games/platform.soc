'use client';
import LanguagePill from '@/app/components/hof-components/language-pill';
import { useTheme } from '@/app/components/theme-context';
import { Card, CardDescription, CardHeader } from '@/app/components/ui/card';
import { make_api_call } from '@/app/lib/api';
import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  github_username: string;
  pull_request_merged: string;
};

type Leaderboard = {
  [language: string]: {
    first_place: LeaderboardEntry;
    second_place: LeaderboardEntry;
  };
};

const HallOfFame = () => {
  const [leaderboards, setLeaderboards] = useState<Leaderboard>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await make_api_call<{
        leaderboards: Leaderboard;
      }>({ url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/hof`, method: 'GET' });

      if (response.success && response.data) {
        setLeaderboards(response.data.leaderboards);
      } else {
        setError(response.error || 'Failed to load leaderboard data.');
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const languagePopularityOrder = [
    'python',
    'javascript',
    'cpp',
    'java',
    'flutter',
    'go',
    'rust',
    'kotlin',
    'zig',
    'haskell',
  ];

  const languages = languagePopularityOrder.filter(
    (lang) => lang in leaderboards,
  );
  const { classes } = useTheme();
  return (
    <Card
      className={`z-10 w-full max-h-full flex flex-col rounded-3xl border ${classes.cardBorder} ${classes.cardBg} p-4 backdrop-blur-md`}
    >
      <CardHeader className={`pb-1 font-bold text-4xl ${classes.cardTitle}`}>
        Hall of Fame
      </CardHeader>
      <CardDescription className={`pb-4 ${classes.cardText}`}>
        Meet the top contributors for each language in this season!
      </CardDescription>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <LanguagePill
                key={lang}
                language={lang}
                leaderboard={leaderboards[lang]}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default HallOfFame;
