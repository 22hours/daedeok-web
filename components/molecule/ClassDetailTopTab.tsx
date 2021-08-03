import { useRouter } from "next/router";
import { meta_types } from "@global_types";
import { useEffect, useState } from "react";
import { RouteController } from "lib/RouteController";
import { useAuthStore } from "store/AuthStore";
import style from "./ClassDetailTopTab.module.scss";
import Button from "@ui/buttons/Button";
import Link from "next/link";
type Props = {
    class_id: string;
    status: meta_types.classStatus;
};
type State = { name: string; link: string; isOn: boolean }[];

const ClassDetailTopTab = (props: Props) => {
    const router = useRouter();
    const { auth } = useAuthStore();
    const [tabList, setTabList] = useState<State>([]);
    useEffect(() => {
        if (props.status && props.class_id) {
            var tempList: State = [];
            for (const [_, value] of Object.entries(RouteController.class.childPage[props.status].childPage)) {
                //@ts-ignore
                const pageValue: {
                    name: string;
                    pathname: string;
                    isDynamic: boolean;
                    as: ({ class_id: string }) => string;
                    accessRole?: "ROLE_TUTOR" | "ROLE_MEMBER";
                } = value;

                if (!pageValue.accessRole || pageValue.accessRole === auth?.role) {
                    const pageLink = pageValue.as({ class_id: props.class_id });
                    tempList.push({
                        name: pageValue.name,
                        link: pageLink,
                        isOn: router.asPath.includes(pageLink),
                    });
                }
            }
            setTabList(tempList);
        }
    }, [props]);

    if (auth) {
        return (
            <div className={style.container}>
                <div className={style.tabCotnainer}>
                    {tabList &&
                        tabList.map((it, idx) => (
                            <Link key={`classtoptab${idx}`} href={it.link}>
                                <Button
                                    className={style.tabButton}
                                    type={"SQUARE"}
                                    size={"free"}
                                    fontSize={"smaller"}
                                    color={it.isOn ? "white" : "brown_base"}
                                    backgroundColor={it.isOn ? "mint_accent" : "white"}
                                    content={it.name}
                                />
                            </Link>
                        ))}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default ClassDetailTopTab;
