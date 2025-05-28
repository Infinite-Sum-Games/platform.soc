interface EditionCardProps {
  title: string;
  description: string;
  dateRange: string;
  stats: string[];
  images: string[];
  conclusion: string;
  onToggle: () => void;
  isExpanded: boolean;
  thumbnail: string;
}

export default function EditionCard({
  title,
  description,
  dateRange,
  stats = [],
  images = [],
  conclusion,
  thumbnail,
  onToggle,
  isExpanded,
}: EditionCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full shadow-xl text-white text-left transition duration-300 mb-2">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="flex-1 items-center justify-center lg:p-4">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-fit h-auto rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl text-center md:text-2xl font-bold">
            {title}
          </h2>
          <p className="text-blue-50 mb-3 text-center italic">{dateRange}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {stats.map((stat) => (
              <span
                key={stat}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-white/40 text-gray-800 font-semibold
                     shadow-sm transition-all duration-200 ease-in-out
                     hover:scale-105 hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-md"
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={onToggle}
              className="mt-6 px-6 py-2 bg-white cursor-pointer text-blue-900 font-semibold rounded-full shadow hover:scale-105 transition mb-2"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-8 text-blue-10 text-left">
          <hr className="mb-4 border-white/50" />

          <h2 className="text-lg font-semibold mt-6 mb-2">About</h2>
          <p>{description}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Award Ceremony</h3>
          <p className="mb-3">{conclusion}</p>
          {images && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {images.map((image, index) => (
                <div
                  key={image}
                  className={`w-full flex items-center justify-center ${
                    index === images.length - 1 && images.length % 2 === 1
                      ? 'sm:col-span-2'
                      : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={'Award ceremony'}
                    className="rounded-lg shadow-md max-w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
