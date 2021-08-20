import { req_types } from "@global_types";
import Icon from "@ui/Icon";
import Typo from "@ui/Typo";
import DateController from "lib/client/dateController";
import Link from "next/link";
import style from "./ClassBoardPreviewBox.module.scss";
type Item = {
    link: string;
    title: string;
    date?: string;
};
type Props = {
    item_list: Item[];
    title?: string;
};

const ClassBoardPreviewBox = (props: Props) => {
    return (
        <div className={style.container}>
            {props.title && (
                <div className={style.head}>
                    <Typo className={style.typo__title} type={"TEXT"} size={"normal"} content={props.title} />
                    <Icon type={"plus"} />
                </div>
            )}
            <div className={style.body}>
                {props.item_list.map((it, idx) => (
                    <Link key={`boarditem${idx}`} href={it.link} passHref>
                        <div className={style.item_row}>
                            <div className={style.title_txt}>
                                <Typo
                                    className={style.typo_item}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={it.title || ""}
                                    color={"gray_accent"}
                                />
                            </div>
                            {it.date && (
                                <Typo
                                    className={style.typo_date}
                                    type={"TEXT"}
                                    size={"small"}
                                    content={DateController.getFormatedDate("MM/DD", it.date)}
                                    color={"gray_accent"}
                                />
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ClassBoardPreviewBox;
