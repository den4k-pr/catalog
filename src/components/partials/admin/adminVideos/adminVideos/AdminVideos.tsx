import { useEffect, useRef, useState } from "react";
import { Videos } from "@/types/videos";

interface AdminVideosVideoProps {
  video: Videos;
  index: number;
  burgerToggle: number;
  handleToggle: (number: number) => void;
}

export const AdminVideosVideo = ({
  video,
  index,
  handleToggle,
  burgerToggle,
}: AdminVideosVideoProps) => {
  const [newName, setName] = useState(video.name);
  const [newHref, setHref] = useState(video.href);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // @ts-ignore
      const res = await fetch(`/api/video/${video._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newHref,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update category");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    iframeRef.current && iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  }, []);


  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => handleToggle(0)}
        className={`admin__posts-post-form ${burgerToggle === index + 1 ? "admin__posts-post-formActive" : ""}`}
      >
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="post-form">
          <label className="post-form-label">Текст під відео: {video.name}</label>
          <textarea
            onChange={(e) => setName(e.target.value)}
            name="newName"
            className="post-form-input"
          />
          <label className="post-form-label">Відео: {video.href}</label>
          <input
            onChange={(e) => setHref(e.target.value)}
            name="newHref"
            className="post-form-input"
            type="text"
          />
          <iframe
            ref={iframeRef}
            allow="autoplay; fullscreen"
            style={{ border: "none", width: "200px", height: "250px", margin: "10px auto" }}
            src={video.href}
            allowFullScreen
          ></iframe>
          <nav className="post-form__buttons">
            <button className="post-form__buttons-save">Зберегти</button>
          </nav>
        </form>
      </div>
    </div>
  );
};
