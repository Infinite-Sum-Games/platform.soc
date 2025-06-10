'use client';

import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { File, FileText, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadmeViewerProps {
  owner: string;
  repoName: string;
  pdfLink?: string;
}

const ReadmeViewer = ({ owner, repoName, pdfLink }: ReadmeViewerProps) => {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pdfLink) {
      setReadmeContent('');
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchReadme() {
      setLoading(true);
      setError(null);
      try {
        // Try direct raw content first
        const rawResponse = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repoName}/main/README.md`,
        );

        if (rawResponse.ok) {
          const content = await rawResponse.text();
          setReadmeContent(content);
          setLoading(false);
          return;
        }

        // Fallback to GitHub API
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/readme`,
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
        if (!data.content) {
          throw new Error('No content found in README');
        }

        // Decode base64 content
        const content = atob(data.content.replace(/\s/g, ''));
        setReadmeContent(content);
      } catch (error) {
        setError(
          `Failed to load README: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, [owner, repoName, pdfLink]);

  if (pdfLink) {
    return (
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
            Project Details - {repoName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <File className="mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-800 text-center mb-4">
            Detailed project information is available in the PDF document.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
          >
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project PDF
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-sm h-full">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="mb-2 h-8 w-8 text-gray-600 animate-spin" />
          <p className="text-gray-600">Loading README...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-sm h-full">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-red-600 mb-4 font-semibold">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
          README - {repoName}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-800 prose-p:font-medium prose-strong:text-gray-900 prose-strong:font-bold prose-code:text-gray-700 prose-code:bg-gray-100/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold prose-pre:bg-gray-100/50 prose-pre:border prose-pre:border-gray-200/50 prose-pre:text-gray-700 prose-a:text-blue-600 prose-a:hover:text-blue-500 prose-a:font-semibold prose-li:text-gray-800 prose-li:font-medium prose-blockquote:text-gray-600 prose-blockquote:border-l-gray-400">
        {readmeContent ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {readmeContent}
          </ReactMarkdown>
        ) : (
          <div className="text-center text-gray-600">
            <FileText className="mx-auto mb-2 h-8 w-8 text-gray-600" />
            <p>No README content available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadmeViewer;
