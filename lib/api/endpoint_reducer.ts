import { api_config_type } from "@api_config_type";
export const MAIN_HOST = `http://localhost:5000`;
export const MAIN_HOST_BASE_LOCATION = `/daedeok`;

type api_params = api_config_type.api_params;

export const endpoint_reducer = (ep: api_params["ep"], url_query: api_params["url_query"]) => {
    switch (ep) {
        case "TEST":
            return "user/test";
        case "TEST2":
            return "user/auth";
        case "REFRESH":
            return "user/reissue";
        // USER
        case `USER_LOGIN`:
            return `user/`;
        case `USER_CHECK`:
            return `user/`;
        case `USER_REGISTER`:
            return `user/`;
        case `USER_UPDATE_INFO`:
            return `user/`;
        case `USER_UPDATE_PASSWORD`:
            return `user/`;
        // FAQ
        case `FAQ_FIND`:
            return `faq/`;
        case `FAQ_FIND_DETAIL`:
            return `faq/`;
        case `FAQ_NEW`:
            return `faq/`;
        case `FAQ_EDIT`:
            return `faq/`;
        case `FAQ_DELETE`:
            return `faq/`;
        // QNA
        case `QNA_FIND`:
            return `qna/`;
        case `QNA_FIND_DETAIL`:
            return `qna/`;
        case `QNA_NEW`:
            return `qna/`;
        case `QNA_EDIT`:
            return `qna/`;
        case `QNA_DELETE`:
            return `qna/`;
        // TOTLA NOTICE
        case `TOTAL_NOTICE_FIND`:
            return `notice/`;
        case `TOTAL_NOTICE_FIND_DETAIL`:
            return `notice/`;
        case `TOTAL_NOTICE_NEW`:
            return `notice/`;
        case `TOTAL_NOTICE_EDIT`:
            return `notice/`;
        case `TOTAL_NOTICE_DELETE`:
            return `notice/`;
        case `TOTAL_NOTICE_NEW_COMMENT`:
            return `notice/`;
        case `TOTAL_NOTICE_EDIT_COMMENT`:
            return `notice/`;
        case `TOTAL_NOTICE_DELETE_COMMENT`:
            return `notice/`;
        // TUTOR NOTICE
        case `TUTOR_NOTICE_FIND`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_FIND_DETAIL`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_NEW`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_EDIT`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_DELETE`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_NEW_COMMENT`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_EDIT_COMMENT`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_DELETE_COMMENT`:
            return `notice/tutor/`;
        // CATEGORY
        case `CATEGORY_FIND`:
            return `category/`;
        case `CATEGORY_NEW`:
            return `category/`;
        case `CATEGORY_DELETE`:
            return `category/`;
        // LECTURE
        case `LECTURE_FIND`:
            return `lecture/`;
        // >>>  BOARD
        case `LECTURE_BOARD_FIND`:
            return `lecture/${url_query.lecture_id}/board`;
        case `LECTURE_BOARD_NEW`:
            return `lecture/${url_query.lecture_id}/board`;
        case `LECTURE_BOARD_EDIT`:
            return `lecture/${url_query.lecture_id}/board/${url_query.board_id}`;
        case `LECTURE_BOARD_DELETE`:
            return `lecture/${url_query.lecture_id}/board/${url_query.board_id}`;
        case `LECTURE_BOARD_NEW_COMMENT`:
            return `lecture/${url_query.lecture_id}/board/${url_query.board_id}`;
        case `LECTURE_BOARD_EDIT_COMMENT`:
            return `lecture/${url_query.lecture_id}/board/${url_query.board_id}`;
        case `LECTURE_BOARD_DELETE_COMMENT`:
            return `lecture/${url_query.lecture_id}/board/${url_query.board_id}`;
        // >>>  NEW
        case `LECTURE_NEW`:
            return `lecture/`;
        case `LECTURE_EDIT`:
            return `lecture/${url_query}`;
        case `LECTURE_DELETE`:
            return `lecture/${url_query}`;
        case `LECTURE_CLOSE`:
            return `lecture/${url_query}`;

        default:
            throw new Error(`EP REDUCER ERROR IN :: API.TSX`);
    }
};
