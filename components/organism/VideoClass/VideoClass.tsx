import style from "./VideoClass.module.scss";
import ProgressBar from "@ui/ProgressBar";
import Video from "@ui/video/Video";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import Typo from "@ui/Typo";
import Link from "next/link";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";

type State = {
    id: string;
    title: string;
    link: string;
    introduce: string;
    duration: number;
} | null;

const VideoClass = () => {
    const router = useRouter();
    const { episode_id } = router.query;
    const classInfo = useClassDetailStore();
    const { clientSideApi } = useAuthStore();
    const [state, setState] = useState<State>(null);

    const getVideoData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_ONLINE_DETAIL", { episode_id: episode_id });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setState(data);
        } else {
        }
    };

    useEffect(() => {
        getVideoData();
    }, []);

    //@ts-ignore
    const setDuration = (duration: number) => setState({ ...state, duration: duration });

    const saveDuration = async () => {
        const res = await clientSideApi(
            "POST",
            "MAIN",
            "LECTURE_ONLINE_DURATION",
            { episode_id: episode_id },
            { duration: state?.duration }
        );
    };

    const initRef = useRef<boolean>(true);
    useEffect(() => {
        if (state) {
            if (initRef.current) {
                initRef.current = false;
            } else {
                saveDuration();
            }
        }
    }, [state?.duration]);
    if (!state) {
        return <div></div>;
    } else {
        // @ts-ignore
        const video_url: string = state.link.split("/").pop();

        console.log();

        const goListLink = router.asPath.split("/").slice(0, -2).join("/");
        return (
            <div className={style.container}>
                <div className={style.sub_breadcrumbs_container}>
                    <Link href={`${goListLink}`} passHref>
                        <div>
                            <Typo
                                type={"TEXT"}
                                size={"normal"}
                                color={"yellow_accent"}
                                content={"목록보기"}
                                className={style.breadcrumb_item}
                            />
                        </div>
                    </Link>
                    &nbsp;
                    <Typo type={"TEXT"} size={"normal"} content={">"} />
                    &nbsp;
                    <div>
                        <Typo type={"TEXT"} size={"normal"} content={`${episode_id} 주차`} />
                    </div>
                </div>

                <div className={style.table}>
                    <TableWrapper>
                        <TableRow title={"4주차"} studentName={"4강, 5강"} />
                    </TableWrapper>
                </div>

                <div className={style.video_container}>
                    <Video duration={state.duration} setDuration={setDuration} video_url={video_url} timerTick={5000} />
                </div>

                <div className={style.progress_container}>
                    <ProgressBar progress={state.duration} />
                </div>

                <div className={style.introduce_container}>
                    <Typo type={"TEXT"} size={"small"} content={state.introduce} />
                </div>
            </div>
        );
    }
};

export default VideoClass;
