import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
import dynamic from "next/dynamic";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import useCategory from "lib/hooks/useCategory";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

type Props = {};

const NewBoard = () => {
    const router = useRouter();
    const { confirmOn } = useConfirm();
    const { status, class_id } = router.query;
    const { categoryOptionList } = useCategory("CLASS_BOARD");
    const onCreated = (location) => {
        confirmOn({
            message: "게시글을 작성하였습니다\n확인을 클릭하면 해당 게시글로 이동합니다",
            onSuccess: () => router.push(`/class/${status}/${class_id}/board/detail/${location}`),
            isFailButtonRemove: true,
        });
    };
    return (
        <ContentEditor
            type={"NEW"}
            submitApiConfig={{
                method: "POST",
                domain: "MAIN",
                ep: "LECTURE_BOARD_NEW",
                url_query: { lecture_id: class_id },
            }}
            onCreated={onCreated}
            isCategory
            categoryOption={categoryOptionList}
        />
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default NewBoard;
