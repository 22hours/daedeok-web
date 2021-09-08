//  ./@types/custom-types/index.d.ts
declare module "@global_types" {
    export namespace meta_types {
        type Category = "CLASS" | "CLASS_BOARD" | "QNA";
        type BreadCrumbItem = { name: string; link: string };
        type classStatus = "OPEN" | "CLOSE" | "COMPLETE";
        type accessRole = "ROLE_ALL" | "ROLE_MEMBER" | "ROLE_TUTOR" | "ROLE_ADMIN";
        type user = {
            user_id: string;
            name: string;
            role: "ROLE_MEMBER" | "ROLE_TUTOR" | "ROLE_ADMIN";
            duty: string;
            lecture_num: 3;
            phone_num: string;
            first_division: string;
            second_division: string;
            access_token: string;
            refresh_token: string;
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

        type ListItem = {
            faqItem: { id: string; user_id: string; title: string };
            qnaList: {
                id: string;
                user_id: string;
                title: string;
                category: string;
                author: string;
                secret: boolean;
                create_date: string;
                view: string;
            };
            noticeItem: {
                id: string;
                user_id: string;
                title: string;
                create_date: string;
            };
            categoryItem: {
                id: string;
                category: string;
                content: string;
                create_date: string;
            };
            lectureItem: {
                id: string;
                title: string;
                category: string;
                start_date: string;
                end_date: string;
                student_limit: string;
                student_num: string;
            };
            userItem: {
                id: string;
                name: string;
                duty: string;
                first_division: string;
                second_division: string;
                phone_num: string;
            };
        };
        type ListType = {
            faq_list?: faqItem[];
            qna_list?: qnaList[];
            notice_list?: noticeItem[];
            category_list?: categoryItem[];
            lecture_list?: lectureItem[];
            user_list?: userItem[];
        };
    }
    export namespace class_types {
        type Division = {
            first_division: string;
            second_division: string;
        };
        type Handout = {
            name: string;
            url: string;
        };
        type CommonPlan = {
            id?: string;
            type: meta_types.classType;
            week: string;
            title: string;
            tutor: string;
            location: string;
            date: string;
            time: string;
        };
        type OnlinePlan = {
            video_link: string;
            introduce: string;
        };
        type ZoomPlan = {
            zoom_link: string;
        };
        type PlanType = "OFFLINE" | "ZOOM" | "ONLINE";
        type PlanItem = CommonPlan | (CommonPlan & OnlinePlan) | (CommonPlan & ZoomPlan);
        type ClassInfo = {
            title: string;
            content: string;
            category: string;
            division_list: division[];
            student_limit: number;
            reference: string;
            handout_list: handout[];
            plan_list: PlanItem[];
            day: string;
            time: string;
        };
    }
    export namespace req_types {
        // FOR CLASS MAIN
        type LectureItem = {
            lecture_id: string;
            seq_num: srting;
            title: string;
            type: meta_types.classType[];
            start_date: string;
            end_date: string;
            student_limit: string;
            student_num: string;
        };
        type BoardSummary = {
            board_id: string;
            title: string;
            category: string;
            create_date: string;
        };
        type BoardItem = {
            lecture_id: string;
            lecture_title: string;
            boardSummaryList: BoardSummary[];
        };
        type NoticeItem = {
            notice_id: string;
            title: string;
            create_date: string;
        };

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
        type noticeList = {
            notice_list: Array<{
                id: number;
                user_id: number;
                title: string;
                create_date: string;
            }>;
            total_count: number;
            total_page?: number;
        };
        type faqList = {
            faq_list: Array<{
                id: number;
                user_id: number;
                title: string;
            }>;
            total_count: number;
            total_page?: number;
        };
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
            reference: string;
            lecture_plan: Array<{ week: number; title: string; tutor: string; location: string }>;
        };
        //(공통) 강의 게시판 상세
        type classBoardDetail = {
            id: number;
            user_id: number;
            title: string;
            category: string;
            content: string;
            author: string;
            create_date: string;
            view: number;
            comment_list: CommentItem[];
            after: {
                id: number;
                user_id: number;
                title: string;
                category: string;
                author: string;
                create_date: string;
            };
            before: {
                id: number;
                user_id: number;
                title: string;
                category: string;
                author: string;
                create_date: string;
            };
        };
        // 현재 진행중인 강의 리스트
        type classPossibleList = {
            lecture_list: Array<{
                id: number;
                title: string;
                category: string;
                start_date: string;
                end_date: string;
                student_limit: number;
                student_num: number;
                status: "IMPOSSIBLE" | "POSSIBLE" | "ING";
            }>;
            total_count: number;
            total_page?: number;
        };
        // 종료된 강의 리스트
        type classCompleteList = {
            lecture_list: Array<{
                id: number;
                title: string;
                category: string;
                start_date: string;
                end_date: string;
            }>;
            total_count: number;
            total_page?: number;
        };
        type lectureFindList = {
            lecture_list: Array<{
                id: number;
                title: string;
                category: string;
                start_date: string;
                end_date: string;
            }>;
            total_count: number;
            total_page?: number;
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
        type studentAttendanceList = {
            studentAttendanceList: Array<{
                id: number;
                week: number;
                title: string;
                status: string;
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
        //(목사) 공지사항리스트
        type tutorNoticeListItem = {
            notice_list: Array<{ id: number; user_id: number; author: string; title: string; create_date: string }>;
            total_count: number;
            total_page?: number;
        };
        type CommentItem = {
            id: string;
            user_id: string;
            author: string;
            content: string;
            create_date: string;
            parent_id?: string;
            children: CommentItem[];
        };
        type tutorNoticeDetail = {
            id: number;
            user_id: number;
            title: string;
            content: string;
            create_date: string;
            comment_list: CommentItem[];
            after: { id: number; user_id: number; title: string; create_date: string };
            before: { id: number; user_id: number; title: string; create_date: string };
        };

        type qnaDetailList = {
            id: number;
            user_id: number;
            title: string;
            category: string;
            content: string;
            author: string;
            create_date: string;
            secret: boolean;
            view: number;
            comment_list: CommentItem[];
            after: {
                id: number;
                user_id: number;
                title: string;
                category: string;
                author: string;
                view: number;
                secret: boolean;
                create_date: string;
            };
            before: {
                id: number;
                user_id: number;
                title: string;
                category: string;
                author: string;
                create_date: string;
                secret: boolean;
                view: number;
            };
        };
        type noticeDetail = {
            id: number;
            user_id: number;
            title: string;
            content: string;
            create_date: string;
            after: { id: number; user_id: number; title: string; create_date: string };
            before: { id: number; user_id: number; title: string; create_date: string };
        };
        type faqDetail = {
            id: number;
            user_id: number;
            title: string;
            content: string;
            after: { id: number; user_id: number; title: string; create_date: string };
            before: { id: number; user_id: number; title: string; create_date: string };
        };
    }
}
