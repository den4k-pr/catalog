

import { useEffect, useState } from "react";
import RemoveBtn from "../../removeBtn/RemoveProduct";
import { ProductAdmin } from "@/types/products";
import { Category } from "@/types/categories";
import Image from "next/image";

interface AdminProductsListProps {
  product: ProductAdmin;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminProductsProduct = ({
  product,
  index,
  handleToggle,
  burgerToggle,
}: AdminProductsListProps) => {
  const [newName, setNewName] = useState(product.name);
  const [newImages, setNewImages] = useState<string[]>(product.images);
  const [newDescription, setNewDescription] = useState(product.description);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newSale, setNewSale] = useState(false);
  const [newSlug, setNewSlug] = useState(product.slug);
  const [newCategory, setNewCategory] = useState(product.category);
  const [newCategorySlug, setNewCategorySlug] = useState(product.categorySlug);

  const [categories, setCategories] = useState<Category[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const updatedImages = [...newImages];
          updatedImages[index] = reader.result;
          setNewImages(updatedImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Функція для додавання нової картинки
  const addNewImage = () => {
    const updatedImages = [...newImages];
    updatedImages.push("");
    setNewImages(updatedImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/product/${product.slug}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newImages,
          newName,
          newDescription,
          newPrice,
          newSale,
          newSlug,
          newCategory,
          newCategorySlug,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch('/api/categories', {
        cache: 'no-store',
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch Category');
      }
  
      return res.json();
    } catch (error) {
      console.log('Error loading Category: ', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        // Handle any errors here
        console.log('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find(category => category.categoryName === selectedCategoryName);
    if (selectedCategory) {
      setNewCategory(selectedCategoryName);
      setNewCategorySlug(selectedCategory.categorySlug);
    }
  };

  
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <div onClick={() => handleToggle(0)} className={`admin__posts-post-form ${burgerToggle === index + 1 ? "admin__posts-post-formActive" : ""}`}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="post-form">
            <label className="post-form-label">Images:</label>
            {newImages.map((image, idx) => (
            <div className="post-form-boxImg" key={idx}>
              {image && <img style={{width: "40px", height: "40px"}} src={image} alt={`Image ${idx}`} />}
              <input
                name={`image-${idx}`}
                className="post-form-input"
                type="file"
                onChange={(e) => handleImageChange(e, idx)}
              />
            </div>
            ))}
            <div className="post-form-box">
              <button className="adminButton" type="button" onClick={addNewImage}>
                +
              </button>
            </div>
            <label className="post-form-label">Назва: {product.name}</label>
            <input onChange={(e) => setNewName(e.target.value)} name="name" className="post-form-input" type="text" />
            <label className="post-form-label">Опис: {product.description}</label>
            <textarea onChange={(e) => setNewDescription(e.target.value)} name="description" className="post-form-input"/>
            <label className="post-form-label">Ціна: {product.price}</label>
            <input onChange={(e) => setNewPrice(Number(e.target.value))} name="price" className="post-form-input" type="number" />
            <label className="post-form-label">Елемент силки: {product.slug}</label>
            <input onChange={(e) => setNewSlug(e.target.value)} name="slug" className="post-form-input" type="text" />
            <label className="post-form-label">Категорія: {product.category}</label>
            <select className="post-form-select" name="category" id="" onChange={handleChangeCategory}>
              <option>Оберіть Категорію</option>  
              {
                categories.map(category =>
                  <option key={category.categorySlug} value={category.categoryName}>{category.categoryName}</option>   
                )
              }
            </select>
            <nav className="post-form__buttons">
              <button className="post-form__buttons-save">Зберегти</button>
              
              {// @ts-ignore
              <RemoveBtn id={product._id} />}
            </nav>
          </form>
        </div>
      </div>
    );
  };
  