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
                    <div
                        // style={{ backgroundImage: `url('${props.img}')` }}
                        className={style.modal_inner}
                    >
                        <img src={props.img} />
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
    const dummy = [
        {
            id: "1",
            img:
                "https://eventusstorage.blob.core.windows.net/evs/Image/ppssacademy/21926/ProjectInfo/Cover/876b750f4ab74d459e81506925b9353a.jpg",
            link: "https://naver.com",
        },
        {
            id: "2",
            img:
                "https://images.chosun.com/resizer/nIy21WxR9noPUM6WgEstpKZGjRY=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/YV2M7H5QCCEOUAXPKJ4OTBQCMM.jpg",
            link: "https://naver.com",
        },
    ];

    const { clientSideApi } = useAuthStore();
    const [modalData, setModalData] = useState([]);
    const getData = async () => {
        const data = await dummy;
        setModalData(popupStorageController.getVisibleModalList(data));
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
