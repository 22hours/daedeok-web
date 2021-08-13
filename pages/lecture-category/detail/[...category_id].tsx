import PageHeader from "@ui/PageHeader";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
type Props = {};

const CategoryDetail = dynamic(() => import("components/organism/CategoryDetail/CategoryDetail"), { ssr: false });

const categoryDetail = () => {
    return (
        <>
            <PageHeader title={"강의 카테고리"} />
            <CategoryDetail />
        </>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {},
    };
}
export default categoryDetail;
