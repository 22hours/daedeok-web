import { useEffect, useState } from "react";
import WindowController from "lib/client/windowController";
import "react-quill/dist/quill.snow.css";
import style from "./TextViewer.module.scss";
import Typo from "@ui/Typo";

type Props = {
    content: string;
};

const TextViewer = (props: Props) => {
    let dummy = true;
    return (
        <>
            <div className={`quill`}>
                <div className={"ql-container"}>
                    <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: props.content }}></div>
                </div>
            </div>
            {dummy ? (
                <div className={style.file_download_box}>
                    <Typo type="TEXT" content="첨부파일" size="small" />
                </div>
            ) : (
                <div className={style.empty_box}></div>
            )}
        </>
    );
};

export default TextViewer;
