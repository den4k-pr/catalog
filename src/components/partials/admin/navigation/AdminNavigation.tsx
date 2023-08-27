

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthenticated } from "@/redux/state/authSlice";
import { setAdminValue } from "@/redux/state/togleAdminChoose";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";


export const AminNavigation = () => {

    const dispatch = useAppDispatch();

    const handleButtonClick = (value: string) => {
        dispatch(setAdminValue(value));
    };

    const router = useRouter()

    const authLog = useAppSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!authLog) {
            router.push('/signin');
        }
    }, [authLog, router]);

    return(
        <section className="adminNavigation">
            <button onClick={() => handleButtonClick("products")} className="adminNavigation-button">Товари</button>
            <button onClick={() => handleButtonClick("categories")} className="adminNavigation-button">Категорії</button>
            <button onClick={() => handleButtonClick("links")} className="adminNavigation-button">Силки</button>
            <button onClick={() => handleButtonClick("videos")} className="adminNavigation-button">Відео</button>
            <button onClick={() => handleButtonClick("contacts")} className="adminNavigation-button">Контакти</button>
            <button onClick={() => handleButtonClick("icons")} className="adminNavigation-button">Іконки</button>
            <button onClick={() => handleButtonClick("logo")} className="adminNavigation-button">Логотип</button>
            {authLog && (
                <Link onClick={() => dispatch(setAuthenticated(false))} className="adminNavigation-signOut" href="/" >Вийти з акаунту</Link>
            )}
        </section>
    )
}