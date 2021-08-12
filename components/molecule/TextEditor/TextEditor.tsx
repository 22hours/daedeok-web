import style from "./TextEditor.module.scss";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { RefObject } from "react";

type Props = {
    editorRef: RefObject<Editor>;
    initialValue: string;
    uploadDummyImage: (blob: Blob | File) => Promise<any>;
};

const TextEditor = (props: Props) => {
    return (
        <>
            <Editor
                ref={props.editorRef}
                initialValue={props.initialValue}
                previewStyle="vertical"
                height={"600px"}
                initialEditType={"wysiwyg"}
                hideModeSwitch={true}
                useCommandShortcut={true}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                        const upload = await props.uploadDummyImage(blob);
                        callback(upload, "alt text");
                        return false;
                    },
                }}
            />
        </>
    );
};

export default TextEditor;
