import ClassBoardList from "components/organism/ClassBoardList/ClassBoardList";
import { SecureRoute } from "lib/server/accessController";
import { ListCommonProvider } from "store/ListCommonStore";

const index = () => {
    return (
        <div>
            <ListCommonProvider>
                <ClassBoardList />
            </ListCommonProvider>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default index;
