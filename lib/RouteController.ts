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
        pathname: "/",
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
        childPage: {},
    },
    admin: {
        name: "관리자",
        pathname: "/lecture",
        isVisible: false,
        isAccessAble: false,
        isDropdown: false,
        childPage: {},
    },
};
