/* eslint-disable @next/next/no-sync-scripts */
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@winterlood/quill-image-resize-module-react";
import { useAuthStore } from "store/AuthStore";
import { useEditorController } from "store/WysiwygEditorStore";
import style from "./QuillEditor.module.scss";

type Props = {
    editorRef: React.MutableRefObject<ReactQuill>;
    content: string;
    setContent: (str: string) => void;
    initialValue: string;
    uploadDummyImage: (blob: Blob | File) => Promise<any>;
};

const QuillEditor = (props: Props) => {
    const { clientSideApi } = useAuthStore();
    const { uploadDummyImage } = useEditorController();
    const formats = [
        //'font',
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
        "width",
        "class",
        "style",
        "float",
        "margin",
    ];
    var Parchment = Quill.import("parchment");

    Quill.register("modules/ImageResize", ImageResize);
    Quill.register(
        new Parchment.Attributor.Style("display", "display", {
            whitelist: ["inline"],
        })
    );
    Quill.register(
        new Parchment.Attributor.Style("float", "float", {
            whitelist: ["left", "right", "center"],
        })
    );
    Quill.register(new Parchment.Attributor.Style("margin", "margin", {}));
    //@ts-ignore
    window.Quill = Quill;
    const modules = useMemo(
        () => ({
            ImageResize: {
                parchment: Quill.import("parchment"),
                displayStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                },
                modules: ["Resize", "DisplaySize"],
            },

            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                    ["link", "image"],
                    [{ align: [] }, { color: [] }, { background: [] }],
                ],
                handlers: {
                    image: uploadDummyImage,
                },
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );
    return (
        <ReactQuill
            ref={(element) => {
                if (element !== null) {
                    props.editorRef.current = element;
                }
            }}
            className={style.container}
            style={{ height: "600px" }}
            theme="snow"
            modules={modules}
            formats={formats}
            value={props.content || ""}
            onChange={(content, delta, source, editor) => {
                props.setContent(editor.getHTML().toString());
            }}
        />
    );
};

export default QuillEditor;
