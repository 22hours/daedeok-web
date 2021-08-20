import CookieController from "lib/client/cookieController";
import { SecureRoute } from "lib/server/accessController";
import { useEffect } from "react";
import dynamic from "next/dynamic";

type Props = {};

const DynamicLogout = dynamic(() => import("components/molecule/DynamicLogout/DynamicLogout"), { ssr: false });

const Logout = (props: Props) => {
    return <DynamicLogout />;
};

export async function getSwerverSideProps(ctx) {
    return SecureRoute(ctx, "ROLE_ALL");
}

export default Logout;
