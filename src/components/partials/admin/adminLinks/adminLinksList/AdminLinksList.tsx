

import { useState } from "react";
import { AdminLinksLink } from "../adminLink/AdminLinks";
import { Links } from "@/types/links";

interface AdminLinksListProps {
  links: Links[];
}

export const AdminLinksList: React.FC<AdminLinksListProps> = ({ links }) => {
  const [burgerToggle, setBurgerToggle] = useState<number | null>(null);

  const handleToggle = (number: number) => {
    setBurgerToggle((prev) => (prev === number ? null : number));
    if (number !== 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  };


  return (
    <>
      {links.map((link, index) => (
        // @ts-ignore
        <div key={link._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminLinksLink link={link} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}

          <p>
            {index + 1}. <span>{link.name}</span>
          </p>
        </div>
      ))}
    </>
  );
};
