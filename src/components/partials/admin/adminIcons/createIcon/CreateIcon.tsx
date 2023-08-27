import { Icons } from "@/types/icons";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminIconsListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateIcon = ({ handleToggleCreate, createToggle }: AdminIconsListProps) => {
  const [formData, setFormData] = useState<Icons>({
    name: "",
    href: ""
  });
  const [buttonState, setButtonState] = useState({
    isDisabled: false,
    hasAdditionalClass: false,
  });

  const handleButtonClick = () => {
    setButtonState({ isDisabled: true, hasAdditionalClass: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        setFormData((prevState) => ({ ...prevState, name: imageDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    handleButtonClick()

    try {
      const res = await fetch("/api/icons", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create an Icon");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div onClick={() => handleToggleCreate(false)} className={`admin__posts-post-form ${createToggle ? "admin__posts-post-formActive" : ""}`}>
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="post-form">
          <label className="post-form-label">Картинка: </label>
          <input
            name="image"
            onChange={handleImageChange}
            className="post-form-input"
            type="file"
            accept="image/*"
            required
          />
          <label className="post-form-label">Силка: </label>
          <input name="href" onChange={handleChange} className="post-form-input" type="text" />
          <nav className="post-form__buttons">
            <button 
              className={`post-form__buttons-save ${buttonState.hasAdditionalClass ? 'loadButton' : ''}`}
              disabled={buttonState.isDisabled}
            >
              Створити
            </button>
          </nav>
        </form>
      </div>
    </div>
  );
};
