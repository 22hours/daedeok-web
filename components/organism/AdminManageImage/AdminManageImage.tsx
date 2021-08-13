import Button from "@ui/buttons/Button";
import Icon from "@ui/Icon";
import FileInput from "@ui/input/FileInput";
import TextInput from "@ui/input/TextInput";
import ListController from "lib/client/listController";
import useFileInput from "lib/hooks/useFileInput";
import useInput from "lib/hooks/useInput";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./AdminManageImage.module.scss";
type ImageItemType = string;

type ImageItemProps = {
    value: string;
    idx: number;
    editImageItem: (idx: number, value: string) => void;
    removeImageItem: (idx: number) => void;
};
const ImageItem = (props: ImageItemProps) => {
    const { clientSideApi } = useAuthStore();
    const file = useFileInput();

    const uploadDummy = async (file: File) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file_list", file);
        const res = await clientSideApi("POST", "MAIN", "UPLOAD_DUMMY", undefined, bodyFormData);
        return res;
    };

    const setUrl = async (file: File) => {
        const url_res = await uploadDummy(file);
        if (url_res?.result === "SUCCESS") {
            const res_url = url_res.data[0];
            props.editImageItem(props.idx, res_url);
        } else {
            alert(url_res.msg);
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
                        content={"이미지 업로드"}
                        backgroundColor={"brown_base"}
                        color={"white"}
                    />
                </FileInput>
                <Icon onClick={() => props.removeImageItem(props.idx)} type={"delete"} />
            </div>
            <div className={style.item_body}>
                <TextInput
                    value={props.value}
                    onChange={(e) => props.editImageItem(props.idx, e.target.value)}
                    form={"box"}
                    type={"text"}
                />
            </div>
        </div>
    );
};

type State = ImageItemType[];
const AdminManageImage = () => {
    const { auth, clientSideApi } = useAuthStore();

    const [originImgList, setOriginImgList] = useState<State>([]);
    const [data, setData] = useState<State>([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_IMAGE");
        if (res.result === "SUCCESS") {
            const imageList = res.data?.image_list?.map((it) => it.url) || [];
            setData(imageList);
            setOriginImgList(imageList);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    const editImageItem = useCallback(
        (idx: number, value: string) => {
            const cloneList = data.slice();
            cloneList[idx] = value;
            setData(cloneList);
        },
        [data]
    );

    const removeImageItem = useCallback(
        (idx: number) => {
            const cloneList = data.slice();
            cloneList.splice(idx, 1);
            setData(cloneList);
        },
        [data]
    );

    const addImageItem = useCallback(() => {
        if (data.length > 4) {
            alert("4개 이상으로는 추가할 수 없습니다");
            return;
        }

        const cloneList = data.slice();
        cloneList.push("");
        setData(cloneList);
    }, [data]);

    const saveImageList = async () => {
        const image_server_host = "https://daedeok.s3.ap-northeast-2.amazonaws.com";

        const { new_item_list, deleted_item_list } = ListController.getUpdateInList(originImgList, data, true);
        const new_image_list = new_item_list.filter((it) => it.includes(image_server_host));
        const delete_image_list = deleted_item_list.filter((it) => it.includes(image_server_host));

        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);

        const flag = data.findIndex((it) => !it.match(regex)) === -1;
        if (!flag) {
            alert("이미지 주소는 공백일 수 없으며\nhttps로 시작하는 주소여야만합니다");
        } else {
            // TODO

            const request_url_list = data.map((it) => {
                return {
                    url: it,
                };
            });
            const res = await clientSideApi("PUT", "MAIN", "ADMIN_SAVE_IMAGE", undefined, request_url_list);
            if (res.result === "SUCCESS") {
                await clientSideApi("PUT", "MAIN", "UPDATE_FILE", undefined, {
                    new_file_list: new_image_list,
                    delete_file_list: delete_image_list,
                    to_path: "MAIN_IMAGE",
                });
                alert("성공적으로 저장하였습니다");
                setData([]);
                getData();
            } else {
                alert(res.msg);
            }
        }
    };

    return (
        <div className={style.container}>
            <div className={style.body}>
                {data.map((it, idx) => (
                    <ImageItem
                        key={`adminimageitem:${idx}`}
                        value={it}
                        idx={idx}
                        editImageItem={editImageItem}
                        removeImageItem={removeImageItem}
                    />
                ))}
            </div>
            <div className={style.footer}>
                <Button
                    className={`${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"이미지 추가"}
                    backgroundColor={"brown_base"}
                    color={"white"}
                    onClick={addImageItem}
                />
                <Button
                    className={`${style.footer_btn}`}
                    type={"SQUARE"}
                    size={"small"}
                    fontSize={"smaller"}
                    content={"저장"}
                    backgroundColor={"yellow_accent"}
                    color={"white"}
                    onClick={saveImageList}
                />
            </div>
        </div>
    );
};

export default AdminManageImage;
