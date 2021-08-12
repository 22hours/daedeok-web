import { WysiwygEditorProvider } from "store/WysiwygEditorStore";
import dynamic from "next/dynamic";

const ClassBoardEditor = dynamic(() => import("components/organism/ClassBoardEditor/ClassBoardEditor"), { ssr: false });

type Props = {};

const NewBoard = () => {
    return (
        <WysiwygEditorProvider>
            <ClassBoardEditor type={"NEW"} />
        </WysiwygEditorProvider>
    );
};

export default NewBoard;
