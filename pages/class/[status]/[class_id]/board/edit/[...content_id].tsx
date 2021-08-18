import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import { SecureRoute } from "lib/server/accessController";
import useCategory from "lib/hooks/useCategory";
type Props = {};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const ClassBoardEdit = () => {
    const router = useRouter();
    const { content_id, class_id, status } = router.query;
    const { clientSideApi } = useAuthStore();

    const { categoryOptionList } = useCategory("CLASS_BOARD");
    const [originData, setOriginData] = useState<{ title: string; category: string; content: string } | null>(null);
    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_BOARD_DETAIL", { content_id: content_id });
        if (res.result === "SUCCESS") {
            setOriginData({
                title: res.data.title,
                category: res.data.category,
                content: res.data.content,
            });
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        getOriginData();
    }, []);

    const handleEdited = () => {
        alert("수정되었습니다");
        router.replace(`/class/${status}/${class_id}/board/detail/${content_id}`);
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
