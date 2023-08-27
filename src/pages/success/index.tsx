import useCart from "@/hooks/useLocalStorage";
import Link from "next/link";



export default function SuccessPage() {
    // @ts-ignore
    const {clearCart} = useCart();

    return(
        <section className="success">
            <h1 className="success-title">
                Thank you for shopping in TERRACOTTA
            </h1>
            <Link
                className="success-button"
                href={"/"}
                onClick={clearCart}
            >
                <p>Continue Shopping</p>
            </Link>
        </section>
    )
}