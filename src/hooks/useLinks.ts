

import { Links } from "@/types/links";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseLinks = () => {

    const [links, setLinks] = useState<Links[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/links");
            setLinks(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }
      
        fetchProducts();
      }, []);

    return { links, loading };
}