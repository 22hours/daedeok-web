import React from "react";
import style from "./ListPageLayout.module.scss";
type Props = {
    headerLeft?: JSX.Element;
    headerRight?: JSX.Element;
    control_row?: JSX.Element;
    footer?: JSX.Element | JSX.Element[];
    children: JSX.Element | JSX.Element[];
};

const ListPageLayout = (props: Props) => {
    return (
        <div className={style.container}>
            {props.headerLeft ||
                (props.headerRight && (
                    <div className={style.head}>
                        <div className={style.left}>{props.headerLeft}</div>
                        <div className={style.right}>{props.headerRight}</div>
                    </div>
                ))}

            <div className={style.body}> {props.children} </div>

            <div className={style.footer}>
                {props.control_row && <div className={style.control_row}>{props.control_row}</div>}
                {props.footer && <div className={style.pagination_row}> {props.footer}</div>}
            </div>
        </div>
    );
};

export default ListPageLayout;
