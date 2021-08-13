import React, { useEffect, useState, useRef } from "react";
import style from "./NoticeDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";
//component
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import { nanoid } from "nanoid";
import TextArea from "@ui/input/TextArea";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";
//controller
import DateController from "lib/client/dateController";

//store
import { useAuthStore } from "store/AuthStore";
import CommentList from "../CommentList/CommentList";
import { useRouter } from "next/router";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.noticeDetail;

const NoticeDetail = ({ noticeId }) => {
    const router = useRouter();
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);

    useEffect(() => {
        if (noticeId) {
            getTutorNotieDetail();
        }
    }, [noticeId]);

    //공지사항 상세 data
    const getTutorNotieDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "TOTAL_NOTICE_FIND_DETAIL", {
            article_id: noticeId,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setNoticeDetailData(data);
        }
    };

    //공지사항 삭제
    const handleDelete = async () => {
        const flag = confirm("삭제하시겠습니까?");
        if (flag) {
            const res = await clientSideApi("DELETE", "MAIN", "TOTAL_NOTICE_DELETE", {
                article_id: noticeId,
            });
            if (res.result === "SUCCESS") {
                alert("삭제되었습니다.");
                location.replace("/acinfo/notice");
            } else {
                alert("다시 시도해주세요");
            }
        }
    };

    if (noticeDetailData === null) {
        return <div>NOW LOAD</div>;
    } else {
        return (
            <div className={style.tutor_notice_detail}>
                <div className={style.header_title}>
                    <Typo
                        //@ts-ignore
                        content={noticeDetailData?.title}
                        type="TEXT"
                        size="large"
                    />
                    <Typo
                        type="TEXT"
                        color={"gray_accent"}
                        size="small"
                        content={DateController.getFormatedDate("YYYY/MM/DD", noticeDetailData?.create_date)}
                    />
                </div>
                <div className={style.content}>
                    <TextViewer
                        //@ts-ignore
                        content={noticeDetailData?.content}
                    />
                </div>

                <div className={style.before_after_wrapper}>
                    <TableWrapper>
                        {noticeDetailData.after && (
                            <Link href={`/acinfo/notice/detail/${noticeDetailData.after.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"after"}
                                    title={noticeDetailData.after?.title}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        noticeDetailData.after?.create_date
                                    )}
                                />
                            </Link>
                        )}
                        {noticeDetailData.before && (
                            <Link href={`/acinfo/notice/detail/${noticeDetailData.before.id}`} passHref>
                                <TableRow
                                    icon={true}
                                    iconType={"before"}
                                    title={noticeDetailData.before?.title}
                                    date={DateController.getFormatedDate(
                                        "YYYY-MM-DD",
                                        noticeDetailData.before?.create_date
                                    )}
                                />
                            </Link>
                        )}
                    </TableWrapper>
                </div>
                <div className={style.bottom_btn_wrapper}>
                    {noticeDetailData?.user_id.toString() === auth?.user_id.toString() && (
                        <>
                            <Button
                                type="SQUARE"
                                size="smaller"
                                fontSize="smaller"
                                backgroundColor="gray_accent"
                                content="글삭제"
                                color="white"
                                className={style.bottom_btn_style}
                                onClick={handleDelete}
                            />
                            <Link href={`/acinfo/notice/edit/${noticeDetailData.id}`} passHref>
                                <Button
                                    type="SQUARE"
                                    size="smaller"
                                    fontSize="smaller"
                                    backgroundColor="yellow_accent"
                                    content="수정"
                                    color="white"
                                    className={style.bottom_btn_style}
                                />
                            </Link>
                        </>
                    )}
                    <Link href={"/acinfo/notice"} passHref>
                        <Button
                            type="SQUARE"
                            size="smaller"
                            fontSize="smaller"
                            backgroundColor="yellow_accent"
                            content="목록보기"
                            color="white"
                            className={style.bottom_btn_style}
                        />
                    </Link>
                </div>
            </div>
        );
    }
};
export default NoticeDetail;
