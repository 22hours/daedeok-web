import Button from "@ui/buttons/Button";
import Icon from "@ui/Icon";
import FileInput from "@ui/input/FileInput";
import TextInput from "@ui/input/TextInput";
import ListController from "lib/client/listController";
import useFileInput from "lib/hooks/useFileInput";
import useInput from "lib/hooks/useInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import style from "./AdminManagePopup.module.scss";

type PopUpItemProps = {
    imgUrl: string;
    linkUrl: string;
    idx: number;
    editPopUpLink: (idx: number, linkUrl: string) => void;
    editPopUpImage: (idx: number, imgUrl: string) => void;
    removePopUpItem: (idx: number) => void;
};
const PopUpItem = (props: PopUpItemProps) => {
    const { alertOn, apiErrorAlert } = useAlert();
    const { clientSideApi } = useAuthStore();
    const file = useFileInput();

    const uploadDummy = async (file: File) => {
        var bodyFormData = new FormData();

        bodyFormData.append("file_list", file);
        console.log(bodyFormData);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        return res;
    };

    const setUrl = async (file: File) => {
        const url_res = await uploadDummy(file);
        if (url_res?.result === "SUCCESS") {
            console.log(url_res);
            const res_url = url_res.data[0];
            props.editPopUpImage(props.idx, res_url);
        } else {
            apiErrorAlert(url_res.msg);
        }
    };
    useEffect(() => {
        if (file.value) {
            const curSelectedFile: File = file.value;
            setUrl(curSelectedFile);
        }
    }, [file.value]);

    return (
        <div className={style.item_container}>
            <div className={style.item_head}>
                <FileInput {...file} accept={"image/*"}>
                    <Button
                        className={`${style.image_upload_btn}`}
                        type={"SQUARE"}
                        size={"small"}
                        fontSize={"smaller"}
                        content={"팝업 이미지 업로드"}
                        backgroundColor={"brown_base"}
                        color={"white"}
                    />
                </FileInput>
                <Icon onClick={() => props.removePopUpItem(props.idx)} type={"delete"} />
            </div>
            <div className={style.item_body}>
                <TextInput
                    value={props.imgUrl}
                    onChange={(e) => props.editPopUpImage(props.idx, e.target.value)}
                    form={"box"}
                    type={"text"}
                />
            </div>
            <div className={style.item_head}>
                <Button
                    className={`${style.link_upload_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"팝업 링크 추가"}
                    backgroundColor={"brown_base"}
                    color={"white"}
                />
            </div>
            <div className={style.item_body}>
                <TextInput
                    value={props.linkUrl}
                    onChange={(e) => props.editPopUpLink(props.idx, e.target.value)}
                    form={"box"}
                    type={"text"}
                />
            </div>
        </div>
    );
};

const AdminManagePopup = () => {
    const { alertOn, apiErrorAlert } = useAlert();
    const { auth, clientSideApi } = useAuthStore();

    const [originPopUpList, setOriginPopUpList] = useState<{ id: any; url: string; link: string }[]>([]);
    const [data, setData] = useState<{ id: any; url: string; link: string }[]>([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_POPUP");
        if (res.result === "SUCCESS") {
            const popupData = res.data?.popup_list.slice();

            const curData: any[] = [];
            const originPopupData: any[] = [];

            popupData.forEach((element) => {
                curData.push({ ...element });
                originPopupData.push({ ...element });
            });

            setData(curData);
            setOriginPopUpList(originPopupData);
        } else {
            apiErrorAlert(res.msg);
        }
    };
    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    const editPopUpImage = useCallback(
        (idx: number, imgUrl: string) => {
            const cloneList = data.slice();
            cloneList[idx].url = imgUrl;
            setData(cloneList);
        },
        [data]
    );

    const editPopUpLink = useCallback(
        (idx: number, linkUrl: string) => {
            const cloneList = data.slice();
            cloneList[idx].link = linkUrl;
            setData(cloneList);
        },
        [data]
    );

    const removePopUpItem = useCallback(
        (idx: number) => {
            const cloneList = data.slice();
            cloneList.splice(idx, 1);
            setData(cloneList);
        },
        [data]
    );

    const addPopUpItem = useCallback(() => {
        if (data.length >= 2) {
            alertOn({ message: "2개 이상으로는 추가할 수 없습니다", type: "WARN" });
            return;
        }
        const cloneList = data.slice();
        cloneList.push({ id: null, url: "", link: "" });
        setData(cloneList);
    }, [data]);

    const savePopUpList = async () => {
        const image_server_host = "https://daedeok.s3.ap-northeast-2.amazonaws.com";

        // console.log("이전");
        // console.log(originPopUpList);
        // console.log("변경된");
        // console.log(data);

        const { new_item_list, deleted_item_list } = ListController.getUpdateInList(originPopUpList, data, false);
        const new_image_list = new_item_list.filter((it) => it.url.includes(image_server_host));
        const delete_image_list = deleted_item_list.filter((it) => it.url.includes(image_server_host));

        const final_new_image_list = new_image_list.map((it) => it.url);
        const final_del_image_list = delete_image_list.map((it) => it.url);

        // console.log("추가");
        // console.log(final_new_image_list);
        // console.log(new_item_list);
        // console.log("삭제");
        // console.log(deleted_item_list);
        // console.log(final_del_image_list);

        const unchanged_popup_id_list = [];

        // console.log(originPopUpList.length);

        const getUnchangedIdList = () => {
            // console.log("실행");
            if (originPopUpList.length > 0) {
                // console.log("실행됨");
                originPopUpList.forEach((element) => {
                    var flag = false;
                    deleted_item_list.forEach((n_e) => {
                        //변경된 id 가 있다면
                        // console.log("아이디");
                        // console.log(element.id);
                        // console.log(n_e.id);
                        if (element.id === n_e.id) {
                            console;
                            flag = true;
                        }
                    });
                    if (!flag) {
                        unchanged_popup_id_list.push(
                            //@ts-ignore
                            element.id
                        );
                    }
                });
            }
            // console.log("변경X");
            // console.log(unchanged_popup_id_list);
        };

        getUnchangedIdList();

        var expression =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);

        const imgFlag = data.findIndex((it) => !it.url.match(regex)) === -1;
        const linkFlag = data.findIndex((it) => !it.link.match(regex)) === -1;
        if (imgFlag && linkFlag) {
            const request_url_list = new_item_list.map((it) => {
                return {
                    url: it?.url,
                    link: it?.link,
                };
            });
            // console.log("전송값");
            // console.log(request_url_list);
            const res = await clientSideApi("PUT", "MAIN", "SAVE_POPUP", undefined, {
                unchanged_popup_id_list: unchanged_popup_id_list,
                popup_list: request_url_list,
            });
            if (res.result === "SUCCESS") {
                await clientSideApi("PUT", "MAIN", "UPDATE_FILE", undefined, {
                    new_file_list: final_new_image_list,
                    delete_file_list: final_del_image_list,
                    to_path: "POPUP",
                });
                alertOn({ message: "성공적으로 저장하였습니다", type: "POSITIVE" });
                setData([]);
                getData();
                // console.log(request_url_list);
            } else {
                apiErrorAlert(res.msg);
            }
        } else {
            alertOn({
                message: "이미지와 링크 주소는 공백일 수 없으며\nhttps로 시작하는 주소여야만합니다",
                type: "WARN",
            });
        }
    };

    return (
        <div className={style.container}>
            <div className={style.body}>
                {data?.map((it, idx) => (
                    <PopUpItem
                        key={`adminpopupitem:${idx}`}
                        imgUrl={it.url}
                        linkUrl={it.link}
                        idx={idx}
                        editPopUpImage={editPopUpImage}
                        editPopUpLink={editPopUpLink}
                        removePopUpItem={removePopUpItem}
                    />
                ))}
            </div>
            <div className={style.footer}>
                <Button
                    className={`${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"팝업 추가"}
                    backgroundColor={"brown_base"}
                    color={"white"}
                    onClick={addPopUpItem}
                />
                <Button
                    className={`${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"저장"}
                    backgroundColor={"yellow_accent"}
                    color={"white"}
                    onClick={savePopUpList}
                />
            </div>
        </div>
    );
};

export default AdminManagePopup;
