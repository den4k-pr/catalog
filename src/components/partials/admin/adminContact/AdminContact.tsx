

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Contacts } from '@/types/contacts';
import { AdminContactsList } from './adminContactsContact/AdminContactsContact';
import { CreateContact } from './createContact/CreateContact';

const getContacts = async () => {
  try {
    const res = await fetch('/api/contact', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Contact');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading Contact: ', error);
  }
};

export const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [createToggle, setCreateToggle] = useState<boolean>(false);

  const chooseValue = useAppSelector((state: RootState) => state.adminChoose.chooseValue);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleToggleCreate = (bool: boolean) => {
    setCreateToggle(bool);
    if (bool === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  };

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue !== 'Contacts' ? '(Контакти)' : ''}</h1>

        <AdminContactsList contacts={contacts} />

        <CreateContact handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
