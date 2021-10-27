import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import { SecureRoute } from "lib/server/accessController";
import useCategory from "lib/hooks/useCategory";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
type Props = {};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const ClassBoardEdit = () => {
    const router = useRouter();
    const { confirmOn } = useConfirm();

    const { content_id, class_id, status } = router.query;
    const { clientSideApi } = useAuthStore();
    const { alertOn, apiErrorAlert } = useAlert();
    const { categoryOptionList } = useCategory("CLASS_BOARD");
    const [originData, setOriginData] = useState<{
        title: string;
        category: string;
        content: string;
        attachment_list: { url: string; name: string }[];
    } | null>(null);
    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_BOARD_DETAIL", { content_id: content_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                category: res.data.category,
                content: res.data.content,
                attachment_list: res.data.attachment_list,
            });
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        getOriginData();
    }, []);

    const handleEdited = () => {
        confirmOn({
            message: "게시글을 수정하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.replace(`/class/${status}/${class_id}/board/detail/${content_id}`),
            isFailButtonRemove: true,
        });
    };

    if (originData === null) {
        return <div>LOAD NOW</div>;
    } else {
        return (
            <ContentEditor
                type={"EDIT"}
                editApiConfig={{
                    method: "PUT",
                    domain: "MAIN",
                    ep: "LECTURE_BOARD_EDIT",
                    url_query: { content_id: content_id },
                }}
                isCategory
                categoryOption={categoryOptionList}
                onEdited={handleEdited}
                imgPath={"LECTURE_BOARD"}
                originData={originData}
            />
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default ClassBoardEdit;
