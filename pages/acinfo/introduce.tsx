import PageHeader from "@ui/PageHeader";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAlert } from "store/GlobalAlertStore";
import { useAuthStore } from "store/AuthStore";

const TextEditor = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

const Introduce = () => {
    const [state, setState] = useState<string | null>(null);
    const { alertOn, apiErrorAlert } = useAlert();
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ACINFO_INTRODUCE");
        if (res.result === "SUCCESS") {
            setState(res.data.content);
        } else {
            apiErrorAlert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <PageHeader title={"대덕바이블 아카데미 소개"} />
            {state !== null && <TextEditor content={state} />}
        </div>
    );
};

export default Introduce;
