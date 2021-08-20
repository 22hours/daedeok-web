import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import useCategory from "lib/hooks/useCategory";
import { useRouter } from "next/router";
import { useConfirm } from "store/GlobalConfirmStore";
type Props = {};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });
const NewQNA = () => {
    const router = useRouter();
    const { categoryOptionList } = useCategory("QNA");
    const { confirmOn } = useConfirm();
    const onCreated = (location) => {
        confirmOn({
            message: "게시글을 작성하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/acinfo/qna/detail/${location}`),
            isFailButtonRemove: true,
        });
    };
    return (
        <>
            <PageHeader title={"질문과 답변"} />
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "QNA_NEW",
                }}
                onCreated={onCreated}
                isCategory
                isSecret
                categoryOption={categoryOptionList}
            />
        </>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default NewQNA;
