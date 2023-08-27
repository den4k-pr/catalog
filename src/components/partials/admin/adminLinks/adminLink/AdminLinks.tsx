import { useState } from "react";
import RemoveLinkBtn from "../../removeBtn/RemoveLink";
import { Links } from "@/types/links";

interface AdminLinksListProps {
  link: Links;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminLinksLink = ({
  link,
  index,
  handleToggle,
  burgerToggle,
}: AdminLinksListProps) => {
  const [newName, setName] = useState(link.name);
  const [newHref, setHref] = useState(link.href);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // @ts-ignore
      const res = await fetch(`/api/link/${link._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newHref,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update category");
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
          <label className="post-form-label">Назва силки: {link.name}</label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="newName"
            className="post-form-input"
            type="text"
          />
          <label className="post-form-label">Силка: {link.href}</label>
          <input
            onChange={(e) => setHref(e.target.value)}
            name="newHref"
            className="post-form-input"
            type="text"
          />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
            {/* @ts-ignore */}
            <RemoveLinkBtn id={link._id} />
          </nav>
        </form>
      </div>
    </div>
  );
};
