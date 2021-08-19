import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import style from "./Confirm.module.scss";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import { useConfirm } from "store/GlobalConfirmStore";
type Props = {};
const Confirm = () => {
    const { state, setState } = useConfirm();
    if (state.isOpen) {
        return (
            <Dialog
                open={state.isOpen}
                onClose={() => setState({ isOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {state.title && (
                    <DialogTitle id="alert-dialog-title">
                        <Typo type={"TEXT"} size={"smaller"} content={state.title} color={"gray_accent"} />
                    </DialogTitle>
                )}
                <DialogContent>
                    <Typo type={"TEXT"} size={"small"} content={state.message} />
                </DialogContent>
                <DialogActions>
                    <div className={style.btn_row}>
                        <Button
                            className={`${style.error_btn} ${style.btn}`}
                            type={"TEXT"}
                            size={"small"}
                            content={"취소"}
                            fontSize={"smaller"}
                            onClick={() => {
                                setState({ isOpen: false });
                                state.onFail && state.onFail();
                            }}
                        />
                        <Button
                            className={`${style.positive_btn} ${style.btn}`}
                            type={"TEXT"}
                            size={"small"}
                            content={"확인"}
                            fontSize={"smaller"}
                            onClick={() => {
                                setState({ isOpen: false });
                                state.onSuccess();
                            }}
                        />
                    </div>
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            <Dialog
                open={state.isOpen}
                onClose={() => setState({ isOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            ></Dialog>
        );
    }
};

export default Confirm;
