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
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

const ProgressBar = ({ value, setValue }: Props) => {
    React.useEffect(() => {
        const timer = setInterval(() => {
            setValue((prevProgress) => (prevProgress >= 100 ? 1 : prevProgress + 1));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div className={style.container}>
            <div className={style.percent_container}>
                <Typo
                    type={"TEXT"}
                    size={"medium"}
                    color={value > 50 ? "white" : "brown_base"}
                    content={`${value.toString()}%`}
                />
            </div>
            <BorderLinearProgress variant="determinate" value={value} />
        </div>
    );
};

export default ProgressBar;
