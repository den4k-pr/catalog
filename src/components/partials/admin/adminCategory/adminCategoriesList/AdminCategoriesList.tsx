

import { useState } from "react";
import { AdminCategoriesCategory } from "../adminCategory/AdminCategoriesCategory";
import { Category } from "@/types/categories";

interface AdminCategoriesListProps {
  categories: Category[];
}

export const AdminCategoriesList: React.FC<AdminCategoriesListProps> = ({ categories }) => {
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
      {categories.map((category, index) => (
        // @ts-ignore
        <div key={category._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminCategoriesCategory category={category} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}

          <p>
            {index + 1}. <span>{category.categoryName}</span>
          </p>
        </div>
      ))}
    </>
  );
};
