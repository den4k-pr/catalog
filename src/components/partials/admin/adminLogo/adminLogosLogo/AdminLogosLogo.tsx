

import { useState } from "react";
import { AdminLogoslogo } from "../adminLogo/AdminLogos";
import { Logo } from "@/types/logo";

interface AdminLogosLogoProps {
  logo: Logo[];
}

export const AdminlogoList: React.FC<AdminLogosLogoProps> = ({ logo }) => {
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
      {logo.map((log, index) => (
        // @ts-ignore
        <div key={log._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminLogoslogo logo={log} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}

          <p style={{display: "flex", alignItems: "center", gap: "20px"}}>
            {index + 1}. <img src={log.href} style={{width: "40px", height: "40px", backgroundColor: "#d7d7d7", padding: "3px"}} alt="" />
          </p>
        </div>
      ))}
    </>
  );
};
