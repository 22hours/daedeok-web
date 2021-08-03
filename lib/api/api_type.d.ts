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
            method: "GET" | "POST" | "UPDATE" | "DELETE";
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
                // >>>  BOARD
                | "LECTURE_BOARD_FIND"
                | "LECTURE_BOARD_DETAIL"
                | "LECTURE_BOARD_NEW"
                | "LECTURE_BOARD_EDIT"
                | "LECTURE_BOARD_DELETE"
                | "LECTURE_BOARD_NEW_COMMENT"
                | "LECTURE_BOARD_EDIT_COMMENT"
                | "LECTURE_BOARD_DELETE_COMMENT"
                // >>> ONLINE
                | "LECTURE_ONLINE_DETAIL"
                // >>>  NEW
                | "LECTURE_NEW"
                | "LECTURE_EDIT"
                | "LECTURE_DELETE"
                | "LECTURE_CLOSE"
                // >>>  JOIN
                | "LECTURE_JOIN";
            url_query?: string | { lecture_id: string; board_id: string } | any;
            data?: any;
            extraHeader?: any;
        };
    }
}
