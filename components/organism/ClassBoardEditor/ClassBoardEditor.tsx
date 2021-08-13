import { useEffect } from "react";
import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import TextEditor from "components/molecule/TextEditor/TextEditor";
import useInput from "lib/hooks/useInput";
import { useRouter } from "next/router";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useEditorController } from "store/WysiwygEditorStore";
import style from "./ClassBoardEditor.module.scss";
type Props = {
    type: "NEW" | "EDIT";
    originData?: { title: string; category: string; content: string };
};

const ClassBoardEditor = (props: Props) => {
    const classDetailState = useClassDetailStore();
    const editorController = useEditorController();

    const router = useRouter();
    const { content_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const category = useInput();
    const title = useInput();

    useEffect(() => {
        if (props.type === "EDIT") {
            title.setValue(props.originData?.title);
            category.setValue(props.originData?.category);
        }
    }, [props]);

    const submit = async () => {
        if (props.type === "NEW") {
            const res = await clientSideApi(
                "POST",
                "MAIN",
                "LECTURE_BOARD_NEW",
                { lecture_id: classDetailState.class_id },
                {
                    title: title.value,
                    category: category.value,
                    content: editorController.getMarkdownContent(),
                }
            );
            if (res.result === "SUCCESS") {
                alert("게시글을 작성하였습니다");
                router.push(
                    `/class/${classDetailState.class_status}/${classDetailState.class_id}/board/detail/${res.data}`
                );
            } else {
                alert(res.msg);
            }
        } else {
            // EDIT

            const res = await clientSideApi(
                "PUT",
                "MAIN",
                "LECTURE_BOARD_EDIT",
                { content_id: content_id },
                {
                    title: title.value,
                    category: category.value,
                    content: editorController.getMarkdownContent(),
                }
            );
            if (res.result === "SUCCESS") {
                alert("게시글을 수정하였습니다");
                const { new_item_list, deleted_item_list } = editorController.getUpdatedImgList();
                clientSideApi("PUT", "MAIN", "UPDATE_FILE", undefined, {
                    new_file_list: new_item_list,
                    delete_file_list: deleted_item_list,
                });
                router.replace(
                    `/class/${classDetailState.class_status}/${classDetailState.class_id}/board/detail/${content_id}`
                );
            } else {
                alert(res.msg);
            }
        }
    };

    const handleGoBack = () => {
        router.push(`/class/open/${classDetailState.class_id}/board`);
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                <ClassCategorySelect
                    className={style.category_select}
                    form={"underline"}
                    category={category.value}
                    changeCategory={category.setValue}
                />
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
                    onClick={handleGoBack}
                />
                <Button
                    className={`${style.submit_btn} ${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={props.type === "NEW" ? "작성완료" : "수정완료"}
                    onClick={submit}
                />
            </div>
        </div>
    );
};

export default ClassBoardEditor;
