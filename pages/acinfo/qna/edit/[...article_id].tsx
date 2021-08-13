import React, { useState, useEffect } from "react";
import PageHeader from "@ui/PageHeader";
import dynamic from "next/dynamic";

type Props = {};
const QnaEditor = dynamic(() => import("components/organism/QnaEditor/QnaEditor"), { ssr: false });

const QNADetail = () => {
    return (
        <>
            <PageHeader title={"질문과 답변"} />
            <QnaEditor type={"EDIT"} />
        </>
    );
};

export default QNADetail;
