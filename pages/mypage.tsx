import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";

import MypageGroup from "components/organism/MypageGroup/MypageGroup";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Mypage = () => {
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <MypageGroup />
        </GlobalLayout>
    );
};

Mypage.Layout = (page: any) => <>{page}</>;

export default Mypage;
