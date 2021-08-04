import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import { useClassDetailStore } from "store/ClassDetailStore";
import { useClassStore } from "store/ClassStore";
type State = {
    breadCrumbList: { name: string; link: string }[];
    pageTitle: string;
};
type DetailPagePathname =
    | `"/class/[status]/[class_id]"`
    | "/class/[status]/[class_id]"
    // DETAIL
    | "/class/[status]/[class_id]/board"
    | "/class/[status]/[class_id]/board/new"
    | "/class/[status]/[class_id]/board/detail/[...content_id]"
    | "/class/[status]/[class_id]/board/edit/[...content_id]"
    // TUTOR
    | "/class/[status]/[class_id]/manage/lecture"
    | "/class/[status]/[class_id]/manage/student"
    | "/class/[status]/[class_id]/manage/attendance"
    | "/class/[status]/[class_id]/manage/attendance/detail/[...episode_id]"
    // STUDENT
    | "/class/[status]/[class_id]/student/info"
    | "/class/[status]/[class_id]/student/join"
    | "/class/[status]/[class_id]/student/join/detail/[...episode_id]"
    | "/class/[status]/[class_id]/student/attendance";

const ClassDetailPageLayout = ({ children, setState }) => {
    const { auth } = useAuthStore();
    const getStatusKor = (status: "open" | "close" | "complete") => {
        switch (status) {
            case "open": {
                if (auth?.role === "ROLE_TUTOR") {
                    return "현재 진행중인 강의";
                } else {
                    return "현재 수강중인 강의";
                }
            }
            case "close": {
                return "종료된 강의";
            }
            case "complete": {
                return "수료한 강의";
            }
        }
    };

    const router = useRouter();
    // @ts-ignore
    const pathname: DetailPagePathname = router.pathname;
    const { class_id, class_title, class_status } = useClassDetailStore();

    // @ts-ignore
    const nowClassStatus = getStatusKor(router.query.status);
    useEffect(() => {
        if (class_title) {
            switch (pathname) {
                case "/class/[status]/[class_id]": {
                    setState({
                        breadCrumbList: [],
                        pageTitle: "",
                    });
                    break;
                }

                case "/class/[status]/[class_id]/board": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "게시판", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/board/new": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "게시판", link: `/class/${class_status}/${class_id}/board` },
                            { name: "게시글 작성", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/board/detail/[...content_id]": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "게시판", link: `/class/${class_status}/${class_id}/board` },
                            { name: "게시글 상세", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/board/edit/[...content_id]": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "게시판", link: `/class/${class_status}/${class_id}/board` },
                            { name: "게시글 수정", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/manage/lecture": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "강의 관리", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/manage/student": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "학생 관리", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/manage/attendance": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "출석 관리", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/manage/attendance/detail/[...episode_id]": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "출석 관리", link: `/class/${class_status}/${class_id}/manage/attendance` },
                            { name: "출석 관리 상세", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/student/info": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "강의정보", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/student/join": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "강의참여", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/student/join/detail/[...episode_id]": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "강의참여", link: `/class/${class_status}/${class_id}/student/join` },
                            { name: "영상보기", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }

                case "/class/[status]/[class_id]/student/attendance": {
                    setState({
                        breadCrumbList: [
                            { name: "강의실 메인", link: "/class" },
                            { name: nowClassStatus, link: `/class/${class_status}` },
                            { name: class_title, link: `/class/${class_status}/${class_id}` },
                            { name: "출석", link: `` },
                        ],
                        pageTitle: class_title,
                    });
                    break;
                }
            }
        }
    }, [router.asPath]);
    return <>{children}</>;
};

type PlainPagePathname =
    | "/class"
    | "/class/new"
    | "/class/notice"
    | "/class/notice/new"
    | "/class/notice/detail/[...notice_id]"
    | "/class/notice/edit/[...notice_id]"
    | "/class/[status]";
const ClassPlainPageLayout = ({ children, setState }) => {
    const router = useRouter();
    // @ts-ignore
    const pathname: PlainPagePathname = router.pathname;
    useEffect(() => {
        switch (pathname) {
            case "/class": {
                setState({
                    breadCrumbList: [],
                    pageTitle: "",
                });
                break;
            }

            case "/class/new": {
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        { name: "강의개설", link: "" },
                    ],
                    pageTitle: "강의 개설",
                });
                break;
            }

            case "/class/notice": {
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        { name: "공지 및 알림", link: "/class/notice" },
                    ],
                    pageTitle: "공지 및 알림",
                });
                break;
            }

            case "/class/notice/new": {
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        { name: "공지 및 알림", link: "/class/notice" },
                        { name: "게시글 작성", link: "" },
                    ],
                    pageTitle: "공지 및 알림",
                });
                break;
            }

            case "/class/notice/detail/[...notice_id]": {
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        { name: "공지 및 알림", link: "/class/notice" },
                        { name: "게시글 상세", link: "" },
                    ],
                    pageTitle: "공지 및 알림",
                });
                break;
            }

            case "/class/notice/edit/[...notice_id]": {
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        { name: "공지 및 알림", link: "/class/notice" },
                        { name: "게시글 수정", link: "" },
                    ],
                    pageTitle: "공지 및 알림",
                });
                break;
            }
            case "/class/[status]": {
                const { status } = router.query;
                setState({
                    breadCrumbList: [
                        { name: "강의실 메인", link: "/class" },
                        {
                            name:
                                status === "open"
                                    ? "현재 진행중인 강의"
                                    : status === "close"
                                    ? "종료된 강의"
                                    : "수료한 강의",
                            link: "",
                        },
                    ],
                    pageTitle:
                        status === "open" ? "현재 진행중인 강의" : status === "close" ? "종료된 강의" : "수료한 강의",
                });
            }
            default:
                return;
        }
    }, []);
    return <>{children}</>;
};

type Props = {
    children: JSX.Element | JSX.Element[];
    isDetailPage?: boolean;
};
const ClassPageInfoLayout: React.FC<Props> = ({ children, isDetailPage }: Props) => {
    const [state, setState] = useState<State | null>(null);
    const classState = useClassStore();
    useEffect(() => {
        if (state) {
            classState.dispatch({
                type: "SET_CLASS_INFO",
                data: state,
            });
        }
    }, [state]);

    if (isDetailPage) {
        return <ClassDetailPageLayout setState={setState}>{children}</ClassDetailPageLayout>;
    } else {
        return <ClassPlainPageLayout setState={setState}>{children}</ClassPlainPageLayout>;
    }
};

export default ClassPageInfoLayout;
