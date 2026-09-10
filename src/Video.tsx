import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Video() {
    const query = useQuery();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const videoContainer = videoRef.current;
        if (!videoContainer) return;

        const videoUrl = query.get("url") || "";
        const token = localStorage.getItem("token") || "";

        videoContainer.innerHTML = `
            <video
                id="my_video_1"
                class="video-js vjs-default-skin vjs-big-play-centered"
                controls
                preload="auto"
                data-setup='{"fluid": true}'
            ></video>
        `;

        const player = videojs("my_video_1");

        if (videoUrl) {
            player.src({
                type: "application/x-mpegURL",
                src: videoUrl,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        player.on("xhr-hooks-ready", () => {
            const playerXhrRequestHook = (options: any) => {
                options.beforeSend = (xhr: any) => {
                    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
                };
                return options;
            };
            // @ts-ignore
            if (player.tech() && (player.tech() as any).vhs) {
                // @ts-ignore
                (player.tech() as any).vhs.xhr.onRequest(playerXhrRequestHook);
            }
        });

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
            }
        };
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <button
                onClick={() => navigate("/url")}
                className="flex mx-4 my-2 justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
                Back
            </button>
            <div ref={videoRef} id="video" className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"></div>
        </div>
    );
}
