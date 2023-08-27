

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Videos } from '@/types/videos';
import { AdminVideosList } from './adminVideosVideo/AdminVideosVideo';

const getVideos = async () => {
  try {
    const res = await fetch('/api/videos', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Video');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading Video: ', error);
  }
};

export const AdminVideos = () => {
  const [videos, setVideos] = useState<Videos[]>([]);

  const chooseValue = useAppSelector((state: RootState) => state.adminChoose.chooseValue);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue !== 'videos' ? '(Товари)' : '(Відео)'}</h1>

        <AdminVideosList videos={videos} />
    </div>
  );
};
