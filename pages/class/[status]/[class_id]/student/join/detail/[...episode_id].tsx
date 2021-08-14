import VideoClass from "components/organism/VideoClass/VideoClass";
import { SecureRoute } from "lib/server/accessController";
import cookies from "next-cookies";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useClassStore } from "store/ClassStore";

type Props = {};

const JoinDetail = () => {
    const { auth } = useAuthStore();
    const classState = useClassStore();
    const classInfo = useClassDetailStore();
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
                    { name: "강의참여", link: `/class/${classInfo.class_status}/${classInfo.class_id}/student/join` },
                    { name: "영상보기", link: "" },
                ],
                pageTitle: "",
            },
        });
    }, []);
    return <VideoClass />;
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default JoinDetail;
