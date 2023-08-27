import { useEffect, useRef, useState } from "react";
import { Contacts } from "@/types/contacts";

interface AdminContactsContactProps {
  contact: Contacts;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminContactsContact = ({
  contact,
  index,
  handleToggle,
  burgerToggle,
}: AdminContactsContactProps) => {
  const [newName, setName] = useState(contact.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // @ts-ignore
      const res = await fetch(`/api/contact/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newName
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update contact");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => handleToggle(0)}
        className={`admin__posts-post-form ${burgerToggle === index + 1 ? "admin__posts-post-formActive" : ""}`}
      >
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="post-form">
          <label className="post-form-label">Назва: {contact.name}</label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="newName"
            className="post-form-input"
            type="text"
          />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
          </nav>
        </form>
      </div>
    </div>
  );
};
