import Image from "next/image";
import Link from "next/link";
import 'animate.css';
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { UseCategories } from "@/hooks/useCategories";
import useCart from "@/hooks/useLocalStorage";
import { UseVideo } from "@/hooks/useVideo";
import { useRouter } from "next/router";
import { VideoAside } from "./video";

export function Aside() {
    const { cart, addToCart, removeFromCart, getTotalPrice, getTotalLength } = useCart();
    const { categories, loading } = UseCategories();
    const pathname = usePathname();
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(false);

    const elementRef = useRef<HTMLAnchorElement>(null);

    const handleOptionClick = (optionValue: string): void => {
        setSelectedOption(optionValue);
        setOptionsVisible(false);
    };

    const animateSwing = () => {
        const element = elementRef.current;
        if (element) {
            element.classList.add('animate__tada');
            setTimeout(() => {
                element.classList.remove('animate__tada');
            }, 2000);
        }
    };

    useEffect(() => {
        if (getTotalLength() !== 0) {
            const interval = setInterval(animateSwing, 3000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [getTotalLength]);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            setIsVisible(windowWidth >= 1000);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (pathname === "/admin") {
        return null;
    }

    return (
        <aside className="aside">
            <h2 className="aside-title">Categories</h2>
            <ul className="aside__listCategories">
                <li>
                    <Link href="/" className="aside__listCategories-category">All products</Link>
                </li>
                {categories.map(category =>
                    <li key={category.categorySlug}>
                        <Link href={`/${category.categorySlug}`} className="aside__listCategories-category">{category.categoryName}</Link>
                    </li>
                )}
            </ul>
            <div className="aside__select">
                <div
                    className="aside__selected-option"
                    onClick={() => setOptionsVisible(!isOptionsVisible)}
                >
                    {selectedOption ? selectedOption : 'Select a category'}
                </div>
                {isOptionsVisible && (
                    <ul className="aside__options">
                        <li
                            className="aside__option"
                            onClick={() => handleOptionClick('Select a category')}
                        >
                            <Link href="/" className="aside__option-link">All products</Link>
                        </li>
                        {categories.map(category =>
                            <li
                                key={category.categorySlug}
                                className="aside__option"
                                onClick={() => handleOptionClick(category.categoryName)}
                            >
                                <Link href={`/${category.categorySlug}`} className="aside__option-link">{category.categoryName}</Link>
                            </li>
                        )}
                    </ul>
                )}
            </div>
            {(isVisible || router.pathname === "/") && <VideoAside />}
            <nav className="aside-busket">
                <Link href="/cart" ref={elementRef} className="aside-busket_button animate__animated">
                    <Image className="aside-busket_button-img" src="/busket.png" alt="" width={40} height={40} />
                    <span className="aside-busket_button-length">{getTotalLength()}</span>
                </Link>
            </nav>
        </aside>
    );
}
