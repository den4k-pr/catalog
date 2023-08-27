

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CreateIcon } from './createIcon/CreateIcon';
import { Icons } from '@/types/icons';
import { AdminIconsList } from './adminIconsIcon/AdminIconsIcon';

const getIcons = async () => {
  try {
    const res = await fetch('/api/icons', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch icon');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading icon: ', error);
  }
};

export const AdminIcons = () => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);
  const [icons, setIcons] = useState<Icons[]>([]);

  const handleToggleCreate = (bool: boolean) => {
    setCreateToggle(bool);
    if (bool === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  };

  const chooseValue = useAppSelector((state: RootState) => state.adminChoose.chooseValue);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const fetchedIcons = await getIcons();
        setIcons(fetchedIcons);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue == 'icons' ? '(Іконки)' : ''}</h1>
        <button onClick={() => handleToggleCreate(true)} className="admin__posts-create">
            +
        </button>

        <AdminIconsList icons={icons} />

      <CreateIcon handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
