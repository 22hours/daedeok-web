import GlobalLayout from "components/layout/GlobalLayout";
import dynamic from "next/dynamic";

const IndexPage = dynamic(() => import("components/organism/IndexPage/IndexPage"), { ssr: false });
import React from "react";

// HOME
export default function Home() {
    return <IndexPage />;
}
// Home.Layout = (page: any) => (
//     <GlobalLayout isBannerHide isIndex>
//         {page}
//     </GlobalLayout>
// );
Home.Layout = (page: any) => <>{page}</>;
