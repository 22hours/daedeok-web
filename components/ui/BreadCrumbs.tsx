import { meta_types } from "@global_types";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./BreadCrumbs.module.scss";
import Typo from "./Typo";
type ItemProps = {
    name: string;
    link: string;
    isLast: boolean;
};

const BreadItem = (props: ItemProps) => {
    return (
        <>
            {props.isLast ? (
                <Typo
                    className={style.breadcrumb}
                    type={"TEXT"}
                    size={"small"}
                    color={"brown_base"}
                    content={props.name}
                />
            ) : (
                <Link href={props.link}>
                    <a>
                        <Typo
                            className={style.breadcrumb}
                            type={"TEXT"}
                            size={"small"}
                            color={"gray_accent"}
                            content={props.name}
                        />
                    </a>
                </Link>
            )}
        </>
    );
};

const Sep = () => {
    return <Typo className={style.sep} type={"TEXT"} size={"small"} color={"gray_accent"} content={">"} />;
};

type Props = {
    item_list: meta_types.BreadCrumbItem[];
    className?: string;
};

const BreadCrumbs = (props: Props) => {
    const item_len = props.item_list.length;
    return (
        <div className={style.container}>
            {props.item_list.map((it, idx) => {
                const isLast = idx === item_len - 1;
                return (
                    <div key={`breacrumbs:${idx}`} className={`${props.className || ""}`}>
                        <BreadItem {...it} isLast={isLast} />
                        {!isLast && <Sep />}
                    </div>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
