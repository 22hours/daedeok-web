type Props = {
    children: JSX.Element | JSX.Element[];
    isBannerHide?: boolean;
};

import style from "./GlobalLayout.module.scss";

// 띠          2 : 100		    36px
// 헤더		    11 : 100		196px
// 메뉴		    3 : 100			53px
// 배너		    16 : 100		285px
// 아티클        47:100			1014(가변)
// 푸터         11 : 100		196

const GlobalLayout = ({ children, isBannerHide }: Props) => {
    return (
        <div className={style.container}>
            <div className={style.stripe}></div>
            <div className={style.header}>
                <div className={style.head}></div>
                <div className={style.nav}></div>
            </div>
            {!isBannerHide && <div className={style.banner}></div>}
            <div className={style.article}>
                <div></div>
                <article className={style.main_article}>{children}</article>
                <div></div>
            </div>
            <div className={style.footer}></div>
        </div>
    );
};
export default GlobalLayout;
