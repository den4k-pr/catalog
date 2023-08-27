import { useState } from "react";
import RemoveCategoryBtn from "../../removeBtn/RemoveCategory";
import { Category } from "@/types/categories";

interface AdminCategoriesListProps {
  category: Category;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminCategoriesCategory = ({
  category,
  index,
  handleToggle,
  burgerToggle,
}: AdminCategoriesListProps) => {
  const [newCategoryName, setCategoryName] = useState(category.categoryName);
  const [newCategorySlug, setCategorySlug] = useState(category.categorySlug);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/category/${category.categorySlug}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newCategoryName,
          newCategorySlug,
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
          <label className="post-form-label">Назва категорії: {category.categoryName}</label>
          <input
            onChange={(e) => setCategoryName(e.target.value)}
            name="categoryName"
            className="post-form-input"
            type="text"
          />
          <label className="post-form-label">Елемент силки: {category.categorySlug}</label>
          <input
            onChange={(e) => setCategorySlug(e.target.value)}
            name="categorySlug"
            className="post-form-input"
            type="text"
          />
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
            {/* @ts-ignore */}
            <RemoveCategoryBtn id={category._id} />
          </nav>
        </form>
      </div>
    </div>
  );
};
