import React, { useEffect } from "react";
import useFileInput from "lib/hooks/useFileInput";
import { useAuthStore } from "store/AuthStore";
import style from "./ContentEditor.module.scss";
import Button from "@ui/buttons/Button";
import { nanoid } from "nanoid";
import Typo from "@ui/Typo";
import Icon from "@ui/Icon";
import FileInput from "@ui/input/FileInput";

type AttachmentProps = {
    value: any[];
    addAttachmentItem: (item: { name: string; url: string }) => void;
    removeAttachmentItem: (idx: number) => void;
};

const AttachmentInput = (props: AttachmentProps) => {
    const attachmentList = useFileInput();
    const { clientSideApi } = useAuthStore();

    const uploadDummy = async (file: File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file_list", file);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        return res;
    };

    const setNewHandout = async (file: File) => {
        const fileName: string = file.name;
        const url_res = await uploadDummy(file);
        if (url_res?.result === "SUCCESS") {
            const res_rul = url_res.data[0];
            props.addAttachmentItem({ name: fileName, url: res_rul });
        } else {
            alert(url_res.msg);
        }
    };

    useEffect(() => {
        if (attachmentList.value) {
            const curSelectedFile: File = attachmentList.value;
            setNewHandout(curSelectedFile);
        }
    }, [attachmentList.value]);

    // const router = useRouter();
    // const urlArr = router.asPath.split("/");
    // const contentType = urlArr[urlArr.length - 1];

    return (
        <div className={style.upload_files_box}>
            <>
                <FileInput
                    {...attachmentList}
                    //@ts-ignore
                    accept={"image/*,.hwp,.word,.docx,.pptx,.show"}
                    className={style.file_input_button}
                >
                    <Button
                        type={"SQUARE"}
                        size={"medium"}
                        fontSize={"smaller"}
                        line={"inline"}
                        backgroundColor={"brown_base"}
                        color={"white"}
                        alignment={"center"}
                        content={"파일 첨부"}
                        className={style.upload_btn}
                    />
                </FileInput>
                <div>
                    {props?.value.map((it, idx) => (
                        <AttachmentItem
                            key={`attach::${nanoid()}`}
                            {...it}
                            idx={idx}
                            removeAttachmentItem={props.removeAttachmentItem}
                        />
                    ))}
                </div>
            </>
        </div>
    );
};

const AttachmentItem = (
    props: { name: string; url: string } & {
        removeAttachmentItem: (idx: number) => void;
        idx: number;
    }
) => {
    return (
        <div className={style.attach_item_list}>
            <div className={style.item_text}>
                <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.name} />
            </div>
            <div onClick={() => props?.removeAttachmentItem(props.idx)}>
                <Icon type={"delete"} />
            </div>
        </div>
    );
};

export default AttachmentInput;
