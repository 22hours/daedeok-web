import style from "./Video.module.scss";
import YouTube, { Options } from "react-youtube";
import { useEffect, useRef, useState } from "react";
import React from "react";

// icons
import FullscreenIcon from "@material-ui/icons/Fullscreen";

type Props = {
    progress: number;
    setProgress: any;
    video_url: string;
    start: number;
    timerTick: number;
};

const Video = React.memo((props: Props) => {
    const [videoInfo, setVideoInfo] = useState(null);
    const YoutubeRef = useRef(null);
    const opts: Options = {
        height: "100%",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0, // 동영상 자동 재생
            controls: 0, // 조작바 X
            disablekb: 1, // 키보드 조작 X
            modestbranding: 1, // 로고 표시 X
            rel: 0, // 관련동영상 표시 X
            start: props.start, // 시작
        },
    };

    const onReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
        event.target.mute();

        if (YoutubeRef.current) {
            setVideoInfo({
                //@ts-ignore
                player: YoutubeRef.current.getInternalPlayer(),
            });
        }
    };

    const onEnd = (event) => {
        console.log(event);
    };

    const getProgress = async () => {
        if (YoutubeRef.current) {
            // @ts-ignore
            const playTime = await videoInfo.player.getCurrentTime();
            // @ts-ignore
            const durationTime = await videoInfo.player.getDuration();
            return (playTime / durationTime) * 100;
        }
    };

    const goFullScreen = async () => {
        if (YoutubeRef.current) {
            // @ts-ignore
            const player = YoutubeRef.current.getInternalPlayer();
            console.log(YoutubeRef.current);
            console.log(player);

            const iframe = await player.getIframe();
            var requestFullScreen =
                iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
            if (requestFullScreen) {
                requestFullScreen.bind(iframe)();
            }
        }
    };

    useEffect(() => {
        if (videoInfo) {
            const timer = setInterval(async () => {
                const curProgress = await getProgress();
                props.setProgress(curProgress);
            }, props.timerTick);
            return () => {
                clearInterval(timer);
            };
        }
    }, [videoInfo]);

    return (
        <div className={style.container}>
            <YouTube
                className={style.ytplayer}
                containerClassName={style.container}
                //@ts-ignore
                ref={YoutubeRef}
                videoId={props.video_url.split("/").pop()}
                opts={opts}
                onReady={onReady}
                onEnd={onEnd}
            />
            <div className={style.bottom_control_bar}>
                <span className={style.fullscreen_button} onClick={goFullScreen}>
                    <FullscreenIcon />
                </span>
            </div>
        </div>
    );
});

export default Video;
