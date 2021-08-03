import Button from "@ui/buttons/Button";
import CollapseButton from "@ui/buttons/CollapseButton";
import Typo from "@ui/Typo";
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
    const { auth } = useAuthStore();
    const router = useRouter();
    const { class_id } = router.query;

    const myRole = auth?.role;
    const nowOpenLecture = [
        { id: 1, name: "요한계시록-1", class_id: 1 },
        { id: 2, name: "요한계시록-2", class_id: 2 },
        { id: 3, name: "요한계시록-3", class_id: 3 },
    ];

    const nowCloseLecture = [
        { id: 1, name: "무야호계시록-1", class_id: 1 },
        { id: 2, name: "무야호계시록-2", class_id: 2 },
        { id: 3, name: "무야호계시록-3", class_id: 3 },
        { id: 1, name: "무야호계시록-1", class_id: 1 },
        { id: 2, name: "무야호계시록-2", class_id: 2 },
        { id: 3, name: "무야호계시록-3", class_id: 3 },
        { id: 1, name: "무야호계시록-1", class_id: 1 },
        { id: 2, name: "무야호계시록-2", class_id: 2 },
        { id: 3, name: "무야호계시록-3", class_id: 3 },
    ];

    const SidebarButtonList: any = [];
    Object.entries(RouteController.class.childPage).forEach(([key, value]) => {
        if (value.isVisible) {
            if (value.accessRole === myRole || value.accessRole == undefined) {
                SidebarButtonList.push(value);
            }
        }
    });
    return (
        <>
            {SidebarButtonList.map((it) => {
                if (it.isDropdown) {
                    // 서버에서 데이터 받아와야함
                    const status = it.pathname.split("/")[2];
                    const curLectureList = status === "open" ? nowOpenLecture : nowCloseLecture;
                    return (
                        <div className={style.section_menu}>
                            <CollapseButton
                                mainText={it.name}
                                mainButtonSize={"medium"}
                                mainFontSize={"small"}
                                mainTextColor={"brown_base"}
                                mainBackgroundColor={"transparent"}
                                icon={true}
                            >
                                <div className={style.collapse_outter}>
                                    {curLectureList.map((lectureItem, idx) => {
                                        const link = RouteController.class.childPage[
                                            status
                                        ].childPage.board.childPage.detail.as({
                                            class_id: 1,
                                            content_id: 1,
                                        });
                                        const isNow = lectureItem.class_id.toString() === class_id;
                                        return (
                                            <Link key={`classlistbtn::${idx}`} href={link}>
                                                <Button
                                                    type={"SQUARE"}
                                                    size={"small"}
                                                    backgroundColor={isNow ? "mint_accent" : "white"}
                                                    fontSize={"smaller"}
                                                    color={isNow ? "white" : "brown_base"}
                                                    content={lectureItem.name}
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
                    <div className={style.head}>
                        <Typo type={"TEXT"} size={"large"} content={auth.name} className={style.user} />
                        &nbsp; &nbsp;
                        <Typo
                            type={"TEXT"}
                            size={"normal"}
                            content={`${auth?.duty}님 반갑습니다`}
                            className={style.wellcome}
                        />
                    </div>
                    <div>
                        <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={role} />
                    </div>
                    <div className={style.bottom}>
                        <Typo
                            type={"TEXT"}
                            size={"small"}
                            content={`${role === "강사" ? "진행중인" : "수강중인"} 강의`}
                        />
                        &nbsp;
                        <Typo type={"TEXT"} size={"small"} color={"mint_accent"} content={"3"} />
                    </div>
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
        if (window.innerWidth > 450) {
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
