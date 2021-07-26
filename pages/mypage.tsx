import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Mypage = () => {
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <h2>Mypage</h2>
        </GlobalLayout>
    );
};

Mypage.Layout = (page: any) => <>{page}</>;

export default Mypage;
