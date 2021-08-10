import style from "./TextEditor.module.scss";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useAuthStore } from "store/AuthStore";
import { RefObject } from "react";

type Props = {
    editorRef: RefObject<Editor>;
    initialValue: string;
};

const TextEditor = (props: Props) => {
    const { clientSideApi } = useAuthStore();

    const uploadDummy = async (blob: Blob | File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file_list", blob);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        if (res.result === "SUCCESS") {
            return res.data[0];
        } else {
            alert(res.msg);
        }
    };
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
                        const upload = await uploadDummy(blob);
                        callback(upload, "alt text");
                        return false;
                    },
                }}
            />
        </>
    );
};

export default TextEditor;
