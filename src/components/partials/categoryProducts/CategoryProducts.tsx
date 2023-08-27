

// import { products } from "@/cmponents/types/products"
import { Navigation } from "../products/navigation/Navigation"
import { ProductItem } from "../products/productItem/ProductItem"
import { useRouter } from "next/router"
import Link from "next/link"
import { UseProducts } from "@/hooks/useProducts"
import ContentLoader from "react-content-loader"

export const CategoryProducts = () => {

    const getParams = useRouter()
    const { category } = getParams.query

    const { displayedProducts, loading } = UseProducts()

    console.log(category)

    return (
        <section>
            <Navigation />
            <div className="products">
                {loading ? 

                ["","","","","",""].map((el, index) => 
                <ContentLoader
                    speed={2}
                    width={285}
                    height={384}
                    viewBox="0 0 285 384"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    className="loadPr"
                    key={index}
                >
                    <rect x="0" y="0" rx="9" ry="9" width="285" height="250" /> 
                    <rect x="0" y="270" rx="9" ry="9" width="285" height="22" /> 
                    <rect x="0" y="307" rx="9" ry="9" width="55" height="17" /> 
                    <rect x="0" y="336" rx="9" ry="9" width="70" height="27" /> 
                    <rect x="191" y="336" rx="9" ry="9" width="90" height="25" />
                </ContentLoader>
                )
                

                :
                
                displayedProducts.filter((product) => product.categorySlug == category ).map((product: any) => (
                <Link key={product.slug} href={"/product/" + product.slug}>
                    <ProductItem
                    images={product.images}
                    sale={product.sale}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    />
                </Link>
                ))}
            </div>
        </section>
    );
}
