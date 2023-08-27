import { Logo } from "@/types/logo";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminlogoListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateLogo = ({ handleToggleCreate, createToggle }: AdminlogoListProps) => {
  const [formData, setFormData] = useState<Logo>({
    href: ""
  });
  const [buttonState, setButtonState] = useState({
    isDisabled: false,
    hasAdditionalClass: false,
  });

  const handleButtonClick = () => {
    setButtonState({ isDisabled: true, hasAdditionalClass: true });
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        setFormData((prevState) => ({ ...prevState, href: imageDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    handleButtonClick()

    try {
      const res = await fetch("/api/logo", {
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
            name="href"
            onChange={handleImageChange}
            className="post-form-input"
            type="file"
            accept="image/*"
            required
          />
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
