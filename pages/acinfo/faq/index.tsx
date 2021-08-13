import React, { useState, useEffect } from "react";
import FaqList from "components/organism/FaqList/FaqList";
import { ListCommonProvider } from "store/ListCommonStore";
import PageHeader from "@ui/PageHeader";

const FQAHome = () => {
    return (
        <div>
            <PageHeader title={"자주묻는 질문"} />
            <ListCommonProvider>
                <FaqList />
            </ListCommonProvider>
        </div>
    );
};

export default FQAHome;
