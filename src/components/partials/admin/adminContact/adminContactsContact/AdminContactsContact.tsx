

import { useState } from "react";
import { Contacts } from "@/types/contacts";
import { AdminContactsContact } from "../adminContact/AdminContacts";

interface AdminContactsListProps {
  contacts: Contacts[];
}

export const AdminContactsList: React.FC<AdminContactsListProps> = ({ contacts }) => {
  const [burgerToggle, setBurgerToggle] = useState<number | null>(null);

  const handleToggle = (number: number) => {
    setBurgerToggle((prev) => (prev === number ? null : number));
    if (number !== 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  };


  return (
    <>
      {contacts.map((contact, index) => (
        // @ts-ignore
        <div key={contact._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminContactsContact contact={contact} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}
          {index == 0 ? "Електрона пошта" : "Номер телефону"}
        </div>
      ))}
    </>
  );
};
