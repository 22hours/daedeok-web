import dynamic from "next/dynamic";

const IndexPopup = dynamic(() => import("components/organism/IndexPopup/IndexPopup"), { ssr: false });
const IndexPage = dynamic(() => import("components/organism/IndexPage/IndexPage"), { ssr: false });
import React from "react";

// HOME
export default function Home() {
    return (
        <IndexPopup>
            <IndexPage />
        </IndexPopup>
    );
}

Home.Layout = (page: any) => <>{page}</>;
