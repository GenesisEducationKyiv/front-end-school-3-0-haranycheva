'use client';

import { buttonClass } from '@/style/classes/button';
import { inputFieldClass } from '@/style/classes/input-field';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useTrackFormSets } from '@/hooks/useTrackFormSets';
import { useGenres } from '@/hooks/useGenres';

export default function TrackForm({ type, defaults }) {
  const { submit, register, handleSubmit, control, errors } = useTrackFormSets(
    type,
    defaults
  );

  const [genres, loadingGenres] = useGenres()

  return (
    <>
      <h3 className="text-xl mb-4 sm:text-xl md:text-3xl lg:text-4xl font-bold text-blue-500 ">
        Mekr your own track
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
            className={`${inputFieldClass} ${
              errors.title ? 'border-red-500 focus:outline-red-500' : ''
            }`}
            placeholder="Enter title of the track"
            {...register('title')}
          />
          {errors.title && (
            <p data-testid="error-title" className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Artist
          </label>
          <input
            data-testid="input-artist"
            className={`${inputFieldClass} ${
              errors.artist ? 'border-red-500 focus:outline-red-500' : ''
            }`}
            placeholder="Enter artist that created it"
            {...register('artist')}
          />
          {errors.artist && (
            <p data-testid="error-artist" className="text-red-500 text-sm mt-1">
              {errors.artist.message}
            </p>
          )}
        </div>

        {genres.length ? (
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
                {errors.genres.message}
              </p>
            )}
          </div>
        ) : (
          ''
        )}
        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Album
          </label>
          <input
            data-testid="input-album"
            className={` ${inputFieldClass} ${
              errors.album ? 'border-red-500 focus:outline-red-500' : ''
            } `}
            placeholder="What album your track belongs to?"
            {...register('album')}
          />
          {errors.album && (
            <p className="text-red-500 text-sm mt-1">{errors.album.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block sm:text-lg text-sm font-semibold">
            Track cover
          </label>
          <input
            data-testid="input-cover-image"
            className={`${inputFieldClass} ${
              errors.coverImage ? 'border-red-500 focus:outline-red-500' : ''
            }`}
            placeholder="Enter url for the cover of the track"
            {...register('coverImage')}
          />
          {errors.coverImage && (
            <p
              data-testid="error-cover-image"
              className="text-red-500 text-sm mt-1"
            >
              {errors.coverImage.message}
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
