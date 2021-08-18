import style from "./TextViewer.module.scss";
import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    const width = window.screen.width;

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
        <div style={{ width: width }} className={style.container}>
            <Viewer ref={viewerRef} />
        </div>
    );
};

export default TextViewer;
