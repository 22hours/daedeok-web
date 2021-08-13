import { useEffect, useState } from "react";
import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import TextEditor from "components/molecule/TextEditor/TextEditor";
import useInput from "lib/hooks/useInput";
import { useRouter } from "next/router";
import { useAuthStore } from "store/AuthStore";
import { useEditorController, WysiwygEditorProvider } from "store/WysiwygEditorStore";
import style from "./FaqEditor.module.scss";
import useBoolean from "lib/hooks/useBoolean";

type ControllerProps = {
    type: "NEW" | "EDIT";
    originData?: { title: string; content: string };
};
const FaqEditorContorller = (props: ControllerProps) => {
    const editorController = useEditorController();

    const router = useRouter();
    const { article_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const title = useInput();

    // NEW
    const handleSubmit = async () => {
        const res = await clientSideApi("POST", "MAIN", "FAQ_NEW", undefined, {
            title: title.value,
            content: editorController.getMarkdownContent(),
        });
        if (res.result === "SUCCESS") {
            router.push(`/acinfo/faq/detail/${res.data}`);
        } else {
            alert(res.msg);
        }
    };

    // EDIT
    const handleEdit = async () => {
        const { article_id } = router.query;
        const res = await clientSideApi(
            "PUT",
            "MAIN",
            "FAQ_EDIT",
            { article_id: article_id },
            {
                title: title.value,
                content: editorController.getMarkdownContent(),
            }
        );
        if (res.result === "SUCCESS") {
            alert("수정되었습니다.");
            router.push(`/acinfo/faq/detail/${article_id}`);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (props.type === "EDIT" && props.originData) {
            title.setValue(props.originData.title);
        }
    }, [props]);

    return (
        <div className={style.container}>
            <div className={style.head}>
                <TextInput
                    className={style.title_input}
                    placeholder={"제목을 입력하세요"}
                    type={"text"}
                    {...title}
                    form={"underline"}
                />
            </div>
            <div className={style.body}>
                <TextEditor
                    editorRef={editorController.editorRef}
                    initialValue={props.originData?.content || ""}
                    uploadDummyImage={editorController.uploadDummyImage}
                    onLoad={editorController.onLoadEditor}
                />
            </div>
            <div className={style.footer}>
                <Button
                    className={`${style.cancel_btn} ${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"취소"}
                    onClick={() => router.back()}
                />
                <Button
                    className={`${style.submit_btn} ${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={props.type === "NEW" ? "작성완료" : "수정완료"}
                    onClick={props.type === "NEW" ? handleSubmit : handleEdit}
                />
            </div>
        </div>
    );
};
type Props = {
    type: "NEW" | "EDIT";
    originData?: any;
};
type State = { title: string; content: string };
const FaqEditor = (props: Props) => {
    return (
        <WysiwygEditorProvider>
            <FaqEditorContorller {...props} />
        </WysiwygEditorProvider>
    );
};

export default FaqEditor;
