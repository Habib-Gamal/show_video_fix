import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Video() {
    useEffect(() => {
        document.getElementById("video")!.innerHTML = `
        <video
            id="my_video_1"
            class="video-js vjs-default-skin vjs-big-play-centered"
            controls
            preload="auto"
            data-setup='{"fluid": true}'
        ></video>
        `;
        const player = videojs("my_video_1");
        player.src({
            type: "application/x-mpegURL",
            src: query.get("url"),
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        player.on("xhr-hooks-ready", () => {
            const playerXhrRequestHook = (options: any) => {
                options.beforeSend = (xhr: any) => {
                    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
                };
                return options;
            };
            // @ts-ignore
            player.tech().vhs.xhr.onRequest(playerXhrRequestHook);
        });
        return () => {
            player.dispose();
        };
    }, []);
    const query = useQuery();
    const navigation = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigation("/url")}
                className=" flex mx-8 my-4 justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
                Back
            </button>
            <div id="video"></div>
        </div>
    );
}
