import style from "./VideoClass.module.scss";
import ProgressBar from "@ui/ProgressBar";
import Video from "@ui/video/Video";
import { useEffect, useState } from "react";

type Props = {
    video_url: string;
    start: string;
};

const VideoClass = (props: Props) => {
    const [progress, setProgress] = useState(0);

    if (props) {
        // @ts-ignore
        const video_url: string = props.video_url.split("/").pop();
        return (
            <div className={style.container}>
                <div className={style.video_container}>
                    <Video
                        progress={progress}
                        setProgress={setProgress}
                        video_url={video_url}
                        start={parseInt(props.start)}
                        timerTick={1000}
                    />
                </div>

                <div className={style.progress_container}>
                    <ProgressBar progress={progress} />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default VideoClass;
