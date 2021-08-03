import React from "react";
import ClassJoin from "components/organism/ClassJoin/ClassJoin";
import { ClassJoinListStoreProvider } from "store/ClassJoinListStore";

type Props = {};

const ClassJoinPage = () => {
    return (
        <div>
            <ClassJoinListStoreProvider>
                <ClassJoin />
            </ClassJoinListStoreProvider>
        </div>
    );
};

export default ClassJoinPage;
