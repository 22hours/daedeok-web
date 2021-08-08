import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";

import MypageGroup from "components/organism/MypageGroup/MypageGroup";
import { SecureRoute } from "lib/server/accessController";
import AxiosClient from "lib/api/api";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Mypage = (props) => {
    console.log(props);
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <MypageGroup />
        </GlobalLayout>
    );
};

Mypage.Layout = (page: any) => <>{page}</>;

export async function getServerSideProps(ctx) {
    const getData = async () => {
        const res = await AxiosClient.serverSideApi("GET", "MAIN", "FIND_DIVISION");
        return res.data;
    };
    return SecureRoute(ctx, "ROLE_ALL", getData);
}

export default Mypage;
