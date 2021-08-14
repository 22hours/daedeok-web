import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
type Props = {};

const QnaEditor = dynamic(() => import("components/organism/QnaEditor/QnaEditor"), { ssr: false });

const NewQNA = () => {
    return (
        <>
            <PageHeader title={"질문과 답변"} />
            <QnaEditor type={"NEW"} />
        </>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default NewQNA;
