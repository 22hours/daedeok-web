import React, { useState, cloneElement } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

type Props = {
    drawerButtonChildren: JSX.Element;
    drawerInnerChildren: JSX.Element;
    drawerAnchor: "left" | "right" | "top" | "bottom";
};
const Drawer = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const DrawerButton = (LocalProps) =>
        cloneElement(props.drawerButtonChildren, {
            onClick: () => toggleDrawer(),
            ...LocalProps,
        });

    const DrawerInner = (LocalProps) => cloneElement(props.drawerInnerChildren, { ...LocalProps });

    return (
        <>
            <DrawerButton />
            <SwipeableDrawer anchor={props.drawerAnchor} open={isOpen} onClose={toggleDrawer} onOpen={toggleDrawer}>
                <DrawerInner />
            </SwipeableDrawer>
        </>
    );
};

export default Drawer;
