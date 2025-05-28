import React from 'react';

interface Rule {
  label: string;
  description: string;
}

const rules: Rule[] = [
  {
    label: 'GitHub Account',
    description: 'Ensure you have a personal GitHub account.',
  },
  {
    label: 'Registration',
    description:
      'Fill out the registration form with valid credentials. These will be used to track your progress and give out rewards.',
  },
  {
    label: 'Descriptive Issues',
    description:
      'As participants, you can submit issues and bug-reports. Please do follow the guidelines setup by maintainers of the project.',
  },
  {
    label: 'Descriptive Commits',
    description:
      'Write clean and concise commit messages. Additionally, write detailed descriptions and titles in your pull requests.',
  },
  {
    label: 'Self-Assign Issues',
    description:
      'You are free to choose which issues to work upon. The official-bot of ASoC will assign the issue to you upon commenting `/assign` in the comments of the issue.',
  },
  {
    label: 'Fastest Pull-Request First',
    description:
      'As there can be multiple participants working on an issue at the same time, speed and quality of solution are of essence.',
  },
  {
    label: 'Usage of Cursor, Windsurf and AI-Tools',
    description:
      'The use of AI tools is permitted but complete reliance on AI-generated code that does not follow the conventions of the repository will lead to rejections.',
  },
  {
    label: 'Originality of Code',
    description:
      'Avoid using copyrighted code. Please be honest with yourself. If detected, this is punishable through penalties.',
  },
  {
    label: 'Code Reviews',
    description:
      'The final decision on rewarding a participant rests with the maintainers ONLY.',
  },
  {
    label: 'Issue Labelling',
    description:
      'Maintainers will label issues with `ASOC-ACCEPTED` tag to indicate their eligibility for the program. New issues introduced by the participants in the form of bugs (or) feature requests; can be worked upon only after approval from maintainers.',
  },
  {
    label: 'Contribution Guidelines',
    description:
      'Read the `CONTRIBUTION.md` file present in each project carefully before contributing to the project.',
  },
  {
    label: 'Misdemeanour and Spamming',
    description:
      'In order to curb spamming, we have introduced penalties. A maintainer is free to reward a penalty to a contributor in cases of spamming and misdemeanour which will lead to reduction of total bounty.',
  },
];

const Rules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-extrabold text-3xl mt-6 md:mt-0 sm:text-4xl md:text-5xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]">
            Rules for This Summer
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-base sm:text-lg text-white/70 drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)] px-4 sm:px-0">
            The official rulebook for Amrita's Summer of Code, 2025
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Maintainer Commands Section */}
          <div className="space-y-4">
            {/* Rewards & Penalties */}
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">
                    Charter for Amrita Summer of Code, 2025
                  </h2>
                  <p className="text-slate-600">
                    This competition is for
                    <span className="font-bold">
                      {' '}
                      Amrita Vishwa Vidyapeetham, Coimbatore{' '}
                    </span>
                    students only. Outside contributors are not eligible for the
                    bounty program.
                  </p>
                </div>
              </div>
              {/* Rule Set */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {rules.map((item, index) => (
                  <div
                    key={`${item.label}`}
                    className="backdrop-blur-sm bg-white/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-sm hover:shadow-2xl hover:bg-white/50 transition-all duration-300"
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {item.label}
                    </h2>
                    <p className="text-sm sm:text-md text-gray-700">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
