import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
import dynamic from "next/dynamic";
import { SecureRoute } from "lib/server/accessController";

const ClassBoardEditor = dynamic(() => import("components/organism/ClassBoardEditor/ClassBoardEditor"), { ssr: false });

type Props = {};

const NewBoard = () => {
    return (
        <WysiwygEditorProvider>
            <ClassBoardEditor type={"NEW"} />
        </WysiwygEditorProvider>
    );
};
export async function getServerSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}
export default NewBoard;
