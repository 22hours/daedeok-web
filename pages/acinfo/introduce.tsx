import React, { useState, useEffect } from "react";
import { useAlert } from "store/GlobalAlertStore";
type Props = {};

const Introduce = () => {
    const { alertOn } = useAlert();
    return (
        <div>
            <h2>introduce</h2>
            <button
                onClick={() =>
                    alertOn({
                        title: "에러가 발생하였습니다",
                        message: "서버와의 연결상태가 좋지 않습니다",
                        type: "POSITIVE",
                    })
                }
            >
                POSITIVE ALERT !
            </button>
            <button
                onClick={() =>
                    alertOn({
                        title: "에러가 발생하였습니다",
                        message: "서버와의 연결상태가 좋지 않습니다",
                        type: "ERROR",
                    })
                }
            >
                ERROR !
            </button>
            <button
                onClick={() =>
                    alertOn({
                        title: "에러가 발생하였습니다",
                        message: "서버와의 연결상태가 좋지 않습니다",
                        type: "WARN",
                    })
                }
            >
                WARN !
            </button>
            <button
                onClick={() =>
                    alertOn({
                        title: "에러가 발생하였습니다",
                        message: "서버와의 연결상태가 좋지 않습니다",
                    })
                }
            >
                DEFAILT !
            </button>
        </div>
    );
};

export default Introduce;
