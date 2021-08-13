import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
const FaqEditor = dynamic(() => import("components/organism/FaqEditor/FaqEditor"), { ssr: false });

const NewFaq = () => {
    return (
        <>
            <PageHeader title={"자주묻는 질문"} />
            <FaqEditor type={"NEW"} />
        </>
    );
};

export default NewFaq;
