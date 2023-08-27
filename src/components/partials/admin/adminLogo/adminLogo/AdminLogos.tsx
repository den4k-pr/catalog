import { ChangeEvent, useState } from "react";
import { Logo } from "@/types/logo";

interface AdminLogosListProps {
  logo: Logo;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminLogoslogo = ({
  logo,
  index,
  handleToggle,
  burgerToggle,
}: AdminLogosListProps) => {
  const [newHref, setHref] = useState(logo.href);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // @ts-ignore
      const res = await fetch(`/api/logo/${logo._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
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
        setHref(imageDataUrl);
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
          <img style={{height: "50px", width: "50px"}} src={logo.href} alt="" />
          <input
            onChange={handleImageChange}
            name="newName"
            className="post-form-input"
            type="file"
          />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
          </nav>
        </form>
      </div>
    </div>
  );
};
