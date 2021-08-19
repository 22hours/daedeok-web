import { req_types } from "@global_types";
import Typo from "@ui/Typo";
import ClassBoardPreviewBox from "components/molecule/ClassBoardPreviewBox/ClassBoardPreviewBox";
import LecturePannel from "components/molecule/LecturePannel/LecturePannel";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/AuthStore";
import style from "./ClassMain.module.scss";
type Props = {};

type MainSectionProps = {
    sectionTitle: string;
    children: JSX.Element;
};
const MainSection = (props: MainSectionProps) => {
    return (
        <div className={style.section}>
            <Typo className={style.section_header} type={"HEADER"} size={"h4"} content={props.sectionTitle} />
            <div className={style.section_body}>{props.children}</div>
        </div>
    );
};

type State = {
    lecture_list: req_types.LectureItem[];
    board_list: req_types.BoardItem[];
    notice_list: req_types.NoticeItem[];
};
const ClassMain = () => {
    const [data, setData] = useState<State | null>(null);
    const { auth, clientSideApi } = useAuthStore();

    const getData = async () => {
        const res = await clientSideApi("GET", "MAIN", "CLASS_MAIN");
        if (res.result === "SUCCESS") {
            setData(res.data);
        } else {
            alert(res.msg);
        }
    };

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth]);

    if (auth === null || data === null) {
        return <div></div>;
    } else {
        return (
            <div className={style.container}>
                <MainSection sectionTitle={auth.role === "ROLE_TUTOR" ? "현재 진행중인 강의" : "현재 수강중인 강의"}>
                    <div>
                        {data.lecture_list.map((it, idx) => (
                            <LecturePannel key={`lectureitem${idx}`} {...it} />
                        ))}
                    </div>
                </MainSection>
                {auth?.role === "ROLE_TUTOR" && (
                    <MainSection sectionTitle={"공지 및 알림"}>
                        <div>
                            <ClassBoardPreviewBox
                                item_list={data.notice_list.map((it, idx) => {
                                    const link = `/class/notice/detail/${it.notice_id}`;
                                    const title = it.title;
                                    const date = it.create_date;
                                    return {
                                        link: link,
                                        title: title,
                                        date: date,
                                    };
                                })}
                            />
                        </div>
                    </MainSection>
                )}
                <MainSection sectionTitle={"강의별 최근 게시물"}>
                    <div className={style.box_grid}>
                        {data.board_list.map((boardItem, boardIdx) => {
                            const lecture_id = boardItem.lecture_id;
                            const lecture_title = boardItem.lecture_title;

                            const item_list: {
                                link: string;
                                title: string;
                                date?: string;
                            }[] = boardItem.boardSummaryList.map((it, idx) => {
                                const link = `/class/open/${lecture_id}/board/detail/${it.board_id}`;
                                const title = it.title;
                                const date = it.create_date;
                                return {
                                    link: link,
                                    title: title,
                                    date: date,
                                };
                            });

                            return (
                                <ClassBoardPreviewBox
                                    key={`recentboarditem${boardIdx}`}
                                    title={lecture_title}
                                    item_list={item_list}
                                />
                            );
                        })}
                    </div>
                </MainSection>
            </div>
        );
    }
};

export default ClassMain;
