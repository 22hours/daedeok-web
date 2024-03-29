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
        case "USER_INFO":
            return `user/info`;
        case `USER_LOGIN`:
            return `user/login`;
        case `USER_CHECK`:
            return `user/check`;
        case "USER_DELETE":
            return `user`;
        case `USER_REGISTER`:
            return `user/`;
        case `USER_UPDATE_INFO`:
            return `user/`;
        case `USER_UPDATE_PASSWORD`:
            return `user/password?id=${url_query.user_id}`;
        case `USER_PASSWORD_RESET`:
            return `user/password/reset`;
        case "USER_ROLE_CHANGE":
            return `user/admin/role`;
        // GUIDE
        case `GUIDE_FIND`:
            return `guide/`;
        case `GUIDE_FIND_DETAIL`:
            return `guide/${url_query.article_id}`;
        case `GUIDE_NEW`:
            return `guide/`;
        case `GUIDE_EDIT`:
            return `guide/${url_query.article_id}`;
        case `GUIDE_DELETE`:
            return `guide/${url_query.article_id}`;
        // FAQ
        case `FAQ_FIND`:
            return `faq/`;
        case `FAQ_FIND_DETAIL`:
            return `faq/${url_query.article_id}`;
        case `FAQ_NEW`:
            return `faq/`;
        case `FAQ_EDIT`:
            return `faq/${url_query.article_id}`;
        case `FAQ_DELETE`:
            return `faq/${url_query.article_id}`;
        // QNA
        case `QNA_FIND`:
            return `qna`;
        case `QNA_FIND_DETAIL`:
            return `qna/${url_query.article_id}`;
        case `QNA_NEW`:
            return `qna/`;
        case `QNA_EDIT`:
            return `qna/${url_query.article_id}`;
        case `QNA_DELETE`:
            return `qna/${url_query.article_id}`;
        case `QNA_COMMENT_SAVE`:
            return `qna/${url_query.article_id}/comment`;
        case `QNA_DELETE_COMMENT`:
            return `qna/comment/${url_query.comment_id}`;
        case `QNA_UPDATE_COMMENT`:
            return `qna/comment/${url_query.comment_id}`;
        // TOTLA NOTICE
        case `TOTAL_NOTICE_FIND`:
            return `notice/`;
        case `TOTAL_NOTICE_FIND_DETAIL`:
            return `notice/${url_query.article_id}`;
        case `TOTAL_NOTICE_NEW`:
            return `notice`;
        case `TOTAL_NOTICE_EDIT`:
            return `notice/${url_query.article_id}`;
        case `TOTAL_NOTICE_DELETE`:
            return `notice/${url_query.article_id}`;
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
            return `notice/tutor/${url_query.notice_id}`;
        case `TUTOR_NOTICE_NEW`:
            return `notice/tutor/`;
        case `TUTOR_NOTICE_EDIT`:
            return `notice/tutor/${url_query.notice_id}`;
        case `TUTOR_NOTICE_DELETE`:
            return `notice/tutor/${url_query}`;
        case `TUTOR_NOTICE_NEW_COMMENT`:
            return `notice/tutor/${url_query.notice_id}/comment`;
        case `TUTOR_NOTICE_EDIT_COMMENT`:
            return `notice/tutor/comment/${url_query.comment_id}`;
        case `TUTOR_NOTICE_DELETE_COMMENT`:
            return `notice/tutor/comment/${url_query}`;
        // CATEGORY
        case "CATEGORY_FIND":
            return "category";
        case `CATEGORY_FIND_ALL`:
            return `category/all`;
        case `CATEGORY_DETAIL_FIND`:
            return `category/${url_query.category_id}`;
        case `CATEGORY_FIND`:
            return `category`;
        case "CATEGORY_FIND_ALL":
            return `category/all`;
        case "CATEGORY_FIND_CLASS_BOARD":
            return `category/all/lecture-board`;
        case `CATEGORY_NEW`:
            return `category/`;
        case `CATEGORY_DELETE`:
            return `category/`;
        case "CLASS_MAIN":
            return `lecture/main`;
        case "CATEGORY_QNA":
            return `category/all/qna`;
        // LECTURE
        case `LECTURE_DETAIL`:
            return `lecture/${url_query.lecture_id}`;
        case `LECTURE_DETAIL_UPDATE`:
            return `lecture/${url_query}/update`;
        case `LECTURE_UPDATE`:
            return `lecture/${url_query.lecture_id}`;
        case `LECTURE_FIND`:
            return `lecture`;
        case "LECTURE_FIND_SIDEBAR":
            return `lecture/sidebar`;
        case `LECTURE_FIND_POSSIBLE`:
            return `lecture/possible`;
        case `LECTURE_FIND_COMPLETE`:
            return `lecture/complete`;
        case `LECTURE_FIND_FINISH`:
            return `lecture/finish`;
        case "LECTURE_FIND_CLASS_TITLE":
            return `lecture/${url_query.lecture_id}/custom`;
        case "LECTURE_FIND_USER_ATTENDANCE":
            return `lecture/${url_query.lecture_id}/attendance`;
        // >>>  BOARD
        case `LECTURE_BOARD_FIND`:
            return `lecture/${url_query.lecture_id}/board`;
        case `LECTURE_BOARD_NEW`:
            return `lecture/${url_query.lecture_id}/board`;
        case "LECTURE_BOARD_DETAIL":
            return `lecture/board/${url_query.content_id}`;
        case `LECTURE_BOARD_EDIT`:
            return `lecture/board/${url_query.content_id}`;
        case `LECTURE_BOARD_DELETE`:
            return `lecture/board/${url_query.content_id}`;
        case `LECTURE_BOARD_NEW_COMMENT`:
            return `lecture/board/${url_query.content_id}/comment`;
        case `LECTURE_BOARD_EDIT_COMMENT`:
            return `lecture/board/comment/${url_query.comment_id}`;
        case `LECTURE_BOARD_DELETE_COMMENT`:
            return `lecture/board/comment/${url_query.comment_id}`;
        // >>>
        case `LECTURE_DETAIL_HANDOUT`:
            return `lecture/${url_query.lecture_id}/info`;
        // >>> PLAN
        case "LECTURE_FIND_PLAN":
            return `lecture/${url_query.lecture_id}/plan`;
        case "LECTURE_FIND_PLAN_DETAIL":
            return `lecture/plan/${url_query.episode_id}/user`;
        case "LECTURE_PLAN_USER_ATTENDANCE_MEMBER":
            return `lecture/plan/${url_query.plan_id}/attendance`;
        case "LECTURE_PLAN_USER_ATTENDANCE":
            return `lecture/plan/${url_query.plan_id}/user`;
        // >>> ONLINE
        case "LECTURE_ONLINE_DETAIL":
            return `lecture/plan/${url_query.episode_id}/online`;
        case "LECTURE_ONLINE_DURATION":
            return `lecture/plan/${url_query.episode_id}/online`;
        // >>> MANAGE USER
        case "CANCEL_STUDENT":
            return `lecture/cancel/${url_query.user_id}/${url_query.lecture_id}`;
        // >>>  NEW
        case `LECTURE_NEW`:
            return `lecture/`;
        case `LECTURE_EDIT`:
            return `lecture/${url_query.lecture_id}`;
        case `LECTURE_DELETE`:
            return `lecture/${url_query.lecture_id}`;
        case `LECTURE_CLOSE`:
            return `lecture/${url_query.lecture_id}`;
        case "LECTURE_MANAGE_STUDENT":
            return `lecture/${url_query.lecture_id}/user`;
        case "LECTURE_CANCEL":
            return `lecture/cancel/${url_query.lecture_id}`;
        // FILE
        case "UPDATE_FILE":
            return `file`;
        case "UPLOAD_DUMMY":
            return `file`;
        case "UPLOAD_CERTIFICATE":
            return `file/certificate/${url_query.user_id}/${url_query.lecture_id}`;
        case "DELETE_CERTIFICATE":
            return `file/certificate/${url_query.user_id}/${url_query.lecture_id}`;
        case "UPLOAD_REAL":
            return `file/real`;
        case "UPLOAD_UPDATE_FILE":
            return `file`;
        // >>>  PLAN
        case `LECTUER_PLAN_LIST`:
            return `lecture/${url_query.lecture_id}/plan`;
        // >>>  JOIN
        case `LECTURE_JOIN`:
            return `lecture/join/${url_query.lecture_id}`;
        // >>>  FINISH
        case `LECTURE_FINISH`:
            return `lecture/finish/${url_query.lecture_id}`;
        case `LECTURE_DELETE`:
            return `lecture/${url_query}`;
        // DIVISION
        case "FIND_DIVISION":
            return `division`;
        case "ADD_DIVISION":
            return `division`;
        case "DELETE_DIVISION":
            return `division`;
        case "UPDATE_DIVISION":
            return `division`;
        // ADMIN
        case "ADMIN_FIND_MEMBER":
            return `user/admin/member/${url_query.user_id}`;
        case "ADMIN_UPDATE_MEMBER":
            return `user/admin/member/${url_query.user_id}`;
        case "ADMIN_FIND_USER":
            return "user/admin";
        case "ADMIN_RESET_PW":
            return `user/admin/password/${url_query.user_id}`;
        case "ADMIN_DELETE_USER":
            return `user/admin/${url_query.user_id}`;
        case "ADMIN_NEW_CATEGORY":
            return `category`;
        case "ADMIN_UPDATE_CATEGORY":
            return `category/${url_query.category_id}`;
        case "ADMIN_DELETE_CATEGORY":
            return `category/${url_query.category_id}`;
        case "ADMIN_FIND_CATEGORY":
            return `category`;
        case "ADMIN_FIND_DETAIL_CATEGORY":
            return `category/${url_query.category_id}`;
        case "ADMIN_FIND_IMAGE":
            return `image`;
        case "ADMIN_SAVE_IMAGE":
            return `image`;
        case "ACINFO_INTRODUCE":
            return `acinfo/introduce`;
        case "ACINFO_EDUVISION":
            return `acinfo/eduvision`;

        //POPUP
        case "FIND_POPUP":
            return `popup`;
        case "SAVE_POPUP":
            return `popup`;

        case "ADMIN_FIND_DIVISION":
            return `division/detail`;
        case "FIND_DUTY":
            return `user/duty`;

        default:
            throw new Error(`EP REDUCER ERROR IN :: API.TSX`);
    }
};
