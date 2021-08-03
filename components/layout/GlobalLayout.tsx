import style from "./GlobalLayout.module.scss";
import Image from "next/image";

import Banner from "public/assets/banner.jpg";
import HeaderLogo from "public/assets/headerlogo.png";
import { useRouter } from "next/dist/client/router";

// LAYOUTS
import ClassLayout from "components/layout/ClassLayout";

//ORGANIMS
import Header from "components/organism/Header/Header";

// PAGE STROES
import { ClassStoreProvider } from "store/ClassStore";
import { AdminStoreProvider } from "store/AdminStore";

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
};
const GlobalLayout = ({ children, isBannerHide, isMenuHide }: Props) => {
    return (
        <div className={style.container}>
            {/* STRIPE */}
            {!isMenuHide && <div className={style.stripe}></div>}

            {/* HEADER */}
            <div className={style.header}>
                <div className={style.head}>
                    <Image src={HeaderLogo} alt={HeaderLogo.src} />
                </div>
                {!isMenuHide && (
                    <div className={style.nav}>
                        <div></div>
                        <div className={style.nav_inner}>
                            <Header />
                        </div>
                        <div></div>
                    </div>
                )}
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
                <article className={style.main_article}>
                    <PageDetailLayout>{children}</PageDetailLayout>
                </article>
                <div></div>
            </div>

            {/* FOOTER */}
            <div className={style.footer}></div>
        </div>
    );
};
export default GlobalLayout;
