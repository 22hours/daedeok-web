import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";
const FaqEditor = dynamic(() => import("components/organism/FaqEditor/FaqEditor"), { ssr: false });

const NewFaq = () => {
    return (
        <>
            <PageHeader title={"자주묻는 질문"} />
            <FaqEditor type={"NEW"} />
        </>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default NewFaq;
