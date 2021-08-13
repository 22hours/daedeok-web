import TutorClassBoardList from "components/organism/TutorClassBoardList/TutorClassBoardList";
import { SecureRoute } from "lib/server/accessController";
import { ListCommonProvider } from "store/ListCommonStore";

const index = () => {
    return (
        <div>
            <ListCommonProvider>
                <TutorClassBoardList />
            </ListCommonProvider>
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default index;
