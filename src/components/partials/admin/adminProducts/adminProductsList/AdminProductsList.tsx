

import { useState } from "react";
import { AdminProductsProduct } from "../adminProduct/AdminProductsProduct";
import { ProductAdmin } from "@/types/products";

interface AdminProductsListProps {
  products: ProductAdmin[];
}

export const AdminProductsList: React.FC<AdminProductsListProps> = ({ products }) => {
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
      {products.map((product, index) => (
        // @ts-ignore
        <div key={product._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminProductsProduct product={product} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}

          <p>
            {index + 1}. <span>{product.name}</span>
          </p>
          <span>{product.price} $</span>
        </div>
      ))}
    </>
  );
};
