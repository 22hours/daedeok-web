import Button from "@ui/buttons/Button";
import CollapseButton from "@ui/buttons/CollapseButton";
import Typo from "@ui/Typo";
import { RouteController } from "lib/RouteController";
import React, { useEffect, useState } from "react";
import style from "./ClassSideBar.module.scss";

import MobileSideBar from "./MobileSideBar";
import PcSideBar from "./PcSideBar";

const SidebarMenuList = () => {
    // DUMMIES
    const myRole = "ROLE_TUTOR";
    const nowOpenLecture = [
        { id: 1, name: "요한계시록-1", class_id: 1 },
        { id: 2, name: "요한계시록-2", class_id: 2 },
        { id: 3, name: "요한계시록-3", class_id: 3 },
    ];

    const SidebarButtonList: any = [];
    Object.entries(RouteController.class.childPage).forEach(([key, value]) => {
        if (value.isVisible) {
            if (value.accessRole === myRole || value.accessRole == undefined) {
                console.log(key);
                SidebarButtonList.push(value);
            }
        }
    });
    return (
        <>
            {SidebarButtonList.map((it) => {
                if (it.isDropdown) {
                    // 서버에서 데이터 받아와야함
                    return (
                        <CollapseButton
                            mainText={it.name}
                            mainButtonSize={"medium"}
                            mainFontSize={"small"}
                            mainTextColor={"brown_base"}
                            mainBackgroundColor={"transparent"}
                            icon={true}
                        >
                            <div>
                                {nowOpenLecture.map((it, idx) => (
                                    <Button
                                        key={`classlistbtn::${idx}`}
                                        type={"SQUARE"}
                                        size={"small"}
                                        backgroundColor={"white"}
                                        fontSize={"small"}
                                        content={it.name}
                                        className={style.collapse_inner_button}
                                    />
                                ))}
                            </div>
                        </CollapseButton>
                    );
                } else {
                    return (
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
                    );
                }
            })}
        </>
    );
};

const CommonSideBar = () => {
    return (
        <div className={style.common_container}>
            <section className={style.section_user}>
                <div className={style.head}>
                    <Typo type={"TEXT"} size={"large"} content={"이연곤"} className={style.user} />
                    &nbsp; &nbsp;
                    <Typo type={"TEXT"} size={"normal"} content={"목사님 반갑습니다"} className={style.wellcome} />
                </div>
                <div>
                    <Typo type={"TEXT"} size={"small"} color={"gray_accent"} content={"강사"} />
                </div>
                <div className={style.bottom}>
                    <Typo type={"TEXT"} size={"small"} content={"진행중인 강의"} />
                    &nbsp;
                    <Typo type={"TEXT"} size={"small"} color={"mint_accent"} content={"3"} />
                </div>
            </section>
            <section className={style.section_button}>
                <Button
                    type={"SQUARE"}
                    size={"large"}
                    fontSize={"medium"}
                    line={"inline"}
                    backgroundColor={"yellow_accent"}
                    color={"white"}
                    content={"강의 개설"}
                    alignment={"center"}
                />
            </section>
            <section className={style.section_menulist}>
                <SidebarMenuList />
                {/* {RouteController.class.childPage.open} */}
            </section>
        </div>
    );
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
