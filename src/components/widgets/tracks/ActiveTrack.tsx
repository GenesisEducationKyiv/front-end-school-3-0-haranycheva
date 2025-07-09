'use client';

import { getActiveTrack } from '@/api/tracks/getActiveTrack';
import { Track } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ActiveTrack = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    (async () => {
      const activeTrack = await getActiveTrack();

      if (activeTrack) {
        setTrack(activeTrack);
      }
    })();

    const handleActiveTrackUpdate = (data: Track) => {
      setTrack(data);
    };

    const socket = io(process.env.NEXT_PUBLIC_BASE_URL);

    socket.on('activeTrack:updated', handleActiveTrackUpdate);

    socket.on('activeTrack:updated', handleActiveTrackUpdate);

    return () => {
      socket.off('activeTrack:updated', handleActiveTrackUpdate);
    };
  }, []);

  if (!track) return <p>Loading active track...</p>;

  return (
    <div className="p-4 bg-blue-500 rounded-xl shadow-md flex align-ctnter justify-between mt-12">
      <div>
        <h2 className="text-xl font-semibold text-white">Active track:</h2>
        <p className="text-zinc-200 text-2xl">{track.title}</p>
        <p className="text-zinc-400 text-lg">{track.artist}</p>
      </div>
      <div className="flex gap-[30px]">
        <ul className=" flex gap-[2px] max-w-[80%] flex-wrap ">
          {track.genres.map((el) => (
            <li
              key={el}
              className="text-almond text-sm bg-blue-400 p-[4px] rounded-[5px] h-[25px]"
            >
              {el}
            </li>
          ))}
        </ul>
        <Image
          src={track.coverImage || '/no-image.jpg'}
          placeholder="empty"
          alt="Track cover"
          width={100}
          height={100}
          className="rounded-[5px] block w-[100px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default ActiveTrack;
