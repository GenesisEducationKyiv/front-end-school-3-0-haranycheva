import { render, screen } from '@testing-library/react';
import TrackItem from '@/components/ui/trackCard/TrackItem';
import { Track } from '@/types';

// "@playwright/experimental-ct-react": "^1.53.1" не є сумісним із turbopack, тому в мені не
// вдалося налаштувати playwright для Playwright Component Testing

const testTrack: Track = {
  id: '1',
  title: 'Test Track',
  artist: 'Test Artist',
  genres: ['rock', 'pop'],
  createdAt: new Date(),
  updatedAt: new Date(),
  coverImage: '/no-image.jpg',
  audioFile: '',
};

describe('TrackItem', () => {
  const setIsPlaying = jest.fn();

  test('renders track item with title and artist', () => {
    render(
      <TrackItem track={testTrack} playing={null} setIsPlaying={setIsPlaying} />
    );
    expect(
      screen.getByTestId(`track-item-${testTrack.id}-title`)
    ).toHaveTextContent('Test Track');
    expect(
      screen.getByTestId(`track-item-${testTrack.id}-artist`)
    ).toHaveTextContent('Test Artist');
  });

  test('renders all genres', () => {
    render(
      <TrackItem track={testTrack} playing={null} setIsPlaying={setIsPlaying} />
    );
    testTrack.genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  test('renders fallback image when no coverImage is provided', () => {
    const trackWithNoCover = { ...testTrack, coverImage: '' };
    render(
      <TrackItem
        track={trackWithNoCover}
        playing={null}
        setIsPlaying={setIsPlaying}
      />
    );
    const img = screen.getByAltText('Track cover') as HTMLImageElement;
    expect(img.src).toContain('no-image.jpg');
  });

  test('does not render audio player and disables controls when audioFile is missing', () => {
    render(
      <TrackItem track={testTrack} playing={null} setIsPlaying={setIsPlaying} />
    );
    const audio = screen.queryByTestId(`audio-player-${testTrack.id}`);
    const playBtn = screen.getByTestId(`play-button-${testTrack.id}`);
    const pauseBtn = screen.queryByTestId(`pause-button-${testTrack.id}`);
    expect(audio).not.toBeInTheDocument();
    expect(playBtn).toBeDisabled();

    expect(pauseBtn).not.toBeInTheDocument();
  });

  test('renders buttons with correct data-testid including delete button', () => {
    render(
      <TrackItem track={testTrack} playing={null} setIsPlaying={setIsPlaying} />
    );
    expect(
      screen.getByTestId(`upload-track-${testTrack.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`delete-track-${testTrack.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`edit-track-${testTrack.id}`)
    ).toBeInTheDocument();
  });
});
