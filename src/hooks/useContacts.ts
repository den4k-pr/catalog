

import { Contacts } from "@/types/contacts";
import axios from "axios";
import { useEffect, useState } from "react";

export const UseContacts = () => {

    const [contacts, setContacts] = useState<Contacts[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get("/api/contact");
            setContacts(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }
      
        fetchProducts();
      }, []);

    return { contacts, loading };
}