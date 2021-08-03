import style from "./ProgressBar.module.scss";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import Typo from "./Typo";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 40,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#29b4aa",
    },
}))(LinearProgress);

type Props = {
    progress: number;
};

const ProgressBar = ({ progress }: Props) => {
    return (
        <div className={style.container}>
            <div className={style.percent_container}>
                <Typo
                    type={"TEXT"}
                    size={"medium"}
                    color={progress > 50 ? "white" : "brown_base"}
                    content={`${progress.toFixed(0)}%`}
                    className={style.typo}
                />
            </div>
            <BorderLinearProgress variant="determinate" value={progress} />
        </div>
    );
};

export default ProgressBar;
