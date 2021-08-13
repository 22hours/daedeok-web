import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";
import LoginGroup from "components/organism/LoginGroup/LoginGroup";
import PageHeader from "@ui/PageHeader";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Login = () => {
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <PageHeader title={"LOGIN"} />
            <LoginGroup />
        </GlobalLayout>
    );
};

Login.Layout = (page: any) => <>{page}</>;

export default Login;
