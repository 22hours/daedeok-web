import Drawer from "@ui/drawer";
import Typo from "@ui/Typo";
import style from "./MobileHeader.module.scss";
import Image from "next/image";
import HeaderLogo from "public/assets/header_reverse.png";
import CollapseButton from "@ui/buttons/CollapseButton";
import Button from "@ui/buttons/Button";
import { useRouter } from "next/dist/client/router";
import { RouteController } from "lib/RouteController";
import Link from "next/link";

type Props = {};

const DrawerInnerCollapseButton = (props: { name: string; pathname: string; isDynamic?: boolean; as?: any }) => {
    return (
        //@ts-ignore
        <Link href={props.isDynamic ? props.as() : props.pathname}>
            <div className={`${style.collapse_inner_button}`}>
                <Typo type={"TEXT"} size={"medium"} color={"white"} content={props.name} />
            </div>
        </Link>
    );
};

const DrawerInner = () => {
    const router = useRouter();
    const nowPathName = router.pathname;
    const nowAsPath = router.asPath;
    return (
        <div className={style.drawer_container}>
            <div className={style.section_img}>
                <Image src={HeaderLogo} />
            </div>
            <div className={style.scetion_grid_container}>
                {Object.keys(RouteController).map((first_key) => {
                    const fisrtItem = RouteController[first_key];
                    if (fisrtItem.isVisible) {
                        const currentFirstPath = `/${nowPathName.split("/")[1]}`;
                        const extraClassName = currentFirstPath === fisrtItem.pathname && style.parent_on;
                        if (fisrtItem.isDropdown) {
                            return (
                                <div className={style.scetion_collapse}>
                                    <CollapseButton
                                        mainText={fisrtItem.name}
                                        mainButtonSize={"small"}
                                        mainFontSize={"medium"}
                                        mainTextColor={"white"}
                                        mainBackgroundColor={"transparent"}
                                        icon={true}
                                        buttonClassName={extraClassName || ""}
                                    >
                                        <>
                                            {Object.keys(fisrtItem.childPage).map((second_key, idx) => {
                                                const secondItem = fisrtItem.childPage[second_key];

                                                return (
                                                    <DrawerInnerCollapseButton
                                                        key={`mobile_drawer_item::${idx}`}
                                                        {...secondItem}
                                                    />
                                                );
                                            })}
                                        </>
                                    </CollapseButton>
                                </div>
                            );
                        } else {
                            return (
                                <Link href={fisrtItem.pathname}>
                                    <div className={`${style.scetion_collapse}`}>
                                        <Button
                                            type={"SQUARE"}
                                            size={"small"}
                                            fontSize={"medium"}
                                            backgroundColor={"transparent"}
                                            color={"white"}
                                            line={"inline"}
                                            alignment={"left"}
                                            content={fisrtItem.name}
                                            className={extraClassName || undefined}
                                        ></Button>
                                    </div>
                                </Link>
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
};

const MobileHeader = () => {
    const BoxItemList = ["아카데미 소개", "강의 카테고리", "개설된 강의 안내"];
    return (
        <Drawer
            drawerAnchor={"left"}
            drawerButtonChildren={
                <div className={style.container}>
                    {BoxItemList.map((it, idx) => (
                        <div className={style.square} key={`mobile-header-item${idx}`}>
                            <Typo type={"BUTTON"} size={"smaller"} color={"brown_base"} content={it} />
                        </div>
                    ))}
                </div>
            }
            drawerInnerChildren={<DrawerInner />}
        />
    );
};

export default MobileHeader;
