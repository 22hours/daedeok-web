import style from "./MainCarousel.module.scss";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { useAuthStore } from "store/AuthStore";
import { useEffect, useState } from "react";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
type Props = {};
function Item(props) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <h2>{props.item.name}</h2>
            <h2>{props.item.name}</h2>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">Check it out!</Button>
        </Paper>
    );
}

const BannerItem = ({ url }: { url: string }) => {
    return <div className={style.item_container} style={{ backgroundImage: `url('${url}')` }}></div>;
};

const MainCarousel = (props: Props) => {
    const { clientSideApi } = useAuthStore();
    const [imgList, setImgList] = useState<string[]>([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "ADMIN_FIND_IMAGE");
        if (res.result === "SUCCESS") {
            setImgList(res.data.image_list.map((it) => it.url));
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
        },
    ];
    return (
        <Carousel
            indicators={false}
            // NavButton={({ onClick, className, style, next, prev }) => {
            //     if (next) {
            //         return (
            //             //@ts-ignore
            //             <div onClick={onClick}>
            //                 <NavigateNextIcon />
            //             </div>
            //         );
            //     } else {
            //         return (
            //             //@ts-ignore
            //             <div onClick={onClick}>
            //                 <NavigateNextIcon color={"white"} />
            //             </div>
            //         );
            //     }
            // }}
            animation={"slide"}
            autoPlay={false}
            className={style.conatiner}
        >
            {imgList.map((url, idx) => (
                <BannerItem key={`carouselitem${url}`} url={url} />
            ))}
        </Carousel>
    );
};

export default MainCarousel;
