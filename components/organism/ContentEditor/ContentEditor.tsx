import style from "./ContentEditor.module.scss";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useEditorController, WysiwygEditorProvider } from "store/WysiwygEditorStore";
import { api_config_type } from "@api_config_type";
import useInput from "lib/hooks/useInput";
import { useAuthStore } from "store/AuthStore";
import useBoolean from "lib/hooks/useBoolean";
import TextInput from "@ui/input/TextInput";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";
import Button from "@ui/buttons/Button";
import { useRouter } from "next/router";
import { useAlert } from "store/GlobalAlertStore";
import QuillEditor from "../QuillEditor/QuillEditor";
import AttachmentInput from "./AttachmentInput";

type api_params = api_config_type.api_params;

type ApiConfigType = {
    method: api_params["method"];
    domain: api_params["domain"];
    ep: api_params["ep"];
    url_query?: api_params["url_query"];
    data?: api_params["data"];
    extraHeader?: api_params["extraHeader"];
};

type NewProps = {
    type: "NEW";
    submitApiConfig: ApiConfigType;
    onCreated: (location: string) => void;
    isCategory?: boolean;
    isSecret?: boolean;
    categoryOption?: { value: string; name: string }[];
    isHeaderHide?: boolean;
};
type EditProps = {
    type: "EDIT";
    editApiConfig: ApiConfigType;
    onEdited: () => void;
    imgPath:
        | "LECTURE_CATEGORY"
        | "LECTURE_BOARD"
        | "QNA"
        | "FAQ"
        | "GLOBAL_NOTICE"
        | "TUTOR_NOTICE"
        | "AC_INFO"
        | "MAIN_IMAGE"
        | "ACINFO_INTRODUCE"
        | "ACINFO_EDUVISION";
    originData: { title: string; content: string; category?: string; secret?: boolean; attachment_list: any[] };
    isCategory?: boolean;
    isSecret?: boolean;
    categoryOption?: { value: string; name: string }[];
    isHeaderHide?: boolean;
};

type PresenterProps = {
    type: "NEW" | "EDIT";
    onSubmit: (title: string, content: string, category?: string, secret?: boolean) => void;
    originData?: { title: string; content: string; category?: string; secret?: boolean; attachment_list: any[] };
    isCategory?: boolean;
    isSecret?: boolean;
    categoryOption?: { value: string; name: string }[];
    isHeaderHide?: boolean;
};

type AttachmentState = {
    attachment_list: any[];
};

const initState: AttachmentState = {
    attachment_list: [],
};

type Action =
    | { type: "ADD_ATTACHMENT"; data: { name: string; url: string } }
    | { type: "REMOVE_ATTACHMENT"; data: number }
    | { type: "SET_ATTACHMENT"; data: { name: string; url: string }[] };

const reducer = (state: AttachmentState, action: Action) => {
    switch (action.type) {
        case "ADD_ATTACHMENT": {
            const newAttachment = state.attachment_list.slice();
            newAttachment.push(action.data);
            return {
                ...state,
                attachment_list: newAttachment,
            };
        }
        case "REMOVE_ATTACHMENT": {
            const newAttachment = state.attachment_list.slice();
            newAttachment.splice(action.data, 1);
            return {
                ...state,
                attachment_list: newAttachment,
            };
        }
        case "SET_ATTACHMENT": {
            return {
                attachment_list: action.data,
            };
        }
    }
};

