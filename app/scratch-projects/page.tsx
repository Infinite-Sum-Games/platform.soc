'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';

export default function Home() {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReadme() {
      try {
        const repoOwner = 'Infinite-Sum-Games';
        const repoName = 'platform.soc';

        console.log('Fetching README...');

        // Try direct raw content first
        const rawResponse = await fetch(
          `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/README.md`,
        );

        if (rawResponse.ok) {
          const content = await rawResponse.text();
          console.log('Raw README Content:', content);
          setReadmeContent(content);
          setLoading(false);
          return;
        }

        console.log('Raw fetch failed, trying GitHub API...');

        // Fallback to GitHub API
        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/readme`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('GitHub API Response:', data);

        if (!data.content) {
          throw new Error('No content found in README');
        }

        // Decode base64 content
        const content = atob(data.content.replace(/\s/g, ''));
        console.log('Decoded README Content:', content);
        setReadmeContent(content);
      } catch (error) {
        console.error('Error fetching README:', error);
        setError(`Failed to load README: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, []);

  if (loading) {
    return (
      <>
        <SunGlareEffect />
        <Cloud />
        <Navbar />
        <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden mt-4">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-white/30 border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-4" />
                <p className="text-lg text-gray-800 font-semibold">
                  Loading README...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SunGlareEffect />
        <Cloud />
        <Navbar />
        <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden mt-4">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-white/30 border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <p className="text-red-600 mb-4 font-semibold">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 border border-gray-300/50 shadow-md"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden mt-4">
        <div className="max-w-4xl mx-auto">
          {readmeContent ? (
            <div className="backdrop-blur-md bg-white/30 border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-800 prose-p:font-medium prose-strong:text-gray-900 prose-strong:font-bold prose-code:text-gray-700 prose-code:bg-gray-100/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold prose-pre:bg-gray-100/50 prose-pre:border prose-pre:border-gray-200/50 prose-pre:text-gray-700 prose-a:text-blue-600 prose-a:hover:text-blue-500 prose-a:font-semibold prose-li:text-gray-800 prose-li:font-medium prose-blockquote:text-gray-600 prose-blockquote:border-l-gray-400">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readmeContent}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="backdrop-blur-md bg-white/30 border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <p className="text-gray-800 font-medium">
                  No README content available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
