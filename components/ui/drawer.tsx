import React, { useState, cloneElement } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

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
