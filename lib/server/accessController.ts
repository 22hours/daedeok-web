import { meta_types } from "@global_types";
import cookies from "next-cookies";

export const isAccessAble = (ctx, role: meta_types.accessRole): boolean => {
    const allCookies = cookies(ctx);

    if (role) {
        switch (role) {
            case "ROLE_ALL":
                return allCookies.role !== undefined;
            case "ROLE_MEMBER":
            case "ROLE_TUTOR":
            case "ROLE_ADMIN":
                return allCookies.role === role;
            default:
                return false;
        }
    } else {
        return true;
    }
};
