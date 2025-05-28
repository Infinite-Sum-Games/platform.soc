import React from 'react';
import { MdArrowForward } from 'react-icons/md';

interface CardProps {
  title: string;
  imageSrc: string;
  description: string;
  tags: string[];
  buttonText: string;
  onClick?: () => void;
}

export default function Card({
  title,
  imageSrc,
  description,
  tags,
  buttonText,
  onClick,
}: CardProps) {
  // Helper function to infer the tag's category
  const getTagCategory = (
    tag: string,
  ): 'Technology' | 'Content Type' | 'Difficulty' => {
    const technologyTags = ['Rust', 'Go', 'Python', 'JavaScript', 'HTML'];
    const contentTypeTags = [
      'Video',
      'Documentation',
      'Tutorial',
      'Project',
      'CLI',
    ];
    const difficultyTags = ['Beginner', 'Advanced'];

    if (technologyTags.includes(tag)) return 'Technology';
    if (contentTypeTags.includes(tag)) return 'Content Type';
    if (difficultyTags.includes(tag)) return 'Difficulty';
    return 'Content Type'; // Default to Content Type for unrecognized tags
  };

  // Helper function to infer the resource's difficulty
  const getResourceDifficulty = (
    resourceTags: string[],
  ): 'Beginner' | 'Intermediate' | 'Advanced' => {
    if (resourceTags.includes('Beginner')) return 'Beginner';
    if (resourceTags.includes('Advanced')) return 'Advanced';
    return 'Intermediate'; // Default to Intermediate if no difficulty tag is present
  };

  // Helper function to determine tag background based on category
  const getTagStyles = (
    category: 'Technology' | 'Content Type' | 'Difficulty',
  ) => {
    switch (category) {
      case 'Technology':
        return {
          bg: 'bg-sky-100',
          hover: 'hover:bg-sky-200',
          text: 'text-sky-700',
        };
      case 'Content Type':
        return {
          bg: 'bg-purple-100',
          hover: 'hover:bg-purple-200',
          text: 'text-purple-700',
        };
      case 'Difficulty':
        return {
          bg: 'bg-emerald-100',
          hover: 'hover:bg-emerald-200',
          text: 'text-emerald-700',
        };
      default:
        return {
          bg: 'bg-slate-100',
          hover: 'hover:bg-slate-200',
          text: 'text-slate-700',
        };
    }
  };

  // Helper function to determine dot color based on difficulty
  const getDotColor = (
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  ) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Determine the resource's difficulty based on its tags
  const resourceDifficulty = getResourceDifficulty(tags);

  return (
    <div className="group relative h-full w-full max-w-sm overflow-hidden rounded-4xl bg-[#000000]/50 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-xl">
      <div className="flex h-full flex-col md:p-2 p-4">
        {/* Image with subtle gradient overlay */}
        <div className="relative mb-4 w-full overflow-hidden rounded-3xl">
          <img
            src={imageSrc}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/20 to-transparent" />
        </div>

        {/* Title */}
        <div className="mb-4 flex items-center justify-center">
          <h3 className="line-clamp-2 text-center font-bold text-2xl text-white">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="mb-4 flex-1">
          <p className="line-clamp-3 text-center text-gray-200 text-sm">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {tags.slice(0, 3).map((tag) => {
            const category = getTagCategory(tag);
            const { bg, hover, text } = getTagStyles(category);
            // Use the tag's own difficulty if it's a Difficulty tag, otherwise use the resource's difficulty
            const dotDifficulty =
              category === 'Difficulty'
                ? tag === 'Beginner'
                  ? 'Beginner'
                  : 'Advanced'
                : resourceDifficulty;
            const dotColor = getDotColor(dotDifficulty);
            return (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm shadow-sm ${bg} ${hover} ${text} transition-colors duration-200`}
              >
                <span className={`mr-1 h-3 w-3 rounded-full ${dotColor}`} />
                {tag}
              </span>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-300" />

        {/* Button */}
        <button
          type="button"
          onClick={onClick}
          className="group/button relative mt-4 flex w-full cursor-pointer items-center justify-center rounded-3xl bg-[#181818] px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#000000]/80 hover:shadow-md"
        >
          <span className="text-center">{buttonText}</span>
          <MdArrowForward
            size={24}
            className="absolute right-4 hidden transform transition-all duration-200 group-hover:translate-x-1 md:block group-hover:text-sky-400"
          />
        </button>
      </div>
    </div>
  );
}
