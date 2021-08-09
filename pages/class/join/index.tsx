import React from "react";
import ClassJoin from "components/organism/ClassJoin/ClassJoin";
import { ClassJoinListStoreProvider } from "store/ClassJoinListStore";
import { ListCommonProvider } from "store/ListCommonStore";

type Props = {};

const ClassJoinPage = () => {
    return (
        <div>
            <ListCommonProvider>
                <ClassJoin />
            </ListCommonProvider>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    console.log("CLASS JOIN PAGE");
    return {
        props: {},
    };
}
export default ClassJoinPage;
