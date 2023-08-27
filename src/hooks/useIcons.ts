

import { Icons } from "@/types/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseIcons = () => {

    const [icons, setIcons] = useState<Icons[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/icons");
            setIcons(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }
      
        fetchProducts();
      }, []);

    return { icons, loading };
}