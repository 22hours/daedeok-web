import style from "./MainCarousel.module.scss";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { useAuthStore } from "store/AuthStore";
import { useEffect, useState } from "react";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useAlert } from "store/GlobalAlertStore";
type Props = {};

const BannerItem = ({ url }: { url: string }) => {
    return <div className={style.item_container} style={{ backgroundImage: `url('${url}')` }}></div>;
};

const MainCarousel = (props: Props) => {
    const { clientSideApi } = useAuthStore();
    const { apiErrorAlert } = useAlert();

    const [imgList, setImgList] = useState<string[]>([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_IMAGE");
        if (res.result === "SUCCESS") {
            setImgList(res.data?.image_list?.map((it) => it.url));
        } else {
            apiErrorAlert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <Carousel indicators={false} navButtonsAlwaysVisible={true} animation={"slide"} className={style.conatiner}>
            {imgList.map((url, idx) => (
                <BannerItem key={`carouselitem${url}`} url={url} />
            ))}
        </Carousel>
    );
};

export default MainCarousel;
