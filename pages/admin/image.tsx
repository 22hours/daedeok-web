import PageHeader from "@ui/PageHeader";
import AdminManageImage from "components/organism/AdminManageImage/AdminManageImage";
import { SecureRoute } from "lib/server/accessController";

type Props = {};

const Image = () => {
    return (
        <div>
            <PageHeader title={"메인페이지 이미지 관리"} />
            <AdminManageImage />
        </div>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ADMIN");
}
export default Image;
