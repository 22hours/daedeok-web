import React, { useEffect, useState, useRef } from "react";
import style from "./GuideDetail.module.scss";
import { res_types } from "@global_types";
import dynamic from "next/dynamic";
import Link from "next/link";

//component
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import TableRow from "@ui/board/TableRow";
import TableWrapper from "@ui/board/TableWrapper";

//store
import { useAuthStore } from "store/AuthStore";
import { useAlert } from "store/GlobalAlertStore";
import { useConfirm } from "store/GlobalConfirmStore";
import { useRouter } from "next/router";

const TextViewer = dynamic(() => import("components/molecule/TextViewer/TextViewer"), { ssr: false });

type State = res_types.faqDetail;

const GuideDetail = ({ articleId }) => {
    const router = useRouter();
    const { auth, clientSideApi } = useAuthStore();
    const [noticeDetailData, setNoticeDetailData] = useState<State | null>(null);
    const { alertOn, apiErrorAlert } = useAlert();
    const { confirmOn } = useConfirm();

    useEffect(() => {
        if (articleId) {
            getGuideDetail();
        }
    }, [articleId]);

    const getGuideDetail = async () => {
        const res = await clientSideApi("GET", "MAIN", "GUIDE_FIND_DETAIL", {
            article_id: articleId,
        });
        if (res.result === "SUCCESS") {
            const data: State = res.data;
            setNoticeDetailData(data);
        }
    };

    //공지사항 삭제
    const handleDelete = async () => {
        confirmOn({
            message: "삭제하시겠습니까?",
            onSuccess: async () => {
                const res = await clientSideApi("DELETE", "MAIN", "GUIDE_DELETE", {
                    article_id: articleId,
                });
                if (res.result === "SUCCESS") {
                    alertOn({
                        title: "",
                        //@ts-ignore
                        message: "삭제되었습니다",
                        type: "POSITIVE",
                    });
                    location.replace("/acinfo/guide");
                } else {
                    apiErrorAlert(res.msg);
                }
            },
        });
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
                            <Link href={`/acinfo/guide/detail/${noticeDetailData.after.id}`} passHref>
                                <TableRow icon={true} iconType={"after"} title={noticeDetailData.after?.title} />
                            </Link>
                        )}
                        {noticeDetailData.before && (
                            <Link href={`/acinfo/guide/detail/${noticeDetailData.before.id}`} passHref>
                                <TableRow icon={true} iconType={"before"} title={noticeDetailData.before?.title} />
                            </Link>
                        )}
                    </TableWrapper>
                </div>
                <div className={style.bottom_btn_wrapper}>
                    {auth?.role === "ROLE_ADMIN" && (
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
                            <Link href={`/acinfo/guide/edit/${noticeDetailData.id}`} passHref>
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
                    <Link href={"/acinfo/guide"} passHref>
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
export default GuideDetail;
