import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Eduvision() {
    useEffect(() => {
        location.replace("http://ddbaa.or.kr/vision");
    }, []);

    return (
        <>
            <Head>
                <title>교육비전</title>
            </Head>
        </>
    );
}

Eduvision.Layout = (page: any) => <>{page}</>;
