import GlobalLayout from "components/layout/GlobalLayout";

import React from "react";

// HOME
export default function Home() {
    return (
        <div className="container">
            <div></div>
        </div>
    );
}
Home.Layout = (page: any) => <GlobalLayout>{page}</GlobalLayout>;
