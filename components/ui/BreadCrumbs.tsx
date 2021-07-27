import Link from "next/link";
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
                <Typo type={"TEXT"} size={"small"} color={"brown_base"} content={props.name} />
            ) : (
                <Link href={props.link}>
                    <a>
                        <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={props.name} />
                    </a>
                </Link>
            )}
        </>
    );
};

const Sep = () => {
    return <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={">"} />;
};

type Props = {
    item_list: { name: string; link: string }[];
};

const BreadCrumbs = (props: Props) => {
    const item_len = props.item_list.length;
    return (
        <div className={style.container}>
            {props.item_list.map((it, idx) => {
                const isLast = idx === item_len - 1;

                return (
                    <>
                        <BreadItem key={`breacrumbs:${idx}`} {...it} isLast={isLast} />
                        {!isLast && <Sep />}
                    </>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;