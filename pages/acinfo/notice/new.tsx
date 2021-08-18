import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageHeader from "@ui/PageHeader";
import { useAlert } from "store/GlobalAlertStore";
const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NewNotice = () => {
    const router = useRouter();
    const { alertOn, apiErrorAlert } = useAlert();
    const onCreated = (article_id) => {
        alertOn({
            title: "",
            //@ts-ignore
            message: "게시글을 작성하였습니다",
            type: "POSITIVE",
        });
        router.push(`/acinfo/notice/detail/${article_id}`);
    };
    return (
        <>
            <PageHeader title={"공지사항"} />
            <ContentEditor
                type={"NEW"}
                submitApiConfig={{
                    method: "POST",
                    domain: "MAIN",
                    ep: "TOTAL_NOTICE_NEW",
                }}
                onCreated={onCreated}
            />
        </>
    );
};

export default NewNotice;
