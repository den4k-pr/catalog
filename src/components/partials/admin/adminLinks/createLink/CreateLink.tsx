

import { Links } from "@/types/links";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminCategoriesListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateLink = ({ handleToggleCreate, createToggle }: AdminCategoriesListProps) => {
  const [formData, setFormData] = useState<Links>({
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

  const [numInputs, setNumInputs] = useState<number>(1); // Кількість інпутів для зображень

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    handleButtonClick()

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a Link");
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
          <label className="post-form-label">Назва силки: </label>
          <input name="name" onChange={handleChange} className="post-form-input" type="text" />
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
