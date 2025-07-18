import { useRef, useState, useEffect } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import { PauseCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface AudioPlayerProps {
  id: string;
  src: string | undefined;
  isPlaying: boolean;
  setIsPlaying: (id: string | null) => void;
}

const AudioPlayer = ({
  id,
  src,
  isPlaying,
  setIsPlaying,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, id]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-md">
      {isPlaying ? (
        <button
          className={clsx({ 'cursor-pointer': src })}
          disabled={!src}
          onClick={togglePlay}
          data-testid={`pause-button-${id}`}
        >
          <PauseCircleIcon className="h-6 w-6 text-almond" />
        </button>
      ) : (
        <button
          className={clsx({ 'cursor-pointer': src })}
          disabled={!src}
          onClick={togglePlay}
          data-testid={`play-button-${id}`}
        >
          <PlayCircleIcon className="h-6 w-6 text-almond" />
        </button>
      )}
      <input
        type="range"
        min="0"
        max={duration}
        value={src ? currentTime : 0}
        onChange={handleSeek}
        step="0.1"
        disabled={!src}
        className="flex-grow accent-player"
        data-testid={`audio-progress-${id}`}
      />
      {src ? (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          data-testid={`audio-player-${id}`}
        />
      ) : null}
    </div>
  );
};

export default AudioPlayer;
