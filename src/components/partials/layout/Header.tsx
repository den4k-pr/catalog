

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBurgerValue } from "@/redux/state/togleBurger";
import { RootState } from "@/redux/store";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UseLinks } from "@/hooks/useLinks";
import { UseContacts } from "@/hooks/useContacts";
import { UseIcons } from "@/hooks/useIcons";
import { UseLogo } from "@/hooks/useLogo";

export function Header() {

    const [scrolled, setScrolled] = useState(false);

    const { links } = UseLinks()

    let headerList = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY >= 163) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        };

        handleScroll(); // Викликаємо функцію для перевірки після завантаження сторінки

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const burgerValue = useAppSelector((state: RootState) => state.boorger.burgerValue);

    const dispatch = useAppDispatch();

    const handleButtonClick = () => {
        dispatch(setBurgerValue());
    };

    const { contacts } = UseContacts()
    const { icons } = UseIcons()
    const { logo } = UseLogo()

    return(
        <header ref={headerList} className="header">
            <div className="header__top">
                <div className="header__top-left">
                    {contacts.map(contact => 
                        <p key={contact.name} className="header__top-left-email">{contact.name}</p>
                    )}
                </div>
                <div className="header__top-right">
                    <ul className="header__top-right-list">
                        {icons.map((icon, index) => 
                            <li key={index} className="header__top-right-list-li" style={{backgroundImage: `url(${icon.name})`}}>
                                <Link href={icon.href}>Link</Link>
                            </li>
                        )}
                        
                    </ul>
                </div>
            </div>
            <div className={`header__bottom ${scrolled ? "fixed" : ""}`}>
                <Link href="https://terracottaland.eu/">
                    {logo.map((el, index) =>
                        <img key={index} src={el.href} alt="logo" style={{width: "113px", height: "113px"}} />
                    )}
                </Link>
                <ul className={`header__bottom-list${burgerValue ? " active" : ""}`}>
                    {
                        links.map(link =>
                            <li key={link.name} onClick={handleButtonClick} className="header__bottom-list-li">
                                <Link className="header__bottom-list-link" href={link.href}>{link.name}</Link>
                            </li>
                        )
                    }
                </ul>
                <button onClick={handleButtonClick} className={`header__bottom-burger${burgerValue ? " active" : ""}`}>
                    <span className="header__bottom-burger-line"></span>
                    <span className="header__bottom-burger-line"></span>
                    <span className="header__bottom-burger-line"></span>
                </button>
            </div>
        </header>
    )
}
