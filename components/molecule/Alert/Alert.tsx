import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import style from "./Alert.module.scss";
import { useAlert } from "store/GlobalAlertStore";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
type Props = {};
const Alert = () => {
    const { state, alertOff } = useAlert();

    if (state.isOpen) {
        return (
            <Dialog
                open={state.isOpen}
                onClose={alertOff}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {state.title && (
                    <DialogTitle id="alert-dialog-title">
                        <Typo
                            className={`${style[state.type.toLowerCase()]}`}
                            type={"TEXT"}
                            size={"smaller"}
                            content={state.title}
                            color={"gray_accent"}
                        />
                    </DialogTitle>
                )}
                <DialogContent>
                    <Typo type={"TEXT"} size={"small"} content={state.message} />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={`${style[`${state.type.toLowerCase()}_btn`]} ${style.btn}`}
                        type={"TEXT"}
                        size={"small"}
                        content={"확인"}
                        fontSize={"smaller"}
                        onClick={alertOff}
                    />
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            <Dialog
                open={state.isOpen}
                onClose={alertOff}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            ></Dialog>
        );
    }
};

export default Alert;
