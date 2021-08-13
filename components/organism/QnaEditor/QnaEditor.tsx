import { useEffect, useState } from "react";
import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import ClassCategorySelect from "components/molecule/ClassCategorySelect/ClassCategorySelect";
import TextEditor from "components/molecule/TextEditor/TextEditor";
import useInput from "lib/hooks/useInput";
import { useRouter } from "next/router";
import { useAuthStore } from "store/AuthStore";
import { useEditorController, WysiwygEditorProvider } from "store/WysiwygEditorStore";
import style from "./QnaEditor.module.scss";
import Select from "@ui/input/Select";
import useBoolean from "lib/hooks/useBoolean";
import CheckBox from "@ui/input/CheckBox";

type ControllerProps = {
    type: "NEW" | "EDIT";
    originData?: { title: string; category: string; content: string };
};
const QnaEditorContorller = (props: ControllerProps) => {
    const editorController = useEditorController();

    const router = useRouter();
    const { article_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const category = useInput();
    const title = useInput();
    const secret = useBoolean();

    useEffect(() => {
        if (props.type === "EDIT") {
            title.setValue(props.originData?.title);
            category.setValue(props.originData?.category);
        }
    }, [props]);

    const submit = async () => {
        if (props.type === "NEW") {
            const res = await clientSideApi("POST", "MAIN", "QNA_NEW", undefined, {
                title: title.value,
                category: category.value,
                secret: secret.value,
                content: editorController.getMarkdownContent(),
            });
            if (res.result === "SUCCESS") {
                alert("게시글을 작성하였습니다");
                router.push(`/acinfo/qna/deatil/${res.data}`);
            } else {
                alert(res.msg);
            }
        } else {
            // EDIT
            const res = await clientSideApi(
                "PUT",
                "MAIN",
                "QNA_EDIT",
                { article_id: article_id },
                {
                    title: title.value,
                    category: category.value,
                    secret: secret.value,
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
                router.push(`/acinfo/qna/deatil/${article_id}`);
            } else {
                alert(res.msg);
            }
        }
    };

    const handleGoBack = () => {
        // router.push(`/class/open/${classDetailState.class_id}/board`);
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                <Select
                    className={style.category_select}
                    value={category.value || "ALL"}
                    onChange={(e) => {
                        category.setValue(e.target.value);
                    }}
                    form="underline"
                    placeholder={"카테고리별"}
                    option_list={[{ name: "전체", value: "ALL" }].concat([])}
                />

                <TextInput
                    className={style.title_input}
                    placeholder={"제목을 입력하세요"}
                    type={"text"}
                    {...title}
                    form={"underline"}
                />

                <CheckBox className={style.check_input} labelContent={"비밀 글"} {...secret} isLabelRight />
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
type Props = {
    type: "NEW" | "EDIT";
};
type State = { title: string; category: string; content: string };
const QnaEditor = (props: Props) => {
    const router = useRouter();
    const { article_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const [originData, setOriginData] = useState<State | null>(null);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "QNA_FIND_DETAIL", { article_id: article_id });
        if (res.result === "SUCCESS") {
            setOriginData({ title: res.data.title, category: res.data.category, content: res.data.content });
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        if (props.type === "EDIT") {
            getData();
        }
    }, [props]);

    return (
        <WysiwygEditorProvider>
            <QnaEditorContorller {...props} originData={originData !== null ? originData : undefined} />
        </WysiwygEditorProvider>
    );
};

export default QnaEditor;
