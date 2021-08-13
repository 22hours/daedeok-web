import ClassJoinDetailList from "components/organism/ClassJoinDetailList/ClassJoinDetailList";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const ClassJoinDetail = (props) => {
    return <ClassJoinDetailList classId={props.class_id} />;
};

export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_MEMBER");
}
export default ClassJoinDetail;
