/* eslint-disable @next/next/no-img-element */
import style from "./IndexPopup.module.scss";
import Modal from "@material-ui/core/Modal";
import { useEffect, useState } from "react";
import Typo from "@ui/Typo";
import CheckBox from "@ui/input/CheckBox";
import useBoolean from "lib/hooks/useBoolean";
import PopupStorageController from "lib/client/popupStorageController";
import { useAuthStore } from "store/AuthStore";

type Props = {
    children: JSX.Element[] | JSX.Element;
};
const popupStorageController = new PopupStorageController();

const ImageModal = (props) => {
    const showFlag = useBoolean(false);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        if (showFlag.value) {
            popupStorageController.addHidePopupItem(props.id);
        }
        setOpen(false);
    };
    return (
        <div className={style.modal_wrapper}>
            <Modal
                className={style.modal}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                hideBackdrop
                disablePortal={false}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={style.modal_container}>
                    <div className={style.modal_inner}>
                        <a target="_blank" href={props.lifnk || "#"} rel="noreferrer">
                            <img src={props.url} />
                        </a>
                    </div>
                    <div className={style.modal_info_wrapper}>
                        <div className={style.modal_info_btn} onClick={() => showFlag.toggle()}>
                            <CheckBox labelContent={"오늘 하루 보지않기"} {...showFlag} isLabelRight />
                        </div>
                        <div onClick={handleClose} className={style.modal_info_btn}>
                            <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={"끄기"} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

const IndexPopup = (props: Props) => {
    const { clientSideApi } = useAuthStore();
    const [modalData, setModalData] = useState([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "FIND_POPUP");
        if (res.result === "SUCCESS") {
            const modalData = res.data.popup_list;
            setModalData(popupStorageController.getVisibleModalList(modalData));
        } else {
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div>
                {modalData.map((it, idx) => (
                    <ImageModal key={`homemodal${idx}`} {...it} />
                ))}
            </div>
            {props.children}
        </div>
    );
};

export default IndexPopup;
