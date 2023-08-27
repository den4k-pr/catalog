

import { Logo } from "@/types/logo";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseLogo = () => {

    const [logo, setLogo] = useState<Logo[]>([]);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/logo");
            setLogo(response.data);
          } catch (error) {
            console.log(error)
          }
        }
      
        fetchProducts();
      }, []);

    return { logo };
}