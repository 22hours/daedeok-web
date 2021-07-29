//  ./@types/custom-types/index.d.ts
declare module "@global_types" {
    export namespace meta_types {
        type user = {
            user_id: string;
            name: string;
            role: "ROLE_MEMBER";
            duty: string;
            lecture_num: 3;
            access_token: string;
            refresh_token: string;
        };
    }
    export namespace req_types {}
    export namespace res_types {}
}
