import GlobalLayout from "components/layout/GlobalLayout";
import style from "./IndexPage.module.scss";
import Image from "next/image";

import faqImg from "public/assets/faq.png";
import acinfoImg from "public/assets/acinfo.png";
import classImg from "public/assets/class.png";
import classEnterImg from "public/assets/classEnter.png";
import Typo from "@ui/Typo";
import Link from "next/link";
import Userbox from "components/molecule/Userbox/Userbox";
import { useAuthStore } from "store/AuthStore";
import { useEffect, useState } from "react";
import Icon from "@ui/Icon";
import DateController from "lib/client/dateController";

import mainFooterImg from "public/assets/mainFooterImg.jpg";
import bibleIntro from "public/assets/bibleIntro.png";
import bibleContact from "public/assets/bibleContact.png";
import userImg from "public/assets/user.png";

type Props = {};
type NoticeItem = {
    id: string;
    user_id: string;
    title: string;
    create_date: string;
};

const IndexPage = (props: Props) => {
    const { auth, clientSideApi } = useAuthStore();

    const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "TOTAL_NOTICE_FIND", undefined, {
            page: 0,
            required_count: 4,
        });
        if (res.result === "SUCCESS") {
            setNoticeList(res.data.notice_list);
        } else {
            alert(res.msg);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const [mode, setMode] = useState<"pc" | "mobile">("pc");

    const setModeByWindowSize = () => {
        if (window.innerWidth > 775) {
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
        <GlobalLayout
            isBannerHide
            isIndex
            indexSection1={
                <>
                    <div className={style.section_1}>
                        <div className={style.padding_col}></div>
                        <div className={style.main_col}>
                            {mode === "pc" && (
                                <>
                                    <div className={style.image_button_grid}>
                                        <Link href={`/acinfo/faq`} passHref>
                                            <div className={`${style.faq} ${style.faq_btn}`}>
                                                <div className={style.img_wrapper}>
                                                    <div className={style.img_size}>
                                                        <Image src={faqImg} />
                                                    </div>
                                                </div>
                                                <div className={style.faq_btn_text}>
                                                    <Typo
                                                        className={style.btn_style}
                                                        type={"HEADER"}
                                                        size={"h4"}
                                                        content={"자주묻는 질문"}
                                                        color={"white"}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={`/acinfo/introduce`} passHref>
                                            <div className={`${style.qna_btn} ${style.acinfo}`}>
                                                <div className={style.img_wrapper}>
                                                    <div className={style.img_size}>
                                                        <Image src={acinfoImg} />
                                                    </div>
                                                </div>
                                                <div className={style.qna_btn_text}>
                                                    <Typo
                                                        className={style.btn_style}
                                                        type={"HEADER"}
                                                        size={"h4"}
                                                        content={"아카데미 사용법"}
                                                        color={"white"}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={`/class`} passHref>
                                            <div className={`${style.class_btn} ${style.class}`}>
                                                <div className={style.class_btn_wrapper}>
                                                    <div className={style.img_wrapper}>
                                                        <div className={style.img_size}>
                                                            <Image src={classImg} />
                                                        </div>
                                                    </div>
                                                    <div className={style.class_btn_text}>
                                                        <Typo
                                                            className={style.btn_style}
                                                            type={"HEADER"}
                                                            size={"h2"}
                                                            content={"강의실 입장"}
                                                            color={"white"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={style.arrow_wrapper}>
                                                    <div className={style.arrow_size}>
                                                        <Image src={classEnterImg} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={style.notice_user_grid}>
                                        <div className={style.notice_preview}>
                                            <div className={style.notice_head}>
                                                <Typo
                                                    className={style.notice_head_typo}
                                                    type={"TEXT"}
                                                    size={"large"}
                                                    content={"공지사항"}
                                                />
                                                <Link href={"/acinfo/notice"} passHref>
                                                    <Icon type={"brownplus"} />
                                                </Link>
                                            </div>
                                            <div className={style.notice_body}>
                                                {noticeList.map((it, idx) => (
                                                    <Link
                                                        key={`mainnoticeitem${idx}`}
                                                        href={`/acinfo/notice/detail/${it.id}`}
                                                        passHref
                                                    >
                                                        <div className={style.notice_list_item}>
                                                            <Typo
                                                                className={style.notice_list_item_title}
                                                                type={"TEXT"}
                                                                size={"small"}
                                                                content={it.title}
                                                                color={"gray_accent"}
                                                            />
                                                            <Typo
                                                                className={style.notice_list_item_title}
                                                                type={"TEXT"}
                                                                size={"small"}
                                                                content={DateController.getFormatedDate(
                                                                    "YYYY/MM/DD",
                                                                    it.create_date
                                                                )}
                                                                color={"gray_accent"}
                                                            />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={style.user_box}>
                                            <Userbox />
                                        </div>
                                    </div>
                                </>
                            )}
                            {mode === "mobile" && (
                                <>
                                    <div className={style.login_class_btn_grid}>
                                        <Link href={auth === null ? "/login" : "/mypage"} passHref>
                                            <div className={`${style.login_btn} ${style.user}`}>
                                                <Typo
                                                    className={style.btn_txt}
                                                    type={"HEADER"}
                                                    size={"h4"}
                                                    content={auth === null ? "로그인" : "마이페이지"}
                                                    color={"white"}
                                                />
                                            </div>
                                        </Link>
                                        <Link href={`/class`} passHref>
                                            <div className={`${style.class_btn} ${style.class}`}>
                                                <div className={style.class_btn_text}>
                                                    <Typo
                                                        className={style.btn_txt}
                                                        type={"HEADER"}
                                                        size={"h2"}
                                                        content={"강의실 입장"}
                                                        color={"white"}
                                                    />
                                                </div>
                                                <div className={style.img_wrapper}>
                                                    <div className={style.arrow_img}>
                                                        <Image src={classEnterImg} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.faq_acinfo_btn_grid}>
                                        <Link href={`/acinfo/faq`} passHref>
                                            <div className={`${style.faq_btn} ${style.faq}`}>
                                                <Typo
                                                    className={style.btn_txt}
                                                    type={"HEADER"}
                                                    size={"h4"}
                                                    content={"자주묻는 질문"}
                                                    color={"white"}
                                                />
                                            </div>
                                        </Link>
                                        <Link href={`/acinfo/introduce`} passHref>
                                            <div className={`${style.acinfo_btn} ${style.acinfo}`}>
                                                <Typo
                                                    className={style.btn_txt}
                                                    type={"HEADER"}
                                                    size={"h4"}
                                                    content={"아마데미 사용법"}
                                                    color={"white"}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.notice_user_grid}>
                                        <div className={style.notice_preview}>
                                            <div className={style.notice_head}>
                                                <Typo
                                                    className={style.notice_head_typo}
                                                    type={"TEXT"}
                                                    size={"large"}
                                                    content={"공지사항"}
                                                />
                                                <Link href={"/acinfo/notice"} passHref>
                                                    <Icon type={"brownplus"} />
                                                </Link>
                                            </div>
                                            <div className={style.notice_body}>
                                                {noticeList.map((it, idx) => (
                                                    <Link
                                                        key={`mainnoticeitem${idx}`}
                                                        href={`/acinfo/notice/detail/${it.id}`}
                                                        passHref
                                                    >
                                                        <div className={style.notice_list_item}>
                                                            <Typo
                                                                className={style.notice_list_item_title}
                                                                type={"TEXT"}
                                                                size={"small"}
                                                                content={it.title}
                                                                color={"gray_accent"}
                                                            />
                                                            <Typo
                                                                className={style.notice_list_item_title}
                                                                type={"TEXT"}
                                                                size={"small"}
                                                                content={DateController.getFormatedDate(
                                                                    "YYYY/MM/DD",
                                                                    it.create_date
                                                                )}
                                                                color={"gray_accent"}
                                                            />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={style.padding_col}></div>
                    </div>
                </>
            }
            indexSection2={
                <>
                    <div className={style.footer} style={{ backgroundImage: `url('${mainFooterImg.src}')` }}>
                        <div className={style.mask}>
                            <Typo
                                className={style.notice_head_typo}
                                type={"TEXT"}
                                size={"medium"}
                                content={"대덕바이블아카데미와 만나보세요"}
                                color={"white"}
                            />
                            <div className={style.img_btn_row}>
                                <Link href={"/acinfo/introduce"}>
                                    <div className={style.img_btn_wrapper}>
                                        <Image src={bibleIntro} />
                                    </div>
                                </Link>
                                <Link href={``}>
                                    <div className={style.img_btn_wrapper}>
                                        <Image src={bibleContact} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            }
        >
            <div></div>
        </GlobalLayout>
    );

    return <div className={style.container}></div>;
};

export default IndexPage;
