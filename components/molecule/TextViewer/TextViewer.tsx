import style from "./TextViewer.module.scss";
import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import WindowController from "lib/client/windowController";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    var width = WindowController.getWindowSize();

    const viewerRef = useRef(null);
    useEffect(() => {
        if (props.content) {
            if (viewerRef.current) {
                //@ts-ignore
                viewerRef.current.getInstance().setMarkdown(props.content);
            }
        }
    }, [props]);
    return (
        <div style={{ maxWidth: width - 50 }} className={style.container}>
            <Viewer ref={viewerRef} />
        </div>
    );
};

export default TextViewer;
