import { Track, TrackData } from '@/types';
import { summonToast } from '../summonToast';
import { Result } from 'neverthrow';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

type CreateTrackFn = UseMutateAsyncFunction<
  Track,
  unknown,
  TrackData,
  unknown
>;

export const createTrackWithToast = async (
  payload: TrackData,
  createTrack: CreateTrackFn
) => {
  await summonToast(() => createTrack(payload), [], {
    loading: 'Creating track...',
    success: 'Track created',
  });
};
