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
            return `user/login`;
        case `USER_CHECK`:
            return `user/check`;
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
            return `category`;
        case `CATEGORY_NEW`:
            return `category/`;
        case `CATEGORY_DELETE`:
            return `category/`;
        // LECTURE
        case `LECTURE_DETAIL`:
            return `lecture/${url_query.lecture_id}`;
        case `LECTURE_FIND`:
            return `lecture`;
        case "LECTURE_FIND_SIDEBAR":
            return `lecture/sidebar`;
        case `LECTURE_FIND_POSSIBLE`:
            return `lecture/possible`;
        case `LECTURE_FIND_COMPLETE`:
            return `lecture/complete`;
        case "LECTURE_FIND_CLASS_TITLE":
            return `lecture/${url_query.lecture_id}/custom`;
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
        // >>> PLAN
        case "LECTURE_FIND_PLAN":
            return `lecture/${url_query.lecture_id}/plan`;
        case "LECTURE_FIND_PLAN_DETAIL":
            return `lecture/plan/${url_query.episode_id}/user`;
        case "LECTURE_PLAN_USER_ATTENDANCE":
            return `lecture/plan/${url_query.episode_id}/user`;
        // >>> ONLINE
        case "LECTURE_ONLINE_DETAIL":
            return `lecture/plan/${url_query.episode_id}/online`;
        case "LECTURE_ONLINE_DURATION":
            return `lecture/plan/${url_query.episode_id}/online`;
        // >>>  NEW
        case `LECTURE_NEW`:
            return `lecture/`;
        case `LECTURE_EDIT`:
            return `lecture/${url_query}`;
        case `LECTURE_DELETE`:
            return `lecture/${url_query}`;
        case `LECTURE_CLOSE`:
            return `lecture/${url_query}`;
        // FILE
        case "UPLOAD_DUMMY":
            return `file`;
        // >>>  PLAN
        case `LECTUER_PLAN_LIST`:
            return `lecture/${url_query.lecture_id}/plan`;
        // >>>  JOIN
        case `LECTURE_JOIN`:
            return `lecture/join/${url_query.lecture_id}`;
        // DIVISION
        case "FIND_DIVISION":
            return `division/`;
        default:
            throw new Error(`EP REDUCER ERROR IN :: API.TSX`);
    }
};
