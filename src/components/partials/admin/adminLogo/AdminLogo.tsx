

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Logo } from '@/types/logo';
import { CreateLogo } from './createLogo/CreateLogo';
import { AdminlogoList } from './adminLogosLogo/AdminLogosLogo';

const getLogo = async () => {
  try {
    const res = await fetch('/api/logo', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch logo');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading logo: ', error);
  }
};

export const AdminLogo = () => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);
  const [logo, setLogo] = useState<Logo[]>([]);

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
    const fetchLogo = async () => {
      try {
        const fetchedLogo = await getLogo();
        setLogo(fetchedLogo);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue == 'logo' ? '(Логотип)' : ''}</h1>

        <AdminlogoList logo={logo} />

      <CreateLogo handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
