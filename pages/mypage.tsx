import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";

import MypageGroup from "components/organism/MypageGroup/MypageGroup";
import { SecureRoute } from "lib/server/accessController";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Mypage = (props) => {
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <MypageGroup />
        </GlobalLayout>
    );
};

Mypage.Layout = (page: any) => <>{page}</>;

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Mypage;
