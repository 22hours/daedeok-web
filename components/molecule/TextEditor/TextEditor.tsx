import style from "./TextEditor.module.scss";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { RefObject } from "react";
import WindowController from "lib/client/windowController";

type Props = {
    editorRef: RefObject<Editor>;
    initialValue: string;
    uploadDummyImage: (blob: Blob | File) => Promise<any>;
    onLoad?: any;
};

const TextEditor = (props: Props) => {
    var width = WindowController.getWindowSize();

    const handleOnLoad = () => {
        if (props.onLoad) {
            props.onLoad();
        }
    };
    return (
        <div style={{ width: width - 50 }}>
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
                        callback(upload, "toasteditorimagee");
                        return false;
                    },
                }}
                events={{
                    load: handleOnLoad,
                }}
            />
        </div>
    );
};

export default TextEditor;
