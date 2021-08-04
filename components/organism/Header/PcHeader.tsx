import Typo from "@ui/Typo";
import DropdownButton from "@ui/buttons/DropdownButton";
import style from "./PcHeader.module.scss";
import { RouteController } from "lib/RouteController";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { nanoid } from "nanoid";

type Props = {};

const isInPath = (nowPath, buttonPath) => {
    const nowPathInDouble = nowPath.split("/").slice(0, 3).join("/");
    return nowPathInDouble === buttonPath;
};

const PcHeader = () => {
    const router = useRouter();
    const nowPathName = router.pathname;
    const nowAsPath = router.asPath;

    return (
        <div className={style.container}>
            {Object.keys(RouteController).map((first_key) => {
                const fisrtItem = RouteController[first_key];
                if (fisrtItem.isVisible) {
                    const currentFirstPath = `/${nowPathName.split("/")[1]}`;
                    const extraClassName = currentFirstPath === fisrtItem.pathname && style.parent_on;
                    if (fisrtItem.isDropdown) {
                        const curDropdownItem = Object.keys(fisrtItem.childPage).map((second_key) => {
                            const secondItem = fisrtItem.childPage[second_key];
                            const url = secondItem.isDynamic ? secondItem.as() : secondItem.pathname;
                            const isOn = isInPath(nowAsPath, url);
                            return {
                                text: secondItem.name,
                                url: url,
                                className: isOn ? style.child_on : undefined,
                            };
                        });
                        return (
                            <DropdownButton
                                key={`pcheaderdrbtn${nanoid()}`}
                                className={extraClassName || undefined}
                                mainText={fisrtItem.name}
                                childButtonItem={curDropdownItem}
                                mainButtonSize={"small"}
                                mainFontSize={"smaller"}
                                mainBackgroundColor={"white"}
                                mainTextColor={"brown_font"}
                                childButtonSize={"small"}
                                childFontSize={"smaller"}
                                childTextColor={"white"}
                            />
                        );
                    } else {
                        return (
                            <div
                                key={`pcheaderndrbtn${nanoid()}`}
                                className={`${style.header_wrapper} ${extraClassName}`}
                            >
                                <Link href={fisrtItem.pathname} passHref>
                                    <div className={`${style.square} ${style.small} ${style.white}`}>
                                        <Typo
                                            type={"BUTTON"}
                                            size={"smaller"}
                                            color={"brown_font"}
                                            content={fisrtItem.name}
                                        />
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                }
            })}
        </div>
    );
};

export default PcHeader;
