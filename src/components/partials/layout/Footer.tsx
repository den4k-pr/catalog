import Image from "next/image";
import Link from "next/link";
import { UseContacts } from "@/hooks/useContacts";

export function Footer() {

    const { contacts } = UseContacts()

    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__row_column footer__row_columnBox">
                        <p className="footer-text">Polska</p>
                        <p className="footer-text">04-088</p>
                        <p className="footer-text">Warszawa, Majdańska 16/27</p>
                        {contacts.map((contact, index) =>
                            <p key={contact.name} className="footer-text">{index == 0 ? "P" : "E"}: {contact.name}</p> 
                        )}
                        <Link href="https://www.liveinternet.ru/?terracottaland.eu">
                            <Image style={{marginTop: "7px"}} src="/footerLink.gif" alt="" width={88} height={31}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-down">
                <p className="footer-text">ilfau47@gmail.com</p>
            </div>
        </footer>
    )
}
