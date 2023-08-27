

import { Category } from "@/types/categories";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseCategories = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }
      
        fetchProducts();
      }, []);

    return { categories, loading };
}