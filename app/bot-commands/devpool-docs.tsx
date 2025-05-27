import React from 'react';

const DevPoolDocs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br p-4 mt-6 md:mt-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]">
            DevPool Bot Commands
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-base md:text-lg text-white/70 drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]">
            Your guide to Summer of Code's bot commands
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Contributor Section - Large Left Panel */}
          <div className="col-span-1 md:col-span-4 bg-white/30 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/40 transition-all duration-300 hover:scale-[1.01]">
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="flex flex-row items-center gap-3 md:block">
                  <div className="flex-shrink-0 mb-0 md:mb-3 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-slate-800">
                      Contributors
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                      Commands for registered Summer of Code participants
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 flex-1">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/50 transition-all duration-200">
                  <code className="text-xl font-bold text-slate-800 mb-2 block">
                    /assign
                  </code>
                  <p className="text-slate-600 leading-relaxed">
                    Claim an issue for yourself. You must be registered and the
                    issue must be program-approved.
                  </p>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/50 transition-all duration-200">
                  <code className="text-xl font-bold text-slate-800 mb-2 block">
                    /unassign
                  </code>
                  <p className="text-slate-600 leading-relaxed">
                    Release an issue you're no longer working on. Same
                    requirements as assign.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-200/50">
                <p className="text-sm text-slate-700">
                  💡 <strong>Note:</strong> Both commands require program
                  registration and work only on approved issues.
                </p>
              </div>
            </div>
          </div>

          {/* Maintainer Commands Section */}
          <div className="col-span-1 md:col-span-8 space-y-4">
            {/* Rewards & Penalties */}
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/40 transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <div className="flex-shrink-0 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Rewards & Penalties
                  </h2>
                  <p className="text-sm md:text-base text-slate-600">
                    Maintainer tools for managing contributor behavior
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/50 transition-all duration-200">
                  <code className="text-lg font-bold block mb-2 text-slate-800">
                    /bounty &lt;amount&gt; @username
                  </code>
                  <p className="text-slate-600 text-sm">
                    Reward registered contributors with bounty points
                  </p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/50 transition-all duration-200">
                  <code className="text-lg font-bold block mb-2 text-slate-800">
                    /penalty &lt;amount&gt; @username
                  </code>
                  <p className="text-slate-600 text-sm">
                    Deduct points for misbehavior or rule violations
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Achievement Badges */}
              <div className="col-span-1 lg:col-span-3 bg-white/30 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/40 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 aspect-square w-12 bg-slate-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-xl md:text-2xl">🏆</span>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-800">
                      Achievement Badges
                    </h2>
                    <p className="text-sm text-slate-600">
                      Maintainers can mark special contributions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/50 transition-all duration-200">
                    <code className="font-bold text-indigo-700">/bug</code>
                    <p className="text-slate-600 text-sm mt-1">
                      Mark bug-report issues for bug-hunting badges
                    </p>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/50 transition-all duration-200">
                    <code className="font-bold text-indigo-700">/impact</code>
                    <p className="text-slate-600 text-sm mt-1">
                      Flag high-impact pull requests
                    </p>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/50 transition-all duration-200">
                    <code className="font-bold text-indigo-700">/doc</code>
                    <p className="text-slate-600 text-sm mt-1">
                      Mark documentation pull requests
                    </p>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/50 transition-all duration-200">
                    <code className="font-bold text-indigo-700">/test</code>
                    <p className="text-slate-600 text-sm mt-1">
                      Mark testing-related pull requests
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-indigo-500/10 backdrop-blur-sm rounded-xl border border-indigo-200/50">
                  <p className="text-sm text-slate-700">
                    🎯 Use these on issues or pull requests to help unlock
                    special achievement badges for contributors
                  </p>
                </div>
              </div>

              {/* Extensions */}
              <div className="col-span-1 lg:col-span-2 bg-white/30 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/40 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-shrink-0 aspect-square w-8 bg-slate-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                    <span className="text-xl md:text-sm">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Extensions
                    </h3>
                    <p className="text-slate-600 text-xs">
                      Manual deadline management
                    </p>
                  </div>
                </div>
                <code className="text-sm font-bold block mb-2 text-slate-800">
                  /extend &lt;days&gt; @username
                </code>
                <p className="text-slate-600 text-xs">
                  Grant extra days to contributors via discussion channels
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
