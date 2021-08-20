import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageHeader from "@ui/PageHeader";
import { useConfirm } from "store/GlobalConfirmStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

const NewNotice = () => {
    const router = useRouter();
    const { confirmOn } = useConfirm();

    const onCreated = (article_id) => {
        confirmOn({
            message: "게시글을 작성하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/acinfo/notice/detail/${article_id}`),
            isFailButtonRemove: true,
        });
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
