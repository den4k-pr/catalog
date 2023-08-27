
import { Category } from "@/types/categories";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminCategoriesListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateCategory = ({ handleToggleCreate, createToggle }: AdminCategoriesListProps) => {
  const [formData, setFormData] = useState<Category>({
    categoryName: "",
    categorySlug: ""
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
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a category");
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
          <label className="post-form-label">Назва категорії: </label>
          <input name="categoryName" onChange={handleChange} className="post-form-input" type="text" />
          <label className="post-form-label">Елемент силки: </label>
          <input name="categorySlug" onChange={handleChange} className="post-form-input" type="text" />
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
