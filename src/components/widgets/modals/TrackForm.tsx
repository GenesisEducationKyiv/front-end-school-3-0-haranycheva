'use client';

import { buttonClass } from '@/style/classes/button';
import { inputFieldClass } from '@/style/classes/input-field';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useTrackFormSets } from '@/hooks/useTrackFormSets';
import { useGenres } from '@/hooks/queries/useGenres';
import { DefaultsProps, FormType } from '@/types';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import clsx from 'clsx';

type TrackFormProps = {
  type: FormType;
};

export default function TrackForm({
  type,
  defaults,
}: DefaultsProps<TrackFormProps>) {
  const { submit, register, handleSubmit, control, errors } = useTrackFormSets(
    type,
    defaults
  );

  const { data: genres = [], isLoading: loadingGenres } = useGenres();

  return (
    <>
      <h3 className="text-xl mb-4 sm:text-xl md:text-3xl lg:text-4xl font-bold text-blue-500 ">
        Make your own track
      </h3>
      <form
        data-testid="track-form"
        className="items-center flex flex-col sm:gap-4 gap-2 text-blue-500"
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Title of the track
          </label>
          <input
            data-testid="input-title"
            className={clsx(inputFieldClass, {
              'border-red-500 focus:outline-red-500': errors.title,
            })}
            placeholder="Enter title of the track"
            {...register('title')}
          />
          {errors.title && (
            <p data-testid="error-title" className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.title)}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Artist
          </label>
          <input
            data-testid="input-artist"
            className={clsx(inputFieldClass, {
              'border-red-500 focus:outline-red-500': errors.artist,
            })}
            placeholder="Enter artist that created it"
            {...register('artist')}
          />
          {errors.artist && (
            <p data-testid="error-artist" className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.artist)}
            </p>
          )}
        </div>

        {genres.length && (
          <div className="w-full">
            <label className="block sm:text-lg text-sm font-semibold">
              Genres
            </label>
            <Controller
              name="genres"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  data-testid="genre-selector"
                  name="genres"
                  options={genres}
                  className={`basic-multi-select w-full text-sm`}
                  classNamePrefix="select"
                  isLoading={loadingGenres}
                  data-loading={loadingGenres}
                  styles={{
                    menuList: (base) => ({
                      ...base,
                      maxHeight: '150px',
                    }),
                  }}
                />
              )}
            />
            {errors.genres && (
              <p
                data-testid="error-genre"
                className="text-red-500 text-sm mt-1"
              >
                {getErrorMessage(errors.genres)}
              </p>
            )}
          </div>
        )}
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Album
          </label>
          <input
            data-testid="input-album"
            className={clsx(inputFieldClass, {
              'border-red-500 focus:outline-red-500': errors.album,
            })}
            placeholder="What album your track belongs to?"
            {...register('album')}
          />
          {errors.album && (
            <p className="text-red-500 text-sm mt-1">
              {' '}
              {getErrorMessage(errors.album)}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Track cover
          </label>
          <input
            data-testid="input-cover-image"
            className={clsx(inputFieldClass, {
              'border-red-500 focus:outline-red-500': errors.coverImage,
            })}
            placeholder="Enter url for the cover of the track"
            {...register('coverImage')}
          />
          {errors.coverImage && (
            <p
              data-testid="error-cover-image"
              className="text-red-500 text-sm mt-1"
            >
              {getErrorMessage(errors.coverImage)}
            </p>
          )}
        </div>

        <button
          data-testid="submit-button"
          className={`${buttonClass} sm:w-[50%] w-[100%] text-xl`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
