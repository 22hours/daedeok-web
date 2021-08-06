import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAgent from "lib/hooks/useAgent";
import RegisterTest from "components/organism/RegisterTest";
import RegisterFormGroup from "components/organism/RegisterFormGroup/RegisterFormGroup";

type Props = {};

const GlobalLayout = dynamic(import("components/layout/GlobalLayout"));

const Register = () => {
    const agent = useAgent();

    return (
        <GlobalLayout isBannerHide={true} isMenuHide={agent === "mobile"}>
            <RegisterFormGroup />
        </GlobalLayout>
    );
};

Register.Layout = (page: any) => <>{page}</>;

export default Register;
