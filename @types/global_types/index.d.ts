//  ./@types/custom-types/index.d.ts
declare module "@global_types" {
    export namespace meta_types {
        type accessRole = "ROLE_ALL" | "ROLE_MEMBER" | "ROLE_TUTOR" | "ROLE_ADMIN";
        type user = {
            user_id: string;
            name: string;
            role: "ROLE_MEMBER" | "ROLE_TUTOR" | "ROLE_ADMIN";
            duty: string;
            lecture_num: 3;
            access_token: string;
            refresh_token: string;
        };
        type commentItem = {
            id: number;
            author: string;
            content: string;
            create_date: string;
        };
        type boardPreviewItem = {
            id: number;
            title: string;
            category: string;
            author: string;
            create_date: string;
            view: numbe;
        };
        type classType = "ONLINE" | "ZOOM" | "OFFLINE";
    }
    export namespace req_types {
        type classCommonItem = {
            type: meta_types.classType;
            week: number;
            title: string;
            tutor: string;
            location: string;
            date: string;
            time: string;
        };
        type classOnlineType = {
            video_link: string;
            introduce: string;
        };
        type classZoomType = {
            zoom_link: string;
        };
        type classPlanListItem =
            | classCommonItem
            | (classCommonItem & classOnlineType)
            | (classCommonItem & classZoomType);
        type classHandoutItem = { name: string; url: string };
        //(목사) 강의 개설
        type classNewItem = {
            title: string;
            content: string;
            category: string;
            division_list: Array<{ first_division: string; second_division: string }>;
            student_limit: number;
            reference: string;
            handout_list: Array<classHandoutItem>;
            plan_list: Array<classPlanListItem>;
        };
        //(공통) 강의 게시글 생성
        type classNewBoardItem = {
            title: string;
            category: string;
            content: string;
        };
        //(공통) 강의 게시글 댓글 생성
        type classNewCommentItem = {
            parent_id: number;
            board_id: number;
            content: string;
        };
    }
    export namespace res_types {
        //(목사) 강의 상세
        type classDetail = {
            id: number;
            title: string;
            category: string;
            start_date: string;
            end_date: string;
            student_limit: number;
            student_num: number;
            content: string;
            tutor: string;
            type: Array<string>;
            division_list: Array<{ first_division: string; second_division: string }>;
            refeerence: string;
            lecture_plan: Array<{ week: number; title: string; tutor: string; location: string }>;
        };
        //(공통) 강의 게시판 상세
        type classBoardDetail = {
            id: number;
            title: string;
            category: string;
            content: string;
            author: string;
            creat_date: string;
            view: number;
            comment_list?: Array<{
                id: number;
                author: string;
                content: string;
                create_date: string;
                children?: Array<commentItem>;
            }>;
            after: board_preview;
            before: board_preview;
        };
        //(학생) 수강신청 가능한 강의 리스트
        type classJoinItem = {
            res: Array<{ id: number; week: number; title: string; status: string }>;
        };
        //(학생) 강의 정보
        type classInfoItem = {
            handout_list: Array<{ id: number; name: string; url: string }>;
            lecture_plan_list: Array<{
                id: number;
                week: number;
                title: string;
                location: string;
                tutor: string;
                type: string;
                date: string;
            }>;
        };
        //(학생) 온라인 강의 상세
        type classJoinDetailItem = {
            id: number;
            title: string;
            link: string;
            introduce: string;
            duration: string;
        };
        //(학생) 현재진행 강의 > 강의참여
        type classJoinList = {
            plan_list: Array<{ id: number; week: number; title: string; type: string }>;
        };
        //(목사) 학생출석관리
        type classAttendenceItem = {
            total_student: number;
            type: string;
            student_list: Array<{
                id: number;
                name: string;
                duty: string;
                first_division: string;
                second_division: string;
                phone_number: string;
                status: string;
            }>;
        };
    }
}
