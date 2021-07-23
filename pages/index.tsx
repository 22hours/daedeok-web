import GlobalLayout from "components/layout/GlobalLayout";

import React from "react";
import Test from "components/test";

// HOME
export default function Home() {
    return (
        <div className="container">
            <div>
                <Test />
            </div>
        </div>
    );
}
Home.Layout = (page: any) => <GlobalLayout>{page}</GlobalLayout>;
