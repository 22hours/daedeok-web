import style from "./GlobalLayout.module.scss";
import Image from "next/image";

import Banner from "public/assets/banner.jpg";
import HeaderLogo from "public/assets/headerlogo.png";
type Props = {
    children: JSX.Element | JSX.Element[];
    isBannerHide?: boolean;
    isMenuHide?: boolean;
};
// 띠          2 : 100		    36px
// 헤더		    11 : 100		196px
// 메뉴		    3 : 100			53px
// 배너		    16 : 100		285px
// 아티클        47:100			1014(가변)
// 푸터         11 : 100		196

const GlobalLayout = ({ children, isBannerHide, isMenuHide }: Props) => {
    return (
        <div className={style.container}>
            {/* STRIPE */}
            <div className={style.stripe}></div>

            {/* HEADER */}
            <div className={style.header}>
                <div className={style.head}>
                    <Image src={HeaderLogo} alt={HeaderLogo.src} />
                </div>
                {!isMenuHide && <div className={style.nav}></div>}
            </div>

            {/* BANNER */}
            {!isBannerHide && (
                <div className={style.banner} style={{ backgroundImage: `url('${Banner.src}')` }}>
                    <div className={style.mask}></div>
                </div>
            )}

            {/* ARTICLE */}
            <div className={style.article}>
                <div></div>
                <article className={style.main_article}>{children}</article>
                <div></div>
            </div>

            {/* FOOTER */}
            <div className={style.footer}></div>
        </div>
    );
};
export default GlobalLayout;
