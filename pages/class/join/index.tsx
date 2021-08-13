import React from "react";
import ClassJoin from "components/organism/ClassJoin/ClassJoin";
import { ClassJoinListStoreProvider } from "store/ClassJoinListStore";
import { ListCommonProvider } from "store/ListCommonStore";
import { SecureRoute } from "lib/server/accessController";

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
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default ClassJoinPage;
