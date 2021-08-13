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
    originData?: { title: string; category: string; content: string; secret: boolean };
};
const QnaEditorContorller = (props: ControllerProps) => {
    const editorController = useEditorController();
    const [categoryData, setCategoryData] = useState<Array<{ name: string; value: string }>>([]);

    const router = useRouter();
    const { article_id } = router.query;
    const { clientSideApi } = useAuthStore();

    const category = useInput();
    const title = useInput();
    const secret = useBoolean();

    useEffect(() => {
        if (props.type === "EDIT") {
            console.log(props);
            title.setValue(props.originData?.title);
            category.setValue(props.originData?.category);
            secret.setValue(props.originData?.secret);
        }
    }, [props]);

    // NEW
    const handleSubmit = async () => {
        const res = await clientSideApi("POST", "MAIN", "QNA_NEW", undefined, {
            title: title.value,
            category: category.value,
            secret: secret.value,
            content: editorController.getMarkdownContent(),
        });
        if (res.result === "SUCCESS") {
            router.push(`/acinfo/qna/detail/${res.data}`);
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
            alert("수정되었습니다.");
            router.push(`/acinfo/qna/detail/${article_id}`);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (props.type === "EDIT" && props.originData) {
            title.setValue(props.originData.title);
        }
    }, [props]);

    const getCategoryData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CATEGORY_QNA");
        if (res.result === "SUCCESS") {
            setCategoryData(
                res.data.map((it) => {
                    return {
                        value: it.category,
                        name: it.category,
                    };
                })
            );
        }
    };

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.head}>
                <Select
                    className={style.category_select}
                    value={category.value}
                    onChange={(e) => {
                        category.setValue(e.target.value);
                    }}
                    form="underline"
                    placeholder={"카테고리별"}
                    option_list={categoryData}
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
};
type State = { title: string; category: string; content: string };
const QnaEditor = (props: Props) => {
    return (
        <WysiwygEditorProvider>
            <QnaEditorContorller {...props} />
        </WysiwygEditorProvider>
    );
};

export default QnaEditor;
