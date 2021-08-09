import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

type Props = {
    content: string;
};

const TextViwer = (props: Props) => {
    const viewerRef = useRef(null);
    useEffect(() => {
        if (props.content) {
            if (viewerRef.current) {
                //@ts-ignore
                viewerRef.current.getInstance().setMarkdown(props.content);
            }
        }
    }, [props]);
    return <Viewer ref={viewerRef} />;
};

export default TextViwer;
