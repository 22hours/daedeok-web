import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { SecureRoute } from "lib/server/accessController";
import { useConfirm } from "store/GlobalConfirmStore";
import PageHeader from "@ui/PageHeader";

type State = {
    title: string;
    content: string;
    attachment_list: { url: string; name: string }[];
};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NoticeEdit = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);
    const { confirmOn } = useConfirm();

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FAQ_EDIT", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
                attachment_list: res.data.attachment_list,
            });
        } else {
            alert(res.msg);
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
            onSuccess: () => router.push(`/acinfo/faq/detail/${article_id}`),
            isFailButtonRemove: true,
        });
    };

    if (originData === null) {
        return <div>NOW LOADING FAQ EDITOR</div>;
    } else {
        return (
            <div>
                <PageHeader title={"자주묻는 질문"} />
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "FAQ_EDIT",
                        url_query: { article_id: article_id },
                    }}
                    onEdited={handleEdited}
                    imgPath={"FAQ"}
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NoticeEdit;
