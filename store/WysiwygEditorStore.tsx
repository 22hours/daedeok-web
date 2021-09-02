import React, { useState, useEffect, createContext, RefObject, useContext, useRef, useCallback } from "react";
import { useAuthStore } from "./AuthStore";
import ListController from "lib/client/listController";
import ReactQuill, { Quill } from "react-quill";

// ELEMENT TYPES
type Store = {
    editorRef: React.MutableRefObject<ReactQuill>;
    uploadDummyImage: () => Promise<void>;
    getUpdatedImgList: () => {
        new_item_list: any[];
        deleted_item_list: any[];
    };
    setOrginImageListForEdit: (content: string) => void;
};
// ACTION TYPES
type Action = {};

// CONTEXT
const WysiwygEditorContext = React.createContext<Store | null>(null);

// REDUCER

export const WysiwygEditorProvider = ({ children }) => {
    const [originImgList, setOriginImgList] = useState<string[]>([]);
    const { clientSideApi } = useAuthStore();

    const editorRef = useRef<ReactQuill>();

    const getImageListInElement = (elm: Element | Document) => {
        const imageTagList = elm.getElementsByTagName("img");
        var imgList: HTMLImageElement[] = [].slice.call(imageTagList);
        const res_list: string[] = [];
        imgList.forEach((imgElm) => {
            const curSrc = imgElm.getAttribute("src");
            if (curSrc) {
                if (res_list.indexOf(curSrc) === -1) {
                    res_list.push(curSrc);
                }
            }
        });
        return res_list;
    };

    const uploadDummyImage = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", ".png,.jpg,.jpeg,.gif");
        input.click();

        input.onchange = async (e: any) => {
            const files = e.target.files;
            const formData = new FormData();
            formData.append("file_list", files[0]);

            const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, formData);
            if (res.result === "SUCCESS") {
                // @ts-ignore
                const range = editorRef.current?.getEditor().getSelection()?.index;
                if (range !== null && range !== undefined) {
                    let quill = editorRef.current?.getEditor();

                    quill?.setSelection(range, 1);

                    quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${res.data[0]}  />`);
                    return { ...res, success: true };
                }
            } else {
                alert(res.msg);
            }
        };
    };

    const getUpdatedImgList = () => {
        const quillContainerElm = document.getElementsByClassName("ql-container")[0];
        const curImgList = getImageListInElement(quillContainerElm);

        const { deleted_item_list, new_item_list } = ListController.getUpdateInList(originImgList, curImgList, true);
        return {
            new_item_list: new_item_list,
            deleted_item_list: deleted_item_list,
        };
    };

    const setOrginImageListForEdit = (content: string) => {
        let domparser = new DOMParser();
        const contentDocs = domparser.parseFromString(content, "text/html");
        setOriginImgList(getImageListInElement(contentDocs));
    };

    const store: Store = {
        // @ts-ignore
        editorRef: editorRef,
        uploadDummyImage: uploadDummyImage,
        getUpdatedImgList: getUpdatedImgList,
        setOrginImageListForEdit: setOrginImageListForEdit,
    };

    return <WysiwygEditorContext.Provider value={store}>{children}</WysiwygEditorContext.Provider>;
};

export const useEditorController = () => {
    const state = useContext(WysiwygEditorContext);
    if (!state) throw new Error("Cannot find WysiwygEditorProvider");
    return state;
};
