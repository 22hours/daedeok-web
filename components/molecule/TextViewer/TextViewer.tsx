import { useEffect, useState } from "react";
import WindowController from "lib/client/windowController";
import "react-quill/dist/quill.snow.css";
import style from "./TextViewer.module.scss";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";

type Props = {
    content: string;
    attachment?: { url: string; name: string }[];
};

const AttachmentItem = (props: { url: string; name: string }) => {
    return (
        <div className={style.attachment_item}>
            <Typo type={"TEXT"} size={"small"} content={props.name} className={style.attach_name} />
            <a href={props.url} target="_blank" rel="noreferrer">
                <Button
                    type={"SQUARE"}
                    size={"free"}
                    fontSize={"smaller"}
                    content={"다운로드"}
                    backgroundColor={"brown_base"}
                    color={"white"}
                />
            </a>
        </div>
    );
};

const TextViewer = (props: Props) => {
    return (
        <>
            <div className={`quill`}>
                <div className={"ql-container"}>
                    <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: props.content }}></div>
                </div>
            </div>
            {props.attachment?.length !== 0 && props?.attachment ? (
                <div className={style.file_download_box}>
                    <Typo type="TEXT" content="첨부파일" size="small" className={style.text_style} />
                    <div className={style.file_download_list}>
                        {props.attachment?.map((it: { url: string; name: string }, idx: number) => (
                            <AttachmentItem key={`attachmentItem:${idx}`} {...it} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={style.empty_box}></div>
            )}
        </>
    );
};

export default TextViewer;
