import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
import dynamic from "next/dynamic";
import { SecureRoute } from "lib/server/accessController";
import { useRouter } from "next/router";
import useCategory from "lib/hooks/useCategory";

const ContentEditor = dynamic(() => import("components/organism/ContentEditor/ContentEditor"), { ssr: false });

type Props = {};

const NewBoard = () => {
    const router = useRouter();
    const { status, class_id } = router.query;
    const { categoryOptionList } = useCategory("CLASS_BOARD");
    const onCreated = (location) => {
        alert("게시글 작성에 성공하였습니다");
        router.push(`/class/${status}/${class_id}/board/detail/${location}`);
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
