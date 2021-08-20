import React, { useState, useEffect } from "react";
import { ListCommonProvider } from "store/ListCommonStore";
import PageHeader from "@ui/PageHeader";
import GuideList from "components/molecule/GuideList/GuideList";

const GuideHome = () => {
    return (
        <div>
            <PageHeader title={"아카데미 사용법"} />
            <ListCommonProvider>
                <GuideList />
            </ListCommonProvider>
        </div>
    );
};

export default GuideHome;
