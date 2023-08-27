

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { AdminProductsList } from './adminProductsList/AdminProductsList';
import { CreateProduct } from './createProduct/CreateProduct';
import { ProductAdmin } from '@/types/products';

const getProducts = async () => {
  try {
    const res = await fetch('/api/products', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading products: ', error);
  }
};

export const AdminProducts = () => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductAdmin[]>([]);

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
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="admin__posts">
        <h1 className="title">Адмін панель {chooseValue == 'products' ? '(Товари)' : '(Категорії)'}</h1>
        <button onClick={() => handleToggleCreate(true)} className="admin__posts-create">
            +
        </button>

        <AdminProductsList products={products} />

      <CreateProduct handleToggleCreate={handleToggleCreate} createToggle={createToggle} />
    </div>
  );
};
