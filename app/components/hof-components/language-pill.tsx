import Image from 'next/image';
import BackgroundWaves from '../hof-components/background-waves';
import Badge from '../hof-components/badge';

interface LanguagePillProps {
  language: string;
  leaderboard: {
    first_place: { github_username: string; pull_request_merged: string };
    second_place: { github_username: string; pull_request_merged: string };
  };
}

const badgeIconsMapping: Record<string, string> = {
  'cpp-first': '/Badges/The Iron Sentinel.jpeg',
  'cpp-second': '/Badges/Pointer Warden.jpeg',
  'python-first': "/Badges/Mamba's Mentality.jpg",
  'python-second': '/Badges/Basilisk Defanged.jpg',
  'javascript-first': '/Badges/Forge Smelter.jpg',
  'javascript-second': '/Badges/Prop Driller.jpg',
  'rust-first': '/Badges/2 Piners.jpg',
  'rust-second': '/Badges/Crabby Coder.jpg',
  'java-first': '/Badges/The JVM Juggernaut.jpeg',
  'java-second': '/Badges/Bytecode Bender.jpeg',
  'go-first': '/Badges/Apex Gopher.jpg',
  'go-second': '',
  'zig-first': "/Badges/Salamander's Spirit.jpg",
  'zig-second': "/Badges/Salamander's Totem.jpg",
  'haskell-first': '/Badges/Monad Sage.jpg',
  'haskell-second': '/Badges/Lazy Architect.jpg',
  'flutter-first': '/Badges/Winged Architect.jpeg',
  'flutter-second': '/Badges/Pixel Whisperer.jpeg',
  'kotlin-first': '/Badges/Nullbane Mystic.jpeg',
  'kotlin-second': '/Badges/Coroutiner.jpeg',
};

const badgeDescriptionsMapping: Record<string, string> = {
  rust: 'Most Rust Pull Requests Merged',
  zig: 'Most Zig Pull Requests Merged',
  python: 'Most Python Pull Requests Merged',
  go: 'Most Go Pull Requests Merged',
  javascript: 'Most JS/TS Pull Requests Merged',
  cpp: 'Most C/C++ Pull Requests Merged',
  java: 'Most Java Pull Requests Merged',
  flutter: 'Most Flutter Pull Requests Merged',
  kotlin: 'Most Kotlin Pull Requests Merged',
  haskell: 'Most Haskell Pull Requests Merged',
};

const getBadgeIcon = (language: string, position: 'first' | 'second') => {
  const key = `${language}-${position}`;
  const src = badgeIconsMapping[key] || '/Badges/hof-default.png'; // fallback

  return (
    <Image
      src={src}
      alt={`${language} ${position} icon`}
      width={64}
      height={64}
      className="object-cover"
    />
  );
};

const getDisplayLang = (language: string): string => {
  if (language === 'cpp') return 'C/C++';
  if (language === 'javascript') return 'JS/TS';
  return language.charAt(0).toUpperCase() + language.slice(1);
};

const LanguagePill: React.FC<LanguagePillProps> = ({
  language,
  leaderboard,
}) => {
  const { first_place, second_place } = leaderboard;

  return (
    <div className="relative w-full max-w-md mx-auto bg-white/25 backdrop-blur-2xl rounded-2xl p-3 border border-white/30 shadow hover:shadow-md transition-all duration-300">
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-20" />
      <BackgroundWaves
        width={400}
        height={200}
        id={language}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {language === 'javascript' ? (
            <div className="flex gap-1">
              <Image
                src="/icons/javascript.svg"
                alt="JS"
                width={24}
                height={24}
              />
              <Image
                src="/icons/typescript.svg"
                alt="TS"
                width={24}
                height={24}
              />
            </div>
          ) : language === 'cpp' ? (
            <div className="flex gap-1">
              <Image
                src="/icons/c.svg"
                alt="C"
                width={24}
                height={24}
              />
              <Image
                src="/icons/c++.svg"
                alt="C++"
                width={24}
                height={24}
              />
            </div>
          ) : (
            <Image
              src={`/icons/${language.toLowerCase()}.svg`}
              alt={`${language} icon`}
              width={24}
              height={24}
              className="object-contain"
              onError={(e) => {
                e.currentTarget.src = '/icons/placeholder.svg';
              }}
            />
          )}
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {getDisplayLang(language)}
          </h3>
        </div>
        <p className="text-xs text-gray-700 -mt-2 mb-3 text-center">
          {badgeDescriptionsMapping[language.toLowerCase()] ||
            'Outstanding Contribution'}
        </p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Badge
          username={first_place.github_username}
          pullRequests={first_place.pull_request_merged}
          language={language}
          position="first"
          icon={getBadgeIcon(language, 'first')}
        />
        <Badge
          username={second_place.github_username}
          pullRequests={second_place.pull_request_merged}
          language={language}
          position="second"
          icon={getBadgeIcon(language, 'second')}
        />
      </div>
    </div>
  );
};

export default LanguagePill;
