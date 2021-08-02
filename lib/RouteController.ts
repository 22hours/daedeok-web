type status = "open" | "close" | "complete";
const makeClassChildPage = () => {
    const getCommonChildPage = (status: status) => {
        return {
            board: {
                name: "게시판",
                pathname: `/class/${[status]}/[...class_id]/board`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}`,
                childPage: {
                    new: {
                        name: "글 쓰기",
                        pathname: `/class/${[status]}/[...class_id]/board/new`,
                        isDynamic: true,
                        as: ({ class_id }) => `/class/${[status]}/${class_id}/board/new`,
                    },
                    detail: {
                        name: "상세 페이지",
                        pathname: `/class/${[status]}/[...class_id]/board/[...content_id]`,
                        isDynamic: true,
                        as: ({ class_id, content_id }) => `/class/${[status]}/${class_id}/board/detail/${content_id}`,
                    },
                    edit: {
                        name: "글 수정",
                        pathname: `/class/${[status]}/[...class_id]/board/edit/[...content_id]`,
                        isDynamic: true,
                        as: ({ class_id, content_id }) => `/class/${[status]}/${class_id}/board/edit/${content_id}`,
                    },
                },
            },
            // 강사
            manageLecture: {
                accessRole: "ROLE_TUTOR",
                name: "강의 관리",
                pathname: `/class/${[status]}/[...class_id]/manage/lecture`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/manange/lecture`,
            },
            manageStudent: {
                accessRole: "ROLE_TUTOR",
                name: "학생 관리",
                pathname: `/class/${[status]}/[...class_id]/manage/student`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/manange/student`,
            },
            manageAttendance: {
                accessRole: "ROLE_TUTOR",
                name: "출석 관리",
                pathname: `/class/${[status]}/[...class_id]/manage/attendance`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/manange/attendance`,
                childPage: {
                    detail: {
                        accessRole: "ROLE_TUTOR",
                        name: "출석 관리 상세",
                        pathname: `/class/${[status]}/[...class_id]/manage/attendance/detail/[...episode_id]`,
                        isDynamic: true,
                        as: ({ class_id, episode_id }) =>
                            `/class/${[status]}/${class_id}/manange/attendance/detail/${episode_id}`,
                    },
                },
            },
            // 학생
            studentInfo: {
                accessRole: "ROLE_MEMBER",
                name: "강의 정보",
                pathname: `/class/${[status]}/[...class_id]/student/info`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/student/info`,
            },
            studentJoin: {
                accessRole: "ROLE_MEMBER",
                name: "강의 참여",
                pathname: `/class/${[status]}/[...class_id]/student/join`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/student/join`,
                childPage: {
                    detail: {
                        accessRole: "ROLE_MEMBER",
                        name: "강의 참여 상세",
                        pathname: `/class/${[status]}/[...class_id]/student/join/detail/[...episode_id]`,
                        isDynamic: true,
                        as: ({ class_id, episode_id }) =>
                            `/class/${[status]}/${class_id}/student/join/detail/${episode_id}`,
                    },
                },
            },
            studentAttendance: {
                accessRole: "ROLE_MEMBER",
                name: "강의 출석",
                pathname: `/class/${[status]}/[...class_id]/student/attendance`,
                isDynamic: true,
                as: ({ class_id }) => `/class/${[status]}/${class_id}/student/attendance`,
            },
        };
    };

    const getStatusName = (status) => {
        switch (status) {
            case "open":
                return "현재 진행중인 강의";
            case "close":
                return "종료된 강의";
            case "complete":
                return "수료한 강의";
            default:
                return "";
        }
    };

    const getAccessRole = (status) => {
        switch (status) {
            case "open":
                return undefined;
            case "close":
                return "ROLE_TUTOR";
            case "complete":
                return "ROLE_MEMBER";
            default:
                return undefined;
        }
    };

    const statusArr: status[] = ["open", "close", "complete"];
    const res = statusArr.map((status: status) => {
        return {
            [status]: {
                name: getStatusName(status),
                pathname: `/class/${[status]}/[...class_id]`,
                isDynamic: true,
                as: (class_id) => `/class/${[status]}/${class_id}`,
                isVisible: true,
                isDropdown: true,
                accessRole: getAccessRole(status),
                childPage: {
                    ...getCommonChildPage(status),
                },
            },
        };
    });

    const resObj = {
        open: res["0"].open,
        close: res["1"].close,
        complete: res["2"].complete,
    };

    return resObj;
};

