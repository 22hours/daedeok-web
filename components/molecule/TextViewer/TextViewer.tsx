import { useEffect, useRef } from "react";
import WindowController from "lib/client/windowController";
import "react-quill/dist/quill.snow.css";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    var width = WindowController.getWindowSize();
    return (
        <div className={`quill`}>
            <div className={"ql-container"}>
                <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: props.content }}></div>
            </div>
        </div>
    );
};

export default TextViewer;
