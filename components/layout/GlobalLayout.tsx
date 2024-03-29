import style from "./GlobalLayout.module.scss";
import Image from "next/image";

import Banner from "public/assets/banner.jpg";
import HeaderLogo from "public/assets/headerlogo.png";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
//ORGANIMS
import Header from "components/organism/Header/Header";
import Footer from "components/organism/Footer/Footer";

// PAGE STROES
import { ClassStoreProvider } from "store/ClassStore";
import { AdminStoreProvider } from "store/AdminStore";
import MainCarousel from "components/molecule/MainCarousel/MainCarousel";

type DetailPageProps = {
    children: JSX.Element | JSX.Element[];
};
type RootPath = "" | "acinfo" | "admin" | "class" | "docs" | "lecture" | "lecture-category";

const PageDetailLayout = ({ children }: DetailPageProps) => {
    const router = useRouter();
    // @ts-ignore
    const rootPath: RootPath = router.route.split("/")[1];

    switch (rootPath) {
        case "class": {
            return <ClassStoreProvider>{children}</ClassStoreProvider>;
        }
        case "admin": {
            return <AdminStoreProvider>{children}</AdminStoreProvider>;
        }
        default:
            return <div className={"NOTCLASS"}>{children}</div>;
    }
};

type Props = {
    children: JSX.Element | JSX.Element[];
    isBannerHide?: boolean;
    isMenuHide?: boolean;
    isIndex?: boolean;
    indexSection1?: JSX.Element;
    indexSection2?: JSX.Element;
};
const GlobalLayout = ({ children, isBannerHide, isMenuHide, isIndex, indexSection1, indexSection2 }: Props) => {
    return (
        <div className={style.container}>
            {/* STRIPE */}
            {!isMenuHide && <div className={style.stripe}></div>}

            {/* HEADER */}
            <div className={style.header}>
                <div className={style.head}>
                    <Link href="/" passHref>
                        <Image src={HeaderLogo} alt={HeaderLogo.src} />
                    </Link>
                </div>
                {!isMenuHide && (
                    <div className={style.nav}>
                        <div className={style.padding_col}></div>
                        <div className={`${style.main_col} ${style.nav_inner}`}>
                            <Header />
                        </div>
                        <div className={style.padding_col}></div>
                    </div>
                )}
            </div>

            {isIndex && (
                <>
                    <div className={style.carousel}>
                        <MainCarousel />
                    </div>
                    <div className={style.indexSection1}>{indexSection1}</div>
                    <div className={style.indexSection2}>{indexSection2}</div>
                </>
            )}

            {/* BANNER */}
            {!isBannerHide && (
                <div className={style.banner} style={{ backgroundImage: `url('${Banner.src}')` }}>
                    <div className={style.mask}></div>
                </div>
            )}

            {/* ARTICLE */}
            <div className={style.article}>
                <div className={style.padding_col}></div>
                <article className={style.main_col}>
                    <PageDetailLayout>{children}</PageDetailLayout>
                </article>
                <div className={style.padding_col}></div>
            </div>

            {/* FOOTER */}
            <div className={style.footer}>
                <Footer />
            </div>
        </div>
    );
};
export default GlobalLayout;
