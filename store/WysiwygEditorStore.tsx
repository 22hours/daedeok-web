import React, { useState, useEffect, createContext, RefObject, useContext, useRef, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useAuthStore } from "./AuthStore";
import ListController from "lib/client/listController";

// ELEMENT TYPES
type Store = {
    editorRef: RefObject<Editor>;
    uploadDummyImage: (blob: Blob | File) => Promise<any>;
    saveOriginImgList: () => void;
    getMarkdownContent: () => void;
    getUpdatedImgList: () => {
        new_item_list: any[];
        deleted_item_list: any[];
    };
    setMarkdownContent: (md: string) => void;
    onLoadEditor: () => void;
};
// ACTION TYPES
type Action = {};

// CONTEXT
const WysiwygEditorContext = React.createContext<Store | null>(null);

// REDUCER

export const WysiwygEditorProvider = ({ children }) => {
    const [originImgList, setOriginImgList] = useState<string[]>([]);
    const { clientSideApi } = useAuthStore();

    const editorRef = useRef<Editor>(null);

    const uploadDummyImage = async (blob: Blob | File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file_list", blob);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        if (res.result === "SUCCESS") {
            return res.data[0];
        } else {
            alert(res.msg);
        }
    };

    const getImageSourceList = (): string[] => {
        if (editorRef.current) {
            // const rootElm = editorRef.current.getRootElement();
            const rootElm = editorRef.current.getRootElement().getElementsByClassName("toastui-editor-contents")[1];
            //@ts-ignore
            const htmlImgList: HTMLImageElement[] = rootElm.getElementsByTagName("img");
            var imgList: HTMLImageElement[] = [].slice.call(htmlImgList);

            const res_list: string[] = [];

            imgList.forEach((imgElm) => {
                const curSrc = imgElm.getAttribute("src");
                if (curSrc) {
                    if (res_list.indexOf(curSrc) === -1) {
                        res_list.push(curSrc);
                    }
                }
            });
            // @ts-ignore
            return res_list;
        } else {
            return [];
        }
    };

    const saveOriginImgList = () => {
        const cur_origin_img_list = getImageSourceList();
        console.log(cur_origin_img_list);
        setOriginImgList(cur_origin_img_list);
    };

    const setMarkdownContent = (md: string) => {
        if (editorRef.current) {
            //@ts-ignore
            editorRef.current.getInstance().setMarkdown(md);
        }
    };

    const getMarkdownContent = () => {
        if (editorRef.current) {
            //@ts-ignore
            const md = editorRef.current.getInstance().getMarkdown();
            return md;
        } else {
            return "";
        }
    };

    const getUpdatedImgList = () => {
        const curImgList = getImageSourceList();
        const { deleted_item_list, new_item_list } = ListController.getUpdateInList(originImgList, curImgList, true);
        console.log({ deleted_item_list, new_item_list });
        return {
            new_item_list: new_item_list,
            deleted_item_list: deleted_item_list,
        };
    };

    const onLoadEditor = () => {
        setTimeout(() => {
            const rootElmList: HTMLCollection = document.getElementsByClassName("toastui-editor-contents");
            const rootElm = rootElmList.item(1);
            if (rootElm) {
                //@ts-ignore
                const htmlImgList: HTMLImageElement[] = rootElm.getElementsByTagName("img");
                var imgList: HTMLImageElement[] = [].slice.call(htmlImgList);

                const res_list: string[] = [];

                imgList.forEach((imgElm) => {
                    const curSrc = imgElm.getAttribute("src");
                    if (curSrc) {
                        if (res_list.indexOf(curSrc) === -1) {
                            res_list.push(curSrc);
                        }
                    }
                });
                saveOriginImgList();
            }
        }, 1000);
    };

    const store: Store = {
        editorRef: editorRef,
        uploadDummyImage: uploadDummyImage,
        saveOriginImgList: saveOriginImgList,
        getMarkdownContent: getMarkdownContent,
        getUpdatedImgList: getUpdatedImgList,
        setMarkdownContent: setMarkdownContent,
        onLoadEditor: onLoadEditor,
    };

    return <WysiwygEditorContext.Provider value={store}>{children}</WysiwygEditorContext.Provider>;
};

export const useEditorController = () => {
    const state = useContext(WysiwygEditorContext);
    if (!state) throw new Error("Cannot find WysiwygEditorProvider");
    return state;
};
