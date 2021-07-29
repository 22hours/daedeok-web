import style from "./VideoClass.module.scss";
import ProgressBar from "@ui/ProgressBar";
import Video from "@ui/video/Video";
import { useEffect, useState } from "react";

type Props = {
    video_url: string;
    start: number;
};

const VideoClass = () => {
    const props: Props = {
        video_url: "https://youtu.be/PGNMCgmjMOw",
        start: 600,
        // beforeProgress:
    };
    const [progress, setProgress] = useState(0);

    return (
        <div className={style.container}>
            <div className={style.video_container}>
                <Video
                    progress={progress}
                    setProgress={setProgress}
                    video_url={props.video_url}
                    start={props.start}
                    timerTick={1000}
                />
            </div>

            <div className={style.progress_container}>
                <ProgressBar progress={progress} />
            </div>
        </div>
    );
};

export default VideoClass;
