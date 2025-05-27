interface EditionCardProps {
  title: string;
  description: string;
  dateRange: string;
  stats: string;
  img1: string;
  img2: string;
  conclusion: string;
  onToggle: () => void;
  isExpanded: boolean;
  thumbnail: string;
}

export default function EditionCard({
  title,
  description,
  dateRange,
  stats,
  img1,
  img2,
  conclusion,
  thumbnail,
  onToggle,
  isExpanded,
}: EditionCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full shadow-xl text-white text-left transition duration-300">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3">
        <div className="flex-1">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-10/12 h-auto rounded-md shadow-md"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <p className="text-blue-50 mb-3">{dateRange}</p>
          <p className="text-blue-40 whitespace-pre-line mb-1">{stats}</p>
          <button
            type="button"
            onClick={onToggle}
            className="mt-6 px-6 py-2 bg-white text-blue-900 font-semibold rounded-full shadow hover:scale-105 transition mb-2"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-8 text-blue-10 text-left">
          <hr className="mb-4 border-white/20" />

          <h2 className="text-lg font-semibold mt-6 mb-2">About</h2>
          <p>{description}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Award Ceremony</h3>
          <p className="mb-3">{conclusion}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <img
              src={img1}
              alt="Closing ceremony  1"
              className="rounded-lg shadow-md w-full h-64"
            />
            <img
              src={img2}
              alt="Closing ceremony 2"
              className="rounded-lg shadow-md w-full h-64"
            />
          </div>
        </div>
      )}
    </div>
  );
}
