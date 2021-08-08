//  ./@types/custom-types/index.d.ts
declare module "@api_config_type" {
    export namespace api_config_type {
        type api_response = {
            result: "SUCCESS" | "ERROR";
            data?: any;
            msg?: string;
            config?: any;
            statusCode?: number;
        };
        type api_params = {
            method: "GET" | "POST" | "PUT" | "DELETE";
            domain: "MAIN" | "MAIN_NOBASE";
            ep:
                | "TEST"
                | "REFRESH"
                | "TEST2"
                // USER
                | "USER_LOGIN"
                | "USER_CHECK"
                | "USER_REGISTER"
                | "USER_UPDATE_INFO"
                | "USER_UPDATE_PASSWORD"
                // FAQ
                | "FAQ_FIND"
                | "FAQ_FIND_DETAIL"
                | "FAQ_NEW"
                | "FAQ_EDIT"
                | "FAQ_DELETE"
                // QNA
                | "QNA_FIND"
                | "QNA_FIND_DETAIL"
                | "QNA_NEW"
                | "QNA_EDIT"
                | "QNA_DELETE"
                // TOTAL_NOTICE
                | "TOTAL_NOTICE_FIND"
                | "TOTAL_NOTICE_FIND_DETAIL"
                | "TOTAL_NOTICE_NEW"
                | "TOTAL_NOTICE_EDIT"
                | "TOTAL_NOTICE_DELETE"
                | "TOTAL_NOTICE_NEW_COMMENT"
                | "TOTAL_NOTICE_EDIT_COMMENT"
                | "TOTAL_NOTICE_DELETE_COMMENT"
                // TUTOR_NOTICE
                | "TUTOR_NOTICE_FIND"
                | "TUTOR_NOTICE_FIND_DETAIL"
                | "TUTOR_NOTICE_NEW"
                | "TUTOR_NOTICE_EDIT"
                | "TUTOR_NOTICE_DELETE"
                | "TUTOR_NOTICE_NEW_COMMENT"
                | "TUTOR_NOTICE_EDIT_COMMENT"
                | "TUTOR_NOTICE_DELETE_COMMENT"
                // CATEGORY
                | "CATEGORY_FIND"
                | "CATEGORY_NEW"
                | "CATEGORY_DELETE"
                // LECTURE
                | "LECTURE_FIND"
                | "LECTURE_FIND_POSSIBLE"
                | "LECTURE_FIND_COMPLETE"
                // >>> SIDEBAR
                | "LECTURE_FIND_SIDEBAR"
                | "LECTURE_FIND_CLASS_TITLE"
                // >>>  BOARD
                | "LECTURE_BOARD_FIND"
                | "LECTURE_BOARD_DETAIL"
                | "LECTURE_BOARD_NEW"
                | "LECTURE_BOARD_EDIT"
                | "LECTURE_BOARD_DELETE"
                | "LECTURE_BOARD_NEW_COMMENT"
                | "LECTURE_BOARD_EDIT_COMMENT"
                | "LECTURE_BOARD_DELETE_COMMENT"
                // >>> PLAN
                | "LECTURE_FIND_PLAN"
                | "LECTURE_FIND_PLAN_DETAIL"
                | "LECTURE_PLAN_USER_ATTENDANCE"
                // >>> ONLINE
                | "LECTURE_ONLINE_DETAIL"
                | "LECTURE_ONLINE_DURATION"
                // >>>  NEW
                | "LECTURE_NEW"
                | "LECTURE_EDIT"
                | "LECTURE_DELETE"
                | "LECTURE_CLOSE"
                // FILE
                | "UPLOAD_DUMMY"
                // >>>  PLAN
                | "LECTUER_PLAN_LIST"
                // >>>  JOIN
                | "LECTURE_JOIN"
                // DIVISION
                | "FIND_DIVISION";
            url_query?: string | { lecture_id: string; board_id: string } | any;
            data?: any;
            extraHeader?: any;
        };
    }
}
