import Button from "@ui/buttons/Button";
import Typo from "@ui/Typo";
import Userbox from "components/molecule/Userbox/Userbox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./AdminSidebar.module.scss";
import Drawer from "@ui/drawer";
import useBoolean from "lib/hooks/useBoolean";
import MenuIcon from "@material-ui/icons/Menu";
import WindowController from "lib/client/windowController";

const PcSidebar = ({ children }) => {
    return <div className={style.pc_side_bar_container}>{children}</div>;
};

const MobileSidebar = ({ children }) => {
    const drawer = useBoolean(false);
    // @ts-ignore
    const toggleDrawer = () => drawer.onChange();

    const DrawerInner = () => {
        return <div className={style.inner_container}>{children}</div>;
    };
    return (
        <Drawer
            isOpen={drawer.value}
            toggleDrawer={toggleDrawer}
            drawerAnchor={"left"}
            drawerButtonChildren={
                <div className={style.mobile_side_bar_container}>
                    <MenuIcon />
                    <Typo type={"TEXT"} size={"normal"} content={"관리자 상세 메뉴"} />
                </div>
            }
            drawerInnerChildren={<DrawerInner />}
        />
    );
};

type MenuItemType = {
    name: string;
    link: string;
};
const MenuItem = (props: MenuItemType) => {
    return (
        <div className={style.section_menu}>
            <Link href={props.link} passHref>
                <Button
                    type={"UNDERLINE"}
                    size={"medium"}
                    fontSize={"smaller"}
                    alignment={"left"}
                    line={"inline"}
                    color={"gray_accent"}
                    backgroundColor={"transparent"}
                    content={props.name}
                />
            </Link>
        </div>
    );
};

const CommonSidebar = () => {
    const { auth } = useAuthStore();

    const makeMenuList = () => {
        const menu_list: MenuItemType[] = [
            { name: "회원관리", link: "/admin/member" },
            { name: "강사 공지 및 알림", link: "/admin/tutor-notice" },
            { name: "수업 카테고리 관리", link: "/admin/category" },
            { name: "소속관리", link: "/admin/division" },
            { name: "메인페이지 이미지 관리", link: "/admin/image" },
            { name: "대덕바이블 아카데미 소개 관리", link: "/admin/introduce" },
            { name: "교육비전 관리", link: "/admin/eduvision" },
        ];
        return (
            <>
                {menu_list.map((it, idx) => (
                    <MenuItem key={`adminsidebarmenuitem${idx}`} {...it} />
                ))}
            </>
        );
    };

    if (!auth) {
        return <div></div>;
    } else {
        return (
            <div className={style.common_container}>
                <section>
                    <Userbox />
                </section>
                <section className={style.section_menulist}>{makeMenuList()}</section>
            </div>
        );
    }
};

const AdminSidebar = () => {
    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        var width = WindowController.getWindowSize();
        if (width > 900) {
            setMode("pc");
        } else {
            setMode("mobile");
        }
    };
    useEffect(() => {
        setModeByWindowSize();
        window.addEventListener("resize", setModeByWindowSize);
        return () => {
            window.removeEventListener("resize", setModeByWindowSize);
        };
    }, []);

    return (
        <>
            {mode === "pc" ? (
                <PcSidebar>
                    <CommonSidebar />
                </PcSidebar>
            ) : (
                <MobileSidebar>
                    <CommonSidebar />
                </MobileSidebar>
            )}
        </>
    );
};
export default AdminSidebar;
