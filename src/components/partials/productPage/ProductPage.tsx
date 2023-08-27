

import useCart from "@/hooks/useLocalStorage"
import { UseProduct } from "@/hooks/useProduct"
import { UseProducts } from "@/hooks/useProducts"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export const ProductPartPage = () => {
    const { displayedProducts, loading } = UseProducts();

    const router = useRouter();
    const { slug } = Array.isArray(router.query) ? router.query[0] : router.query;

    const { product } = UseProduct({ slug: slug })

    const {cart, addToCart, removeFromCart} = useCart();

    const handleAddToCart = (): void => {
        if (product) {
          addToCart(product);
        }
    };
    
    const [currentImage, setCurrentImage] = useState(0);

    const handleNextSlide = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % (product?.images?.length ?? 0));
      };
    
      const handlePrevSlide = () => {
        setCurrentImage(
          (prevImage) => (prevImage - 1 + (product?.images?.length ?? 0)) % (product?.images?.length ?? 0)
        );
      };

    return(
        <section>
            <div className="productPage">
                {product?.sale && <Image className="productPage-sale" src="/sale.png" width={50} height={50} alt="sale"/>}
                {loading ?
                    
                    <div className="loader__body">
                        <div className="loader__body-spiner"></div>
                    </div>

                :

                <>
                <div className="productPage__left">
                    <div className="slider">
                        <div className="slider-for">
                            <img className="slider-for-img" src={product?.images[currentImage]} alt=""/>
                        </div>
                        {product?.images?.length !== 1 &&
                        <div className="slider-nav">
                            <button className="slider-nav-prev" onClick={handlePrevSlide}></button>
                            <nav className="slider-nav-button">
                                <img className="slider-nav-button_img" src={product?.images[currentImage]} alt={`Slide ${currentImage + 1}`} />
                            </nav>
                            <button className="slider-nav-next" onClick={handleNextSlide}></button>
                        </div>
                        }
                    </div>
                </div>
                <div className="productPage__right">
                    <h2 className="productPage__right-title">{product?.name}</h2>
                    <span className="productPage__right-price">$ {product?.price} 
                        <button 
                            style={cart.some((item) => item._id === product?._id) ? {backgroundColor: "#031c46", opacity: "0.7"} : {}}
                            onClick={handleAddToCart} 
                            disabled={cart.some((item) => item._id === product?._id)}>
                            {cart.some((item) => item._id === product?._id) ? "Already in the basket" : "In the basket"}
                        </button>
                    </span>
                    <p className="productPage__right-category">Category: <span>{product?.category}</span></p>
                    <h3 className="productPage__right-titleDescription">Decription:</h3>
                    <p className="productPage__right-description">{product?.description}</p>
                </div>
                </>

                }
            </div>
            <div className="productPage">
                <h2 className="productPage__otherFiles-title">Схожі товари</h2>

                <div className="productPage__products">
                {
                    displayedProducts.filter((productDown) => productDown.categorySlug == product?.categorySlug && productDown.slug !== product?.slug).map(productDown =>
                        <Link key={productDown.slug} href={"/product/" + productDown.slug}>
                            <figure className="productPage__products__product">
                                    <div className="productPage__products__product-imgBox">
                                        <img className="productPage__products__product-imgBox-img" src={productDown.images[0] as string} alt="" />
                                    </div>
                                    <figcaption className="productPage__products__productDown-info">
                                        <span className="productPage__products__productDown-info-price">$ {productDown.price}</span>
                                        <h3 className="productPage__products__productDown-info-name">{productDown.name}</h3>
                                    </figcaption>
                            </figure>
                       </Link>
                    )
                }
                </div>
            </div>
        </section>
    )
}