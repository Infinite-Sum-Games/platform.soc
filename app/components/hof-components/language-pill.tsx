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
  'cpp-first': '/badges/hof-default.png',
  'cpp-second': '/badges/hof-default.png',
  'python-first': '/badges/hof-default.png',
  'python-second': '/badges/hof-default.png',
  'javascript-first': '/badges/hof-default.png',
  'javascript-second': '/badges/hof-default.png',
  'rust-first': '/badges/hof-default.png',
  'rust-second': '/badges/hof-default.png',
  'java-first': '/badges/hof-default.png',
  'java-second': '/badges/hof-default.png',
  'go-first': '/badges/hof-default.png',
  'go-second': '/badges/hof-default.png',
  'zig-first': '/badges/hof-default.png',
  'zig-second': '/badges/hof-default.png',
  'haskell-first': '/badges/hof-default.png',
  'haskell-second': '/badges/hof-default.png',
  'flutter-first': '/badges/hof-default.png',
  'flutter-second': '/badges/hof-default.png',
  'kotlin-first': '/badges/hof-default.png',
  'kotlin-second': '/badges/hof-default.png',
};

const getBadgeIcon = (language: string, position: 'first' | 'second') => {
  return (
    <Image
      src={'/badges/hof-default.png'}
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

  const renderLanguageIcon = () => {
    if (language === 'javascript') {
      return (
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
      );
    }
    if (language === 'cpp') {
      return (
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
      );
    }
    return (
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
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-white/25 backdrop-blur-2xl rounded-2xl p-3 border border-white/30 shadow hover:shadow-md transition-all duration-300">
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-20" />
      <BackgroundWaves
        width={400}
        height={200}
        id={language}
      />
      <div className="flex items-center justify-center gap-2 mb-4">
        {renderLanguageIcon()}
        <h3 className="text-lg font-semibold text-gray-900 capitalize">
          {getDisplayLang(language)}
        </h3>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Badge
          username={first_place.github_username}
          pullRequests={first_place.pull_request_merged}
          language={getDisplayLang(language)}
          position="first"
          icon={getBadgeIcon(language, 'first')}
        />
        <Badge
          username={second_place.github_username}
          pullRequests={second_place.pull_request_merged}
          language={getDisplayLang(language)}
          position="second"
          icon={getBadgeIcon(language, 'second')}
        />
      </div>
    </div>
  );
};

export default LanguagePill;
