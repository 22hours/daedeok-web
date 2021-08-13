import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
import { useAuthStore } from "store/AuthStore";
import { useRouter } from "next/router";
import { SecureRoute } from "lib/server/accessController";
type Props = {};

const ClassBoardEditor = dynamic(() => import("components/organism/ClassBoardEditor/ClassBoardEditor"), { ssr: false });

const ClassBoardEdit = () => {
    const router = useRouter();
    const { content_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const [data, setData] = useState<{ title: string; category: string; content: string } | null>(null);
    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_BOARD_DETAIL", { content_id: content_id });
        if (res.result === "SUCCESS") {
            setData({
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

    if (data === null) {
        return <div>LOAD NOW</div>;
    } else {
        return (
            <WysiwygEditorProvider>
                <ClassBoardEditor type={"EDIT"} originData={data} />
            </WysiwygEditorProvider>
        );
    }
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default ClassBoardEdit;
