interface BackgroundWavesProps {
  width: number;
  height: number;
  id: string;
}

const BackgroundWaves = ({ width, height, id }: BackgroundWavesProps) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-labelledby={`ribbonTitle-${id}`}
    >
      <title id={`ribbonTitle-${id}`}>Dynamic wave background</title>
      <defs>
        <linearGradient
          id={`waveGradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="rgba(255,255,255,0.3)"
          />
          <stop
            offset="50%"
            stopColor="rgba(255,255,255,0.1)"
          />
          <stop
            offset="100%"
            stopColor="rgba(255,255,255,0.2)"
          />
        </linearGradient>
      </defs>
      {Array.from({ length: 4 }).map((_, i) => (
        <path
          key={`wave-${id}-${Math.random().toString(36).substr(2, 9)}`}
          d={`M 0 ${20 + i * (height / 4)} Q ${width / 4} ${
            15 + i * (height / 3)
          }, ${width / 2} ${25 + i * (height / 4)} T ${width} ${
            20 + i * (height / 3)
          }`}
          fill="none"
          stroke={`url(#waveGradient-${id})`}
          strokeWidth="2"
          opacity={0.6 - i * 0.1}
        />
      ))}
    </svg>
  );
};

export default BackgroundWaves;
