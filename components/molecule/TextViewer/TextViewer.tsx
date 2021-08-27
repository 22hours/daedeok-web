import style from "./TextViewer.module.scss";
import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import WindowController from "lib/client/windowController";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    var width = WindowController.getWindowSize();
    console.log(props);
    const viewerRef = useRef(null);
    useEffect(() => {
        if (props.content) {
            if (viewerRef.current) {
                let replaceContent = props.content.replace(/<br\s*\/?>/gm, "");
                let rereplace = replaceContent.replace(/\n/g, "<br/>");
                //@ts-ignore
                viewerRef.current.getInstance().setMarkdown(rereplace);
            }
        }
    }, [props]);
    return (
        <div style={{ maxWidth: width - 50 }} className={style.container}>
            <Viewer initialValue={props.content} />
        </div>
    );
};

export default TextViewer;