export const RouteController = {
    home: {
        name: "HOME",
        pathname: "/",
        isVisible: true,
        isAccessAble: true,
        isDropdown: false,
        childPage: {
            register: {
                name: "회원가입",
                pathname: "/register",
            },
            passwordchange: {
                name: "비밀번호변경",
                pathname: "/passwordchange",
            },
            mypage: {
                name: "마이페이지",
                pathname: "/mypage",
            },
        },
    },
    docs: {
        name: "docs",
        pathname: "/docs",
        isVisible: false,
        isAccessAble: false,
        isDropdown: false,
        childPage: {
            terms: {
                name: "이용약관",
                pathname: "/docs/terms",
            },
            privacy: {
                name: "개인정보처리방침",
                pathname: "/docs/privacy",
            },
        },
    },
    acintro: {
        name: "아카데미 소개",
        pathname: "/acinfo",
        isVisible: true,
        isAccessAble: false,
        isDropdown: true,
        childPage: {
            introduce: {
                name: "대덕바이블아카데미소개",
                pathname: "/acinfo/introduce",
            },
            eduvision: {
                name: "교육비전",
                pathname: "/acinfo/eduvision",
            },
            faq: {
                name: "자주묻는질문",
                pathname: "/acinfo/faq",
                isVisible: true,
                isAccessAble: true,
                childPage: {
                    new: {
                        name: "글 쓰기",
                        pathname: `/acinfo/faq/new`,
                        isDynamic: false,
                    },
                    detail: {
                        name: "상세 페이지",
                        pathname: `/acinfo/faq/detail/[...article_id]`,
                        isDynamic: true,
                        as: ({ article_id }) => `/acinfo/faq/detail/${article_id}`,
                    },
                    edit: {
                        name: "글 수정",
                        pathname: `/acinfo/faq/edit/[...article_id]`,
                        isDynamic: true,
                        as: ({ article_id }) => `/acinfo/faq/edit/${article_id}`,
                    },
                },
            },
            qna: {
                name: "질문과답변",
                pathname: "/acinfo/qna",
                isVisible: true,
                isAccessAble: true,
                childPage: {
                    new: {
                        name: "글 쓰기",
                        pathname: `/acinfo/qna/new`,
                        isDynamic: false,
                    },
                    detail: {
                        name: "상세 페이지",
                        pathname: `/acinfo/qna/detail/[...article_id]`,
                        isDynamic: true,
                        as: ({ article_id }) => `/acinfo/qna/detail/${article_id}`,
                    },
                    edit: {
                        name: "글 수정",
                        pathname: `/acinfo/qna/edit/[...article_id]`,
                        isDynamic: true,
                        as: ({ article_id }) => `/acinfo/qna/edit/${article_id}`,
                    },
                },
            },
            notice: {
                name: "공지사항",
                pathname: "/acinfo/notice",
                isVisible: true,
                isAccessAble: true,
                childPage: {
                    new: {
                        name: "글 쓰기",
                        pathname: `/acinfo/notice/new`,
                        isDynamic: false,
                    },
                    detail: {
                        name: "상세 페이지",
                        pathname: `/acinfo/notice/detail/[...notice_id]`,
                        isDynamic: true,
                        as: ({ notice_id }) => `/acinfo/notice/detail/${notice_id}`,
                    },
                    edit: {
                        name: "글 수정",
                        pathname: `/acinfo/notice/edit/[...notice_id]`,
                        isDynamic: true,
                        as: ({ notice_id }) => `/acinfo/notice/edit/${notice_id}`,
                    },
                },
            },
        },
    },
    lectureCategory: {
        name: "강의 카테고리",
        pathname: "/lecture-category",
        isVisible: true,
        isAccessAble: false,
        isDropdown: false,
        childPage: {
            detail: {
                name: "상세 페이지",
                pathname: "/lecture-category/deatil/{category_id}",
                isDynamic: true,
                as: ({ category_id }) => `/lecture-category/deatil/${category_id}`,
            },
        },
    },
    lecture: {
        name: "개설된 강의 안내",
        pathname: "/lecture",
        isVisible: true,
        isAccessAble: false,
        isDropdown: true,
        childPage: {
            open: {
                name: "현재 진행중인 강의",
                pathname: "/lecture/[status]",
                isDynamic: true,
                as: () => `/lecture/open`,
            },
            close: {
                name: "종료된 강의",
                pathname: "/lecture/[status]",
                isDynamic: true,
                as: () => `/lecture/close`,
            },
        },
    },
    class: {
        name: "강의실 입장",
        pathname: "/class",
        isVisible: true,
        isAccessAble: false,
        isDropdown: false,

        childPage: {
            // 공통
            main: {
                name: "강의실 메인",
                isVisible: true,
                pathname: "/class",
            },
            tutorNotice: {
                name: "강사 공지 및 알림",
                pathname: "/class/notice",
                accessRole: "ROLE_TUTOR",
                isVisible: true,

                childPage: {
                    new: {
                        accessRole: "ROLE_TUTOR",
                        name: "글 쓰기",
                        pathname: `/class/notice/new`,
                        isDynamic: false,
                    },
                    detail: {
                        accessRole: "ROLE_TUTOR",
                        name: "상세 페이지",
                        pathname: `/class/notice/detail/[...notice_id]`,
                        isDynamic: true,
                        as: ({ notice_id }) => `/class/notice/detail/${notice_id}`,
                    },
                    edit: {
                        accessRole: "ROLE_TUTOR",
                        name: "글 수정",
                        pathname: `/class/notice/edit/[...notice_id]`,
                        isDynamic: true,
                        as: ({ notice_id }) => `/class/notice/edit/${notice_id}`,
                    },
                },
            },
            // 강사 전용
            new: {
                name: "강의 개설",
                pathname: "/class/new",
                accessRole: "ROLE_TUTOR",
                isVisible: false,
            },
            // 학생 전용
            join: {
                name: "수강 신청",
                pathname: "/class/join",
                accessRole: "ROLE_MEMBER",
                isVisible: false,

                childPage: {
                    detail: {
                        accessRole: "ROLE_MEMBER",
                        name: "상세 페이지",
                        pathname: `/class/join/detail/[...class_id]`,
                        isDynamic: true,
                        as: ({ class_id }) => `/class/join/detail/${class_id}`,
                    },
                },
            },
            ...makeClassChildPage(),
        },
    },
    admin: {
        name: "관리자",
        pathname: "/admin",
        isVisible: false,
        isAccessAble: false,
        isDropdown: false,
        childPage: {},
    },
};
