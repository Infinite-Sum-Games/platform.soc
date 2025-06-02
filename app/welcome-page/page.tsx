'use client';

import { CheckCircle, Cloud, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import { toast } from '../components/ui/use-toast';
import { handleSignIn } from '../lib/utils';

export const WelcomePage = () => {
  const router = useRouter();

  const handleGithubAuth = async () => {
    try {
      await handleSignIn();
      router.push('/');
    } catch (error) {
      console.error('Authentication failed:', error);
      toast({
        title: 'Authentication Failed',
        description: 'Please try signing in again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="container mx-auto min-h-screen flex justify-center items-start md:items-center pt-[100px] md:pb-6 px-4 box-border">
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl w-full">
            <div className="text-center space-y-8">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/30">
                    <CheckCircle
                      size={48}
                      className="text-green-400"
                    />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-green-400/10 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
                  Welcome to
                </h1>
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
                  Amrita
                </h1>
                <h1 className="mb-6 font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-yellow-300">
                  Summer of Code
                </h1>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleGithubAuth}
                  className="flex cursor-pointer transform items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-2 text-sm font-medium sm:px-8 sm:py-3 sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
                >
                  <Github size={24} />
                  Log in with GitHub
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle
                    size={24}
                    className="text-green-400"
                  />
                  <h2 className="text-xl font-semibold text-white">
                    Registration Successful!
                  </h2>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Your account has been created successfully. To complete your
                  setup and start participating in the
                  <strong className="text-yellow-300"> Summer of Code</strong>,
                  please sign in with your GitHub account.
                </p>
              </div>

              <p className="max-w-2xl mx-auto text-lg text-gray-200 sm:text-xl leading-relaxed">
                After a successful Winter of Code, the ACM student chapter is
                back with the{' '}
                <strong className="text-yellow-300">Summer of Code</strong>.
                Collaborate, learn, build innovative projects and showcase your
                skills!
              </p>

              <div className="pt-8 text-center">
                <p className="text-sm text-gray-100 max-w-lg mx-auto leading-relaxed">
                  By continuing with GitHub, you'll be able to track your
                  progress, participate in challenges, and collaborate with
                  other developers in the community.
                </p>
              </div>

              <div className="z-10 py-6 text-center">
                <p className="text-xs text-gray-900 font-medium">
                  Organized by ACM Student Chapter, Amrita Vishwa Vidyapeetham
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
