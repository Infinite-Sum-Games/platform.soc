'use client';
import Navbar from '@/app/components/Navbar';
import Card from '@/app/components/resources-components/resourceCard';
import { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';

type Resource = {
  title: string;
  imageSrc: string;
  description: string;
  tags: string[];
  buttonText: string;
  url?: string;
};

const ResourcePage = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('resourceCards/resources.json');

        if (!response.ok) {
          throw new Error(`Failed to fetch resources: ${response.status}`);
        }

        const data: Resource[] = await response.json();
        setResources(data);

        // Generate unique tags from all resources
        const tags = data.flatMap((resource: Resource) => resource.tags);
        const uniqueTags = [...new Set(tags)].sort();
        setAllTags(uniqueTags);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load resources',
        );
        console.error('Error loading resources:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Toggle a tag in the selectedLabels array
  const toggleTag = (tag: string) => {
    setSelectedLabels((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Clear all selected tags
  const clearFilters = () => {
    setSelectedLabels([]);
  };

  // Filtering Logic (same as before)
  const filteredResources =
    selectedLabels.length === 0
      ? resources
      : resources
          .map((resource) => {
            const matchingTagsCount = selectedLabels.filter((tag) =>
              resource.tags.includes(tag),
            ).length;
            return { resource, matchingTagsCount };
          })
          .filter(({ matchingTagsCount }) => matchingTagsCount > 0)
          .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
          .map(({ resource }) => resource);

  return (
    <div>
      <Navbar />
      <SunGlareEffect />
      <Cloud />

      {/* Header */}
      <section className="mt-30 px-4 text-center">
        <h1 className="font-extrabold text-4xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] md:text-5xl">
          Explore Developer Resources
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-white/70 drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]">
          Find tools, guides, and libraries to boost your development journey.
        </p>

        {/* Filter Chips */}
        <div className="relative mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedLabels.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex cursor-pointer items-center justify-center rounded-full px-3 py-1 font-medium text-sm shadow-sm transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-700 text-white hover:bg-slate-800'
                    : 'border border-gray-300 bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isSelected && <BsCheckLg className="mr-2 h-4 w-4" />}
                {tag}
              </button>
            );
          })}
          {selectedLabels.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-2 rounded-full bg-[#ffa4a4] px-2 py-1 font-medium text-[#360000] text-sm shadow-sm transition-all duration-200 hover:bg-[#ffa4a4]/80 flex items-center justify-center align-middle"
            >
              <FaTimes className="mr-1 h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Cards Section */}
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 pb-8 sm:px-6 md:px-8">
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-white">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-white">No resources match your selected tags.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-6 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 w-full ml-auto mr-auto mt-8">
            {filteredResources.map((card, index) => (
              <Card
                key={`${card.title}-${index}`}
                {...card}
                onClick={
                  card.url ? () => window.open(card.url, '_blank') : undefined
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ResourcePage;
