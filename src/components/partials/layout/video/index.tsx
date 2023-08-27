import { UseVideo } from "@/hooks/useVideo"

export const VideoAside = () => {

    const { videos } = UseVideo()

    return(
        <>
            {videos.map(video => 
              <div key={video.href} className="aside-video">
                <iframe
                    allow="autoplay; fullscreen"
                    className="aside-video_mp4"
                    src={video.href}
                    allowFullScreen
                ></iframe>
                <p>{video.name}</p>
            </div>  
            )}
        </>
    )
}