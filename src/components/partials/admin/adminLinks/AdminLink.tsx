

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CreateLink } from './createLink/CreateLink';
import { Links } from '@/types/links';
import { AdminLinksList } from './adminLinksList/AdminLinksList';

const getLinks = async () => {
  try {
    const res = await fetch('/api/links', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Link');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading Link: ', error);
  }
};

export const AdminLinks = () => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);
  const [links, setLinks] = useState<Links[]>([]);

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
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getLinks();
        setLinks(fetchedLinks);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue !== 'links' ? '(Товари)' : '(Силки)'}</h1>
        <button onClick={() => handleToggleCreate(true)} className="admin__posts-create">
            +
        </button>

        <AdminLinksList links={links} />

      <CreateLink handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
