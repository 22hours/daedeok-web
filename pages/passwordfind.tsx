import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";
type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const PasswordFind = () => {
    const agent = useAgent();
    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <h2>PasswordFind</h2>
        </GlobalLayout>
    );
};

PasswordFind.Layout = (page: any) => <>{page}</>;

export default PasswordFind;
