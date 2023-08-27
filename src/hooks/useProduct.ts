

import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export const UseProduct = ({ slug }: { slug: string }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loadingPage, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/product/${slug}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            setError('Не вдалося отримати дані продукту');
          }
        } catch (error) {
          setError('Помилка під час отримання продукту');
        } finally {
          setLoading(false);
        }
      };
  
      if (slug) {
        fetchProduct();
      }
    }, [slug]);
  
    return { product, loadingPage, error };
};
