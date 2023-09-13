
import { Category } from "@/types/categories";
import { ProductAdmin } from "@/types/products";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface AdminProductsListProps {
  createToggle: boolean;
  handleToggleCreate: (bool: boolean) => void;
}

export const CreateProduct = ({ handleToggleCreate, createToggle }: AdminProductsListProps) => {
  const [buttonState, setButtonState] = useState({
    isDisabled: false,
    hasAdditionalClass: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductAdmin>({
    name: "",
    description: "",
    price: NaN,
    sale: false,
    slug: "",
    category: "",
    categorySlug: "",
    images: [],
  });

  const handleButtonClick = () => {
    setButtonState({ isDisabled: true, hasAdditionalClass: true });
  };

  const [numInputs, setNumInputs] = useState<number>(1); // Кількість інпутів для зображень

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find(category => category.categoryName === selectedCategoryName);
    if (selectedCategory) {
      setFormData(prevState => ({
        ...prevState,
        categorySlug: selectedCategory.categorySlug,
        category: selectedCategoryName // Оновити значення category в стані formData
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    handleButtonClick()

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a product");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const images = [...prevState.images];
      images[index] = value;
      return { ...prevState, images };
    });
  };

  const handleAddInput = () => {
    setNumInputs((prevNum) => prevNum + 1);
  };

  const handleRemoveInput = () => {
    if (numInputs > 1) {
      setNumInputs((prevNum) => prevNum - 1);
      setFormData((prevState) => {
        const images = [...prevState.images];
        images.pop(); // Видалити останнє зображення
        return { ...prevState, images };
      });
    }
  };

  const renderImageInputs = () => {
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <div style={{display: "flex", flexDirection: "column"}} key={i}>
          <label className="post-form-label">Зображення-{i + 1}: </label>
          <input
            name={`image${i + 1}`}
            onChange={(e) => handleImageUrlChange(e, i)}
            value={formData.images[i]}
            style={{ minHeight: "40px" }}
            className="post-form-input"
            type="text"
            placeholder="Введіть URL зображення"
          />
        </div>
      );
    }
    return inputs;
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

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div onClick={() => handleToggleCreate(false)} className={`admin__posts-post-form ${createToggle ? "admin__posts-post-formActive" : ""}`}>
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="post-form">
          <h3>Створити</h3>
          <label className="post-form-label">Назва: </label>
          <input name="name" onChange={handleChange} className="post-form-input" type="text" required/>
          {renderImageInputs()}
          <div className="post-form-box">
            <button className="adminButton" type="button" onClick={handleAddInput}>
              +
            </button>
            <button className="adminButton" type="button" onClick={handleRemoveInput}>
              -
            </button>
          </div>
          <label className="post-form-label">Опис: </label>
          <textarea name="description" onChange={handleChange} className="post-form-input" required/>
          <label className="post-form-label">Ціна: </label>
          <input name="price" onChange={handleChange} className="post-form-input" type="number" required/>
          <label className="post-form-label">Елемент силки: </label>
          <input name="slug" onChange={handleChange} className="post-form-input" type="text" required/>
          <label className="post-form-label">Категорія: </label>
          <select className="post-form-select" name="category" id="" onChange={handleChangeCategory} required>
            <option value="" selected>Оберіть Категорію</option>  
            {
              categories.map(category =>
                <option key={category.categorySlug} value={category.categoryName}>{category.categoryName}</option>   
              )
            }
          </select>
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
