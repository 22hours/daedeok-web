import style from "./TutorNoticeEditor.module.scss";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import TextInput from "@ui/input/TextInput";
import Button from "@ui/buttons/Button";
import { useAuthStore } from "store/AuthStore";
import useInput from "lib/hooks/useInput";
import { useRouter } from "next/router";
import TextEditor from "components/molecule/TextEditor/TextEditor";
import { useEditorController, WysiwygEditorProvider } from "store/WysiwygEditorStore";
type Props = {
    type: "NEW" | "EDIT";
    originData?: {
        title: string;
        content: string;
    };
};

const TutorNoticeEditorController = (props: Props) => {
    const router = useRouter();

    const editorController = useEditorController();

    const title = useInput();
    const { clientSideApi } = useAuthStore();

    // NEW
    const handleSubmit = async () => {
        const res = await clientSideApi("POST", "MAIN", "TUTOR_NOTICE_NEW", undefined, {
            title: title.value,
            content: editorController.getMarkdownContent(),
        });
        if (res.result === "SUCCESS") {
            router.push(`/class/notice/detail/${res.data}`);
        } else {
            alert(res.msg);
        }
    };

    // EDIT
    const handleEdit = async () => {
        const { notice_id } = router.query;
        const res = await clientSideApi(
            "PUT",
            "MAIN",
            "TUTOR_NOTICE_EDIT",
            { notice_id: notice_id },
            {
                title: title.value,
                content: editorController.getMarkdownContent(),
            }
        );
        if (res.result === "SUCCESS") {
            router.push(`/class/notice/detail/${notice_id}`);
        } else {
            alert(res.msg);
        }
    };

    const getMd = () => {
        console.log(editorController.getMarkdownContent());
    };

    useEffect(() => {
        if (props.type === "EDIT" && props.originData) {
            title.setValue(props.originData.title);
        }
    }, [props]);

    return (
        <div className={style.container}>
            <div className={style.head}>
                <TextInput {...title} form={"underline"} type={"text"} placeholder={"제목을 적어주세요"} />
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
                    type={"SQUARE"}
                    size={"free"}
                    fontSize={"smaller"}
                    content={"취소"}
                    className={`${style.footer_btn} ${style.cancle_btn}`}
                    onClick={() => router.back()}
                />
                <Button
                    type={"SQUARE"}
                    size={"free"}
                    fontSize={"smaller"}
                    backgroundColor={"yellow_accent"}
                    content={props.type === "NEW" ? "작성완료" : "수정완료"}
                    color={"white"}
                    className={`${style.footer_btn} ${style.submit_btn}`}
                    onClick={props.type === "NEW" ? handleSubmit : handleEdit}
                />
            </div>
        </div>
    );
};

const TutorNoticeEditor = (props: Props) => {
    return (
        <WysiwygEditorProvider>
            <TutorNoticeEditorController {...props} />
        </WysiwygEditorProvider>
    );
};

export default TutorNoticeEditor;
