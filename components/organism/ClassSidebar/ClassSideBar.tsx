import Button from "@ui/buttons/Button";
import CollapseButton from "@ui/buttons/CollapseButton";
import Typo from "@ui/Typo";
import Userbox from "components/molecule/Userbox/Userbox";
import { RouteController } from "lib/RouteController";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./ClassSideBar.module.scss";

import MobileSideBar from "./MobileSideBar";
import PcSideBar from "./PcSideBar";

const SidebarMenuList = () => {
    // SERVER 에서 DATA FETCH 필요!
    // DUMMIES

    const { auth, clientSideApi } = useAuthStore();
    const router = useRouter();
    const { class_id } = router.query;

    const myRole = auth?.role;

    const [openList, setOpenList] = useState<{ title: string; lecture_id: number }[]>([]);
    const getNowOpenLecturList = async () => {
        const res = await clientSideApi("GET", "MAIN", "LECTURE_FIND_SIDEBAR", undefined, undefined);
        if (res.result === "SUCCESS") {
            setOpenList(res.data);
        } else {
            // alert(res.msg);
        }
    };
    useEffect(() => {
        getNowOpenLecturList();
    }, []);

    const SidebarButtonList: any = [];
    Object.entries(RouteController.class.childPage).forEach(([key, value]) => {
        if (value.isVisible) {
            if (value.accessRole === myRole || value.accessRole == undefined) {
                SidebarButtonList.push(value);
            }
        }
    });
    if (auth === null) {
        return <div></div>;
    } else {
        return (
            <>
                {SidebarButtonList.map((it) => {
                    if (it.isDropdown) {
                        // 서버에서 데이터 받아와야함
                        const status = it.pathname.split("/")[2];

                        const menuText = auth?.role === "ROLE_TUTOR" ? "현재 진행중인 강의" : "현재 수강중인 강의";
                        return (
                            <div className={style.section_menu}>
                                <CollapseButton
                                    // mainText={it.name}
                                    mainText={menuText}
                                    mainButtonSize={"medium"}
                                    mainFontSize={"small"}
                                    mainTextColor={"brown_base"}
                                    mainBackgroundColor={"transparent"}
                                    icon={true}
                                >
                                    <div className={style.collapse_outter}>
                                        {openList.map((lectureItem, idx) => {
                                            const link = RouteController.class.childPage[status].childPage.board.as({
                                                class_id: lectureItem.lecture_id,
                                            });
                                            const isNow = lectureItem.lecture_id?.toString() === class_id;
                                            return (
                                                <Link key={`classlistbtn::${idx}`} href={link} passHref>
                                                    <Button
                                                        type={"SQUARE"}
                                                        size={"small"}
                                                        backgroundColor={isNow ? "mint_accent" : "white"}
                                                        fontSize={"smaller"}
                                                        color={isNow ? "white" : "brown_base"}
                                                        content={lectureItem.title}
                                                        className={style.collapse_inner_button}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </CollapseButton>
                            </div>
                        );
                    } else {
                        const buttonLink = it.pathname;

                        return (
                            <div className={style.section_menu}>
                                <Link href={buttonLink}>
                                    <Button
                                        type={"UNDERLINE"}
                                        size={"medium"}
                                        fontSize={"small"}
                                        alignment={"left"}
                                        line={"inline"}
                                        color={"brown_base"}
                                        backgroundColor={"transparent"}
                                        content={it.name}
                                    />
                                </Link>
                            </div>
                        );
                    }
                })}
            </>
        );
    }
};

const CommonSideBar = () => {
    const { auth } = useAuthStore();
    if (!auth) {
        return <div></div>;
    } else {
        const role = auth.role === "ROLE_MEMBER" ? "멤버" : auth.role === "ROLE_TUTOR" ? "강사" : "관리자";
        const newClassLink =
            auth.role === "ROLE_TUTOR"
                ? RouteController.class.childPage.new.pathname
                : RouteController.class.childPage.join.pathname;

        return (
            <div className={style.common_container}>
                <section className={style.section_user}>
                    <Userbox />
                </section>

                <section className={style.section_button}>
                    <Link href={newClassLink}>
                        <Button
                            type={"SQUARE"}
                            size={"large"}
                            fontSize={"medium"}
                            line={"inline"}
                            backgroundColor={"yellow_accent"}
                            color={"white"}
                            content={role === "강사" ? "강의 개설" : "수강 신청"}
                            alignment={"center"}
                        />
                    </Link>
                </section>
                <section className={style.section_menulist}>
                    <SidebarMenuList />
                </section>
            </div>
        );
    }
};

const ClassSideBar = () => {
    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        if (window.innerWidth > 900) {
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
                <PcSideBar>
                    <CommonSideBar />
                </PcSideBar>
            ) : (
                <MobileSideBar>
                    <CommonSideBar />
                </MobileSideBar>
            )}
        </>
    );
};
export default ClassSideBar;
