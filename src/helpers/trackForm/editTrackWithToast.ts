import { Track, TrackData } from '@/types';
import { summonToast } from '../summonToast';
import { Result } from 'neverthrow';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

type EditTrackFnParams = {
  id: string;
  payload: TrackData;
};

type EditTrackFn = UseMutateAsyncFunction<
  Track,
  unknown,
  EditTrackFnParams,
  unknown
>;

export const editTrackWithToast = async (
  id: string,
  payload: TrackData,
  editTrack: EditTrackFn
) => {
  await summonToast(() => editTrack({ id, payload }), [], {
    loading: 'Updating track...',
    success: 'Track updated',
  });
};
