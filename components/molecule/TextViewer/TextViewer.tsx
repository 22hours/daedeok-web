import { useEffect, useState } from "react";
import WindowController from "lib/client/windowController";
import "react-quill/dist/quill.snow.css";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        console.log(width);
        if (width > 420) {
            setMode("pc");
        } else {
            setMode("mobile");
        }
    };

    useEffect(() => {
        setModeByWindowSize();
        window.addEventListener("resize", setModeByWindowSize);
        return () => {
            window.removeEventListener("resize", setModeByWindowSize);
        };
    }, []);

    return (
        <div className={`quill`}>
            <div className={"ql-container"}>
                {mode === "pc" ? (
                    <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: props.content }}></div>
                ) : (
                    <div className="ql-mobile-editor">
                        <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: props.content }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextViewer;
