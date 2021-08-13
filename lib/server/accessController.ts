import { meta_types } from "@global_types";
import cookies from "next-cookies";

const isAccess = (cookieRole, accessAbleRole) => {
    if (accessAbleRole) {
        switch (accessAbleRole) {
            case "ROLE_ALL":
                return cookieRole !== undefined;
            case "ROLE_MEMBER":
            case "ROLE_TUTOR":
            case "ROLE_ADMIN":
                return cookieRole === accessAbleRole || cookieRole === "ROLE_ADMIN";
            default:
                return true;
        }
    } else {
        return true;
    }
};

export const SecureRoute = async (ctx, role: meta_types.accessRole, getDataFunc?: Function, redirectUrl?: string) => {
    const allCookies = cookies(ctx);
    const flag = isAccess(allCookies.role, role);
    if (flag) {
        const additionalData = getDataFunc ? await getDataFunc() : undefined;
        console.log(additionalData);
        return {
            props: additionalData ? { ...additionalData } : {},
        };
    } else {
        return {
            redirect: {
                destination: redirectUrl || `/login?require_role=${role}`,
                permanent: false,
            },
        };
    }
};
