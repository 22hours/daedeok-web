import GlobalLayout from "components/layout/GlobalLayout";
import IndexPage from "components/organism/IndexPage/IndexPage";

import React from "react";

// HOME
export default function Home() {
    return <IndexPage />;
}
Home.Layout = (page: any) => (
    <GlobalLayout isBannerHide isIndex>
        {page}
    </GlobalLayout>
);
