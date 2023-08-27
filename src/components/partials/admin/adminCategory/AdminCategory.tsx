

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CreateCategory } from './createCategory/CreateCategory';
import { AdminCategoriesList } from './adminCategoriesList/AdminCategoriesList';
import { Category } from '@/types/categories';

const getCategories = async () => {
  try {
    const res = await fetch('/api/categories', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Category');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading Category: ', error);
  }
};

export const AdminCategories = () => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

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
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue == 'Categories' ? '(Товари)' : '(Категорії)'}</h1>
        <button onClick={() => handleToggleCreate(true)} className="admin__posts-create">
            +
        </button>

        <AdminCategoriesList categories={categories} />

      <CreateCategory handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
