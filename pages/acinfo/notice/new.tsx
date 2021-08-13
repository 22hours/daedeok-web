import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";

const NoticeEditor = dynamic(() => import("components/organism/NoticeEditor/NoticeEditor"), { ssr: false });

const NewNotice = () => {
    return (
        <>
            <PageHeader title={"공지사항"} />
            <NoticeEditor type={"NEW"} />
        </>
    );
};

export default NewNotice;
