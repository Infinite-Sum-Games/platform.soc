'use client';
import { useTheme } from '@/app/components/theme-context'; // adjust path if needed

const DevPoolDocs = () => {
  const { theme, classes } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 mt-6 md:mt-2 md:p-6 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1
            className={`font-extrabold text-3xl md:text-4xl lg:text-5xl drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] ${classes.pageTitle}`}
          >
            DevPool Bot Commands
          </h1>
          <p
            className={`mx-auto mt-2 max-w-xl text-base md:text-lg drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)] ${classes.pageDesc}`}
          >
            Your guide to Winter of Code's bot commands
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 flex-1">
          {/* LEFT: Contributors Panel */}
          <div
            className={`${classes.cardBg} ${classes.cardBorder} backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 w-full md:w-2/5 flex flex-col`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="flex flex-row items-center gap-3 md:block">
                  <div className="flex-shrink-0 mb-0 md:mb-3 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h2
                      className={`text-2xl md:text-3xl font-bold mb-1 md:mb-2 ${classes.cardTitle}`}
                    >
                      Contributors
                    </h2>
                    <p className={`text-sm md:text-base ${classes.cardText}`}>
                      Commands for registered Winter of Code participants
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 flex-1">
                {/* /assign */}
                <div
                  className={`${classes.cardBg} backdrop-blur-sm rounded-2xl p-4 ${classes.cardBorder} transition-all duration-200 hover:${classes.cardBgHover}`}
                >
                  <code
                    className={`text-xl font-bold mb-2 block ${classes.cardTitle}`}
                  >
                    /assign
                  </code>
                  <p className={`${classes.cardText} leading-relaxed`}>
                    Claim an issue for yourself. You must be registered and the
                    issue must be program-approved.
                  </p>
                </div>

                {/* /unassign */}
                <div
                  className={`${classes.cardBg} backdrop-blur-sm rounded-2xl p-4 ${classes.cardBorder} transition-all duration-200 hover:${classes.cardBgHover}`}
                >
                  <code
                    className={`text-xl font-bold mb-2 block ${classes.cardTitle}`}
                  >
                    /unassign
                  </code>
                  <p className={`${classes.cardText} leading-relaxed`}>
                    Release an issue you're no longer working on. Same
                    requirements as assign.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-200/50">
                <p className={`text-sm ${classes.cardText}`}>
                  💡 <strong>Note:</strong> Both commands require program
                  registration and work only on approved issues.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Maintainer Commands (stacked) */}
          <div className="flex flex-col gap-4 w-full md:w-3/5">
            {/* Rewards & Penalties */}
            <div
              className={`${classes.cardBg} backdrop-blur-xl rounded-3xl p-4 md:p-6 ${classes.cardBorder} shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <div className="flex-shrink-0 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h2
                    className={`text-xl md:text-2xl font-bold ${classes.cardTitle}`}
                  >
                    Rewards & Penalties
                  </h2>
                  <p className={`text-sm md:text-base ${classes.cardText}`}>
                    Maintainer tools for managing contributor behavior
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {/* /bounty */}
                <div
                  className={`${classes.cardBg} backdrop-blur-sm rounded-xl p-4 ${classes.cardBorder} hover:${classes.cardBgHover}`}
                >
                  <code
                    className={`text-lg font-bold block mb-2 ${classes.cardTitle}`}
                  >
                    /bounty &lt;amount&gt; @username
                  </code>
                  <p className={`${classes.cardText} text-sm`}>
                    Reward registered contributors with bounty points
                  </p>
                </div>

                {/* /penalty */}
                <div
                  className={`${classes.cardBg} backdrop-blur-sm rounded-xl p-4 ${classes.cardBorder} hover:${classes.cardBgHover}`}
                >
                  <code
                    className={`text-lg font-bold block mb-2 ${classes.cardTitle}`}
                  >
                    /penalty &lt;amount&gt; @username
                  </code>
                  <p className={`${classes.cardText} text-sm`}>
                    Deduct points for misbehavior or rule violations
                  </p>
                </div>

                {/* /help */}
                <div
                  className={`${classes.cardBg} backdrop-blur-sm rounded-xl p-4 ${classes.cardBorder} hover:${classes.cardBgHover}`}
                >
                  <code
                    className={`text-lg font-bold block mb-2 ${classes.cardTitle}`}
                  >
                    /help @username
                  </code>
                  <p className={`${classes.cardText} text-sm`}>
                    Award +1 for helping others in issues or PRs.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements & Extensions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Achievements */}
              <div
                className={`col-span-1 lg:col-span-3 ${classes.cardBg} backdrop-blur-xl rounded-3xl p-4 md:p-6 ${classes.cardBorder} shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-xl md:text-2xl">🏆</span>
                  </div>
                  <div>
                    <h2
                      className={`text-lg md:text-xl font-bold ${classes.cardTitle}`}
                    >
                      Achievement Badges
                    </h2>
                    <p className={`text-sm ${classes.cardText}`}>
                      Mark special contributions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { cmd: '/bug', desc: 'Mark bug-report issues' },
                    { cmd: '/impact', desc: 'Flag high-impact PRs' },
                    { cmd: '/doc', desc: 'Mark documentation PRs' },
                    { cmd: '/test', desc: 'Mark testing PRs' },
                  ].map((b, i) => (
                    <div
                      // biome-ignore lint: lint/suspicious/noArrayIndexKey
                      key={i}
                      className={`${classes.cardBg} backdrop-blur-sm rounded-xl p-3 ${classes.cardBorder} hover:${classes.cardBgHover}`}
                    >
                      <code className={`font-bold ${classes.cardTitle}`}>
                        {b.cmd}
                      </code>
                      <p className={`${classes.cardText} text-sm mt-1`}>
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extensions */}
              <div
                className={`col-span-1 lg:col-span-2 ${classes.cardBg} backdrop-blur-xl rounded-3xl p-4 ${classes.cardBorder} shadow-xl`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-shrink-0 aspect-square w-8 bg-slate-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                    <span className="text-xl md:text-sm">⏰</span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${classes.cardTitle}`}>
                      Extensions
                    </h3>
                    <p className={`text-xs ${classes.cardText}`}>
                      Manual deadline adjustment
                    </p>
                  </div>
                </div>
                <code
                  className={`text-sm font-bold block mb-2 ${classes.cardTitle}`}
                >
                  /extend &lt;days&gt; @username
                </code>
                <p className={`${classes.cardText} text-xs`}>
                  Grant additional time through discussion channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevPoolDocs;
