import PageHeader from "@ui/PageHeader";
import React, { useRef } from "react";
import Head from "next/head";
import { useEffect } from "react";

export default function Introduce() {
    const frame = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        location.replace("http://ddbaa.or.kr/about");
    }, []);

    return (
        <>
            <Head>
                <title>대덕바이블 아카데미 소개</title>
            </Head>
        </>
    );
}

Introduce.Layout = (page: any) => <>{page}</>;
