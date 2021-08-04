import React, { useCallback, useEffect, useState } from "react";
import style from "./ClassEditor.module.scss";
import { class_types } from "@global_types";

import { nanoid } from "nanoid";
import Typo from "@ui/Typo";
import Icon from "@ui/Icon";
import FileInput from "@ui/input/FileInput";
import useFileInput from "lib/hooks/useFileInput";
import Button from "@ui/buttons/Button";
import ClassRow from "./items/ClassRow";
import { useAuthStore } from "store/AuthStore";

type HandoutProps = {
    value: class_types.ClassInfo["handout_list"];
    addHandoutItem: (item: class_types.Handout) => void;
    removeHandoutItem: (idx: number) => void;
};
const HandoutInput = (props: HandoutProps) => {
    const localHandout = useFileInput();
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
            props.addHandoutItem({ name: fileName, url: res_rul });
        } else {
            alert(url_res.msg);
        }
    };

    useEffect(() => {
        if (localHandout.value) {
            const curSelectedFile: File = localHandout.value;
            setNewHandout(curSelectedFile);
        }
    }, [localHandout.value]);
    return (
        <div className={style.HandoutInput}>
            <ClassRow labelName={"수업 자료"}>
                <>
                    <FileInput
                        {...localHandout}
                        //@ts-ignore
                        accept={"image/*,.hwp,.word,.docx,.pptx,.show"}
                        className={style.file_input_button}
                    >
                        <Button
                            type={"SQUARE"}
                            size={"smaller"}
                            fontSize={"smaller"}
                            line={"inline"}
                            backgroundColor={"brown_base"}
                            color={"white"}
                            alignment={"center"}
                            content={"찾아보기"}
                        />
                    </FileInput>
                    <div className={style.handout_item_list}>
                        {props.value.map((it, idx) => (
                            <HandoutItem
                                key={`handoutitem::${nanoid()}`}
                                {...it}
                                idx={idx}
                                removeHandoutItem={props.removeHandoutItem}
                            />
                        ))}
                    </div>
                </>
            </ClassRow>
        </div>
    );
};

const HandoutItem = (
    props: class_types.Handout & {
        removeHandoutItem: (idx: number) => void;
        idx: number;
    }
) => {
    return (
        <div className={style.HandoutItem}>
            <div className={style.item_text}>
                <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.name} />
            </div>
            <div onClick={() => props.removeHandoutItem(props.idx)}>
                <Icon type={"delete"} />
            </div>
        </div>
    );
};

export default React.memo(HandoutInput);
