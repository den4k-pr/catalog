import { ChangeEvent, useState } from "react";
import { Icons } from "@/types/icons";
import RemoveIconBtn from "../../removeBtn/RemoveIconBtn";

interface AdminIconsListProps {
  icon: Icons;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminIconsIcon = ({
  icon,
  index,
  handleToggle,
  burgerToggle,
}: AdminIconsListProps) => {
  const [newName, setName] = useState(icon.name);
  const [newHref, setHref] = useState(icon.href);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // @ts-ignore
      const res = await fetch(`/api/icon/${icon._id}`, {
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        setName(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => handleToggle(0)}
        className={`admin__posts-post-form ${burgerToggle === index + 1 ? "admin__posts-post-formActive" : ""}`}
      >
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="post-form">
          <img style={{height: "50px", width: "50px"}} src={icon.name} alt="" />
          <input
            onChange={handleImageChange}
            name="newName"
            className="post-form-input"
            type="file"
          />
          <label className="post-form-label">Силка: {icon.href}</label>
          <input
            onChange={(e) => setHref(e.target.value)}
            name="newHref"
            className="post-form-input"
            type="text"
          />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
            {/* @ts-ignore */}
            <RemoveIconBtn id={icon._id} />
          </nav>
        </form>
      </div>
    </div>
  );
};
