'use client';
import Card from '@/app/components/TeamProfileCard';
import { useTheme } from '@/app/components/theme-context';
import { randomise } from '@/app/lib/utils';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type TeamMember = {
  name: string;
  username: string;
  avatar: string;
  tags: string[];
  designation: string;
};

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/team.json');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status ${response.status}`);
        }

        const data = await response.json();
        const teamData: TeamMember[] = data.team;
        setTeamMembers(teamData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load team');
        console.error('Error loading team:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, []);

  const { theme, classes } = useTheme();
  const maintainers = useMemo(
    () =>
      randomise(
        teamMembers.filter((member) => member.tags.includes('Maintainer')),
      ),
    [teamMembers],
  );
  const wocTeam = teamMembers.filter((member) =>
    member.tags.some((tag) => tag !== 'Maintainer'),
  );

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 pb-10 pt-10 sm:px-6 md:px-8">
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center gap-2">
            <Loader2 className="animate-spin w-5 h-5 text-white" />
            <p className="text-white">Fetching team...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-white">No team members found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            <div className="text-center">
              <h2
                className={`font-extrabold text-4xl ${classes.pageTitle} drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl`}
              >
                Maintainers
              </h2>
              <p
                className={`mx-auto mt-2 max-w-3xl text-lg ${classes.pageDesc} drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]`}
              >
                Guiding projects forward and ensuring contributions meet high
                standards.
              </p>
              <div className="grid grid-cols-1 justify-items-center gap-3 md:gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 w-full ml-auto mr-auto mt-8">
                {maintainers.map((card, index: number) => (
                  <Card
                    key={`${card.name}-${index}`}
                    {...card}
                    tags={['Maintainer']}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2
                className={`font-extrabold text-4xl ${classes.pageTitle} drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl`}
              >
                The WoC Team
              </h2>
              <p
                className={`mx-auto mt-2 max-w-3xl text-lg ${classes.pageDesc} drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]`}
              >
                Meet the people behind WoC, bringing it to life through
                thoughtful work and collaboration.
              </p>
              <div className="grid grid-cols-1 justify-items-center gap-3 md:gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 w-full ml-auto mr-auto mt-8">
                {wocTeam.map((card, index: number) => (
                  <Card
                    key={`${card.name}-${index}`}
                    {...card}
                    tags={card.tags.filter((tag) => tag !== 'Maintainer')}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
