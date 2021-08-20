import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

type Props = {};

type State = {
    title: string;
    content: string;
};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const TutorNoticeEdit = () => {
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();

    const router = useRouter();
    const { notice_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "TUTOR_NOTICE_FIND_DETAIL", { notice_id: notice_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
            });
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        if (auth) {
            getOriginData();
        }
    }, [auth]);
    const handleEdited = () => {
        confirmOn({
            message: "게시글을 수정하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/class/notice/detail/${notice_id}`),
            isFailButtonRemove: true,
        });
    };
    if (originData === null) {
        return <div>NOW LOADING</div>;
    } else {
        return (
            <div>
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "TUTOR_NOTICE_EDIT",
                        url_query: { notice_id: notice_id },
                    }}
                    onEdited={handleEdited}
                    imgPath={"TUTOR_NOTICE"}
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    const { notice_id } = ctx.query;
    const { role } = cookies(ctx);
    if (role === "ROLE_ADMIN") {
        return {
            redirect: {
                destination: `/admin/tutor-notice/edit/${notice_id}`,
                permanent: false,
            },
        };
    }
    return SecureRoute(ctx, "ROLE_TUTOR");
}

export default TutorNoticeEdit;
