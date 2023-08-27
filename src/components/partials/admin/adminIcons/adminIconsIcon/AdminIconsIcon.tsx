

import { useState } from "react";
import { AdminIconsIcon } from "../adminIcon/AdminIcons";
import { Icons } from "@/types/icons";

interface AdminIconsIconProps {
  icons: Icons[];
}

export const AdminIconsList: React.FC<AdminIconsIconProps> = ({ icons }) => {
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
      {icons.map((icon, index) => (
        // @ts-ignore
        <div key={icon._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminIconsIcon icon={icon} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}

          <p style={{display: "flex", alignItems: "center", gap: "20px"}}>
            {index + 1}. <img src={icon.name} style={{width: "40px", height: "40px", backgroundColor: "#d7d7d7", padding: "3px"}} alt="" />
          </p>
        </div>
      ))}
    </>
  );
};
