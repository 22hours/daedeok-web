import React, { useState, useEffect } from "react";
import TutorNoticeEditor from "components/organism/TutorNoticeEditor/TutorNoticeEditor";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";

type Props = {};

type State = {
    title: string;
    content: string;
};
const NoticeEdit = () => {
    const router = useRouter();
    const { notice_id } = router.query;
    const { clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND_DETAIL", { notice_id: notice_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
            });
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        getOriginData();
    }, []);
    if (!originData) {
        return <div>NOW LOADING</div>;
    } else {
        return (
            <div>
                <TutorNoticeEditor type={"EDIT"} originData={originData} />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}
export default NoticeEdit;
