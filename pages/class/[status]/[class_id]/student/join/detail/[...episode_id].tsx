import Typo from "@ui/Typo";
import VideoClass from "components/organism/VideoClass/VideoClass";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useClassStore } from "store/ClassStore";

type State = {
    id: string;
    title: string;
    link: string;
    introduce: string;
    duration: string;
};

type Props = {};

const JoinDetail = () => {
    const router = useRouter();
    const { episode_id } = router.query;

    const { auth, clientSideApi } = useAuthStore();
    const classState = useClassStore();
    const classInfo = useClassDetailStore();
    const [state, setState] = useState<State | null>(null);

    const getVideoData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_ONLINE_DETAIL", { episode_id: episode_id });
        if (res.result === "SUCCESS") {
        } else {
        }
        setState({
            id: "1",
            title: "title",
            link: "https://youtu.be/keExg7xjO3o",
            introduce: "ㄴㅇ라ㅣㄴㅇ러ㅣㅏㄴㅇ러니ㅏㅇ러니ㅏㅇ러나이",
            duration: "71.6",
        });
    };

    useEffect(() => {
        const secondDepthTitle = auth?.role === "ROLE_TUTOR" ? "현재 진행 강의" : "현재 수강 강의";
        classState.dispatch({
            type: "SET_CLASS_INFO",
            data: {
                breadCrumbList: [
                    { name: "강의실 메인", link: "/class" },
                    { name: secondDepthTitle, link: "/class/open" },
                    {
                        name: classInfo.class_title,
                        link: `/class/${classInfo.class_status}/${classInfo.class_id}/board`,
                    },
                    { name: "강의참여", link: `/class/${classInfo.class_status}/${classInfo.class_id}/join` },
                    { name: "영상보기", link: "" },
                ],
                pageTitle: "",
            },
        });
        getVideoData();
    }, []);
    return (
        <div>
            {state && (
                <>
                    <VideoClass video_url={state.link} start={state.duration} />
                    <div>{state.introduce}</div>
                </>
            )}
        </div>
    );
};
export async function getServerSideProps(ctx) {
    const { role } = cookies(ctx);

    return {
        props: {},
    };
}

// http://localhost:3000/class/open/1/student/join/detail/1
export default JoinDetail;
