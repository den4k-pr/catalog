

import { Videos } from "@/types/videos";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseVideo = () => {

    const [videos, setVideos] = useState<Videos[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/videos");
            setVideos(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }
      
        fetchProducts();
      }, []);

    return { videos, loading };
}