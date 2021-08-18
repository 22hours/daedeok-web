import PageHeader from "@ui/PageHeader";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAlert } from "store/GlobalAlertStore";
import { useAuthStore } from "store/AuthStore";
const TextEditor = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

const eduvision = () => {
    const [state, setState] = useState<string | null>(null);
    const { alertOn } = useAlert();
    const { clientSideApi } = useAuthStore();
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ACINFO_EDUVISION");
        if (res.result === "SUCCESS") {
            setState(res.data.content);
        } else {
            alertOn({
                title: "",
                // @ts-ignore
                message: res.msg,
                type: "ERROR",
            });
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <PageHeader title={"교육비전"} />
            {state !== null && <TextEditor content={state} />}
        </div>
    );
};

export default eduvision;
