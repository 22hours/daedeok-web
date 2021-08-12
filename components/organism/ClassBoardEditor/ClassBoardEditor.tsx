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
};

const ClassBoardEditor = (props: Props) => {
    const classDetailState = useClassDetailStore();
    const editorController = useEditorController();

    const router = useRouter();
    const { content_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const category = useInput();
    const title = useInput();

    const getOriginData = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_BOARD_DETAIL", { content_id: content_id });
        if (res.result === "SUCCESS") {
            title.setValue(res.data.title);
            category.setValue(res.data.category);
            editorController.setMarkdownContent(res.data.content);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (props.type === "EDIT") {
            getOriginData();
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
            const { new_item_list, deleted_item_list } = editorController.getUpdatedImgList();

            console.log({
                new_item_list,
                deleted_item_list,
            });
        }
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
                    initialValue={""}
                    uploadDummyImage={editorController.uploadDummyImage}
                />
            </div>
            <div className={style.footer}>
                <Button
                    className={`${style.cancel_btn} ${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"취소"}
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
