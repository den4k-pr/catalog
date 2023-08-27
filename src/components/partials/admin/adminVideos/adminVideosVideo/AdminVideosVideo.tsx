

import { useState } from "react";
import { Videos } from "@/types/videos";
import { AdminVideosVideo } from "../adminVideos/AdminVideos";

interface AdminVideosListProps {
  videos: Videos[];
}

export const AdminVideosList: React.FC<AdminVideosListProps> = ({ videos }) => {
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
      {videos.map((video, index) => (
        // @ts-ignore
        <div key={video._id} onClick={() => handleToggle(index + 1)} className="admin__posts-post">
          {burgerToggle === index + 1 && (
            <AdminVideosVideo video={video} index={index} handleToggle={handleToggle} burgerToggle={burgerToggle} />
          )}
          Переглянути відео
        </div>
      ))}
    </>
  );
};
