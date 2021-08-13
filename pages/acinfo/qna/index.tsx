import PageHeader from "@ui/PageHeader";
import QnaList from "components/organism/QnaList/QnaList";
import React, { useState, useEffect } from "react";
import { ListCommonProvider } from "store/ListCommonStore";
type Props = {};

const QNAHome = () => {
    return (
        <>
            <PageHeader title={"질문과 답변"} />
            <ListCommonProvider>
                <QnaList />
            </ListCommonProvider>
        </>
    );
};

export default QNAHome;
