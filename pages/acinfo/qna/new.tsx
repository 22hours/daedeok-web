import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
import useCategory from "lib/hooks/useCategory";
import { useRouter } from "next/router";
import { useAlert } from "store/GlobalAlertStore";
type Props = {};

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });
const NewQNA = () => {
    const router = useRouter();
    const { categoryOptionList } = useCategory("QNA");
    const { alertOn, apiErrorAlert } = useAlert();
    const onCreated = (location) => {
        alertOn({
            title: "",
            //@ts-ignore
            message: "게시글 작성에 성공하였습니다",
            type: "POSITIVE",
        });
        router.push(`/acinfo/qna/detail/${location}`);
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
