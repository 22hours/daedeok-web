import React, { useState, useRef, cloneElement, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { useRouter } from "next/dist/client/router";

type Props = {
    isOpen: boolean;
    toggleDrawer: () => void;
    drawerButtonChildren: JSX.Element;
    drawerInnerChildren: JSX.Element;
    drawerAnchor: "left" | "right" | "top" | "bottom";
};
const Drawer = (props: Props) => {
    const DrawerButton = (LocalProps) =>
        cloneElement(props.drawerButtonChildren, {
            onClick: () => props.toggleDrawer(),
            ...LocalProps,
        });

    const DrawerInner = (LocalProps) => cloneElement(props.drawerInnerChildren, { ...LocalProps });
    const router = useRouter();

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (props.isOpen) {
            props.toggleDrawer();
        }
    }, [router.asPath]);

    return (
        <>
            <DrawerButton />
            <SwipeableDrawer
                anchor={props.drawerAnchor}
                open={props.isOpen}
                onClose={props.toggleDrawer}
                onOpen={props.toggleDrawer}
            >
                <DrawerInner />
            </SwipeableDrawer>
        </>
    );
};

export default Drawer;
