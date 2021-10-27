import React, { useState, useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { SecureRoute } from "lib/server/accessController";
import useCategory from "lib/hooks/useCategory";
import { useConfirm } from "store/GlobalConfirmStore";
import { useAlert } from "store/GlobalAlertStore";
const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

type State = {
    title: string;
    content: string;
    secret: boolean;
    category: string;
    attachment_list: { url: string; name: string }[];
};

const QnaEdit = () => {
    const router = useRouter();
    const { article_id } = router.query;
    const { auth, clientSideApi } = useAuthStore();
    const [originData, setOriginData] = useState<State | null>(null);
    const { categoryOptionList } = useCategory("QNA");
    const { confirmOn } = useConfirm();
    const { apiErrorAlert } = useAlert();
    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "QNA_FIND_DETAIL", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                content: res.data.content,
                category: res.data.category,
                secret: res.data.secret,
                attachment_list: res.data.attachment_list,
            });
        } else {
            apiErrorAlert(res.msg);
        }
    };

    const handleEdit = () => {
        confirmOn({
            message: "게시글을 수정하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/acinfo/qna/detail/${article_id}`),
            isFailButtonRemove: true,
        });
    };

    useEffect(() => {
        if (auth !== null) {
            getOriginData();
        }
    }, [auth]);
    if (originData === null) {
        return <div>NOW LOADING QNA EDITOR</div>;
    } else {
        return (
            <div>
                <ContentEditor
                    type={"EDIT"}
                    editApiConfig={{
                        method: "PUT",
                        domain: "MAIN",
                        ep: "QNA_EDIT",
                        url_query: { article_id: article_id },
                    }}
                    categoryOption={categoryOptionList}
                    onEdited={handleEdit}
                    imgPath={"QNA"}
                    isCategory
                    isSecret
                    originData={originData}
                />
            </div>
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default QnaEdit;
