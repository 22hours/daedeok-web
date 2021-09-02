import Button from "@ui/buttons/Button";
import TextInput from "@ui/input/TextInput";
import ListController from "lib/client/listController";
import useInput from "lib/hooks/useInput";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import { useEditorController, WysiwygEditorProvider } from "store/WysiwygEditorStore";
import QuillEditor from "../QuillEditor/QuillEditor";
import style from "./AdminCategoryEditor.module.scss";
type Props = {
    type: "NEW" | "EDIT";
    originData?: {
        category: string;
        content: string;
    };
};

const AdminCategoryController = (props: Props) => {
    const { alertOn, apiErrorAlert } = useAlert();

    const router = useRouter();

    const editorController = useEditorController();

    const category = useInput();
    const content = useInput();
    const { clientSideApi } = useAuthStore();

    // NEW
    const handleSubmit = async () => {
        const res = await clientSideApi("POST", "MAIN", "ADMIN_NEW_CATEGORY", undefined, {
            category: category.value,
            content: content.value,
        });
        if (res.result === "SUCCESS") {
            alertOn({
                message: "성공적으로 추가되었습니다",
                type: "POSITIVE",
            });
            router.push(`/admin/category/detail/${res.data}`);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    // EDIT
    const handleEdit = async () => {
        const { category_id } = router.query;
        const res = await clientSideApi(
            "PUT",
            "MAIN",
            "ADMIN_UPDATE_CATEGORY",
            { category_id: category_id },
            {
                category: category.value,
                content: content.value,
            }
        );
        if (res.result === "SUCCESS") {
            const { new_item_list, deleted_item_list } = editorController.getUpdatedImgList();
            alertOn({
                message: "성공적으로 수정되었습니다",
                type: "POSITIVE",
            });
            await clientSideApi("PUT", "MAIN", "UPDATE_FILE", undefined, {
                new_file_list: new_item_list,
                delete_file_list: deleted_item_list,
                to_path: "LECTURE_CATEGORY",
            });
            router.push(`/admin/category/detail/${category_id}`);
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        if (props.type === "EDIT" && props.originData) {
            category.setValue(props.originData.category);
            content.setValue(props.originData.content);
        }
    }, [props]);

    return (
        <div className={style.container}>
            <div className={style.head}>
                <TextInput {...category} form={"underline"} type={"text"} placeholder={"카테고리명 입력"} />
            </div>
            <div className={style.body}>
                <QuillEditor
                    editorRef={editorController.editorRef}
                    content={content.value}
                    setContent={content.setValue}
                    initialValue={props.originData?.content || ""}
                    uploadDummyImage={editorController.uploadDummyImage}
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

const AdminCategoryEditor = (props: Props) => {
    return (
        <WysiwygEditorProvider>
            <AdminCategoryController {...props} />
        </WysiwygEditorProvider>
    );
};

export default AdminCategoryEditor;
