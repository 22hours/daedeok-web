import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import style from "./GlobalLoader.module.scss";
import { useGlobalLoader } from "store/GlobalLoader";
type Props = {};

const GlobalLoader = (props: Props) => {
    const loader = useGlobalLoader();
    return (
        <Backdrop open={loader.value}>
            <CircularProgress color={"primary"} />
        </Backdrop>
    );
};

export default GlobalLoader;
