import { useState } from "react";
import { UseProducts } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Search = () => {
  const { displayedProducts, loading } = UseProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Затримка для того, щоб ви могли натиснути на елемент списку перед закриттям
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <nav className="search">
      <Image src="/search.png" className="search-img" width={30} height={30} alt="" />
      <input
        type="text"
        className="search-input"
        placeholder="Enter a name"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleInputFocus}
        onMouseDown={handleInputFocus} // Викликаємо handleInputFocus при натисканні на інпут
        onBlur={handleInputBlur}
      />
      {isFocused && (
        <ul className={`search__list ${isFocused ? "visible" : ""}`}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            displayedProducts
              .filter((product) => (slug ? product.categorySlug === slug : true))
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <li key={product.slug}>
                  <Link className="search__list-link" href={"/product/" + product.slug}>
                    {product.name}
                  </Link>
                </li>
              ))
          )}
        </ul>
      )}
    </nav>
  );
};
