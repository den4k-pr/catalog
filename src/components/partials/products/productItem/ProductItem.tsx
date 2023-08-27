

import Image from "next/image"

interface Product {
    name: string,
    price: number,
    category: string,
    sale: boolean,
    images: string[]
}

export const ProductItem = ({ name, price, category, sale, images }: Product) => {

    return(
        <figure className="products__product">
            {sale && <Image className="products__product-sale" src="/sale.png" width={50} height={50} alt="sale"/>}
            <div className="products__product_box">
                <img className="products__product_box-img" src={images[0]} alt="product" />
            </div>
            <figcaption className="products__product_info">
                <h3 className="products__product_info-name">{name}</h3>
                <div className="products__product_info-columns">
                    <div className="products__product_info-columns_column">
                        <p className="products__product_info-columns_column-title">Price</p>
                        <span className="products__product_info-columns_column-price">$ {price}</span>
                    </div>
                    <div className="products__product_info-columns_column">
                        <span className="products__product_info-columns_column-category">{category}</span>
                    </div>
                </div>
            </figcaption>
        </figure>
    )
}