const ContentEditorPresenter = (props: PresenterProps) => {
    const { alertOn } = useAlert();
    const editorController = useEditorController();
    const router = useRouter();
    const title = useInput();
    const category = useInput();
    const secret = useBoolean();
    const content = useInput();

    //파일 업로드
    const [state, dispatch] = useReducer(reducer, initState);

    const addAttachmentItem = useCallback(
        (item: { name: string; url: string }) => dispatch({ type: "ADD_ATTACHMENT", data: item }),
        [state.attachment_list]
    );
    const removeAttachmentItem = useCallback(
        (idx: number) => dispatch({ type: "REMOVE_ATTACHMENT", data: idx }),
        [state.attachment_list]
    );

    useEffect(() => {
        if (props.originData) {
            title.setValue(props.originData.title);
            category.setValue(props.originData.category);
            secret.setValue(props.originData.secret);
            content.setValue(props.originData.content);
            dispatch({ type: "SET_ATTACHMENT", data: props.originData.attachment_list });
        }
    }, [props.originData]);

    const handleOnSubmit = () => {
        if (!props.isHeaderHide) {
            if (props.isCategory && category.value === "") {
                alertOn({
                    title: "",
                    message: "카테고리를 선택해주세요",
                    type: "WARN",
                });
                return;
            }
            if (title.value.length < 5) {
                alertOn({
                    title: "",
                    message: "제목은 5자 이상으로 입력해주세요",
                    type: "WARN",
                });
                return;
            }
        }
        if (content.value.length < 5) {
            alertOn({
                title: "",
                message: "본문을 5자 이상으로 작성해주세요",
                type: "WARN",
            });
            return;
        }

        props.onSubmit(title.value, content.value, category.value, secret.value);
    };

    return (
        <div className={style.container}>
            <div className={style.head}>
                {props.isHeaderHide ? (
                    <></>
                ) : (
                    <>
                        {props.isCategory && (
                            <Select
                                className={style.category_select}
                                value={category.value}
                                onChange={(e) => {
                                    category.setValue(e.target.value);
                                }}
                                form="underline"
                                placeholder={"카테고리별"}
                                option_list={props.categoryOption || []}
                            />
                        )}
                        <TextInput
                            className={style.title_input}
                            {...title}
                            form={"underline"}
                            type={"text"}
                            placeholder={"제목을 적어주세요"}
                        />
                        {props.isSecret && (
                            <CheckBox className={style.check_input} labelContent={"비밀 글"} {...secret} isLabelRight />
                        )}
                    </>
                )}
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
            <div>
                <AttachmentInput
                    value={state.attachment_list}
                    addAttachmentItem={addAttachmentItem}
                    removeAttachmentItem={removeAttachmentItem}
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
                    onClick={handleOnSubmit}
                />
            </div>
        </div>
    );
};

const ContentCreateController = (props: NewProps) => {
    const { clientSideApi } = useAuthStore();
    const { apiErrorAlert } = useAlert();
    const handleCreate = async (title, content, category, secret) => {
        const reqOption = {
            ...props.submitApiConfig,
        };
        const res = await clientSideApi(reqOption.method, reqOption.domain, reqOption.ep, reqOption.url_query, {
            ...reqOption.data,
            title: title,
            content: content,
            category: props.isCategory ? category : undefined,
            secret: props.isSecret ? secret : undefined,
        });
        if (res.result === "SUCCESS") {
            props.onCreated(res.data);
        } else {
            apiErrorAlert(res.msg);
        }
    };
    return (
        <ContentEditorPresenter
            type={props.type}
            onSubmit={handleCreate}
            originData={undefined}
            isCategory={props.isCategory}
            isSecret={props.isSecret}
            categoryOption={props.categoryOption}
            isHeaderHide={props.isHeaderHide}
        />
    );
};

const ContentEditController = (props: EditProps) => {
    const editorController = useEditorController();
    const { clientSideApi } = useAuthStore();
    const { apiErrorAlert } = useAlert();

    const handleEdit = async (title, content, category, secret) => {
        const { deleted_item_list, new_item_list } = editorController.getUpdatedImgList();
        const reqOption = {
            ...props.editApiConfig,
        };
        const res = await clientSideApi(reqOption.method, reqOption.domain, reqOption.ep, reqOption.url_query, {
            ...reqOption.data,
            title: props.isHeaderHide ? undefined : title,
            content: content,
            category: props.isCategory ? category : undefined,
            secret: props.isSecret ? secret : undefined,
        });
        if (res.result === "SUCCESS") {
            props.onEdited();
            clientSideApi("PUT", "MAIN", "UPDATE_FILE", undefined, {
                new_file_list: new_item_list,
                delete_file_list: deleted_item_list,
                to_path: props.imgPath,
            });
        } else {
            apiErrorAlert(res.msg);
        }
    };

    useEffect(() => {
        if (props.originData) {
            editorController.setOrginImageListForEdit(props.originData.content);
        }
    }, [props]);

    return (
        <ContentEditorPresenter
            type={props.type}
            onSubmit={handleEdit}
            originData={props.originData}
            isCategory={props.isCategory}
            isSecret={props.isSecret}
            categoryOption={props.categoryOption}
            isHeaderHide={props.isHeaderHide}
        />
    );
};

type Props = NewProps | EditProps;
const ContentEditor = (props: Props) => {
    if (props.type === "NEW") {
        return (
            <WysiwygEditorProvider>
                <ContentCreateController {...props} />
            </WysiwygEditorProvider>
        );
    } else {
        return (
            <WysiwygEditorProvider>
                <ContentEditController {...props} />
            </WysiwygEditorProvider>
        );
    }
};

export default ContentEditor;
