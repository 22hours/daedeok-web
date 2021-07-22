import React, { Component } from "react";
import Link from "next/link";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
} from "@material-ui/core";
import { Menu, ChevronLeft, Home, Inbox, Mail } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";

const drawerWidth = 240;

const Layout = ({ children, pageProps }: { children: JSX.Element | JSX.Element[]; pageProps?: any }) => {
    const router = useRouter();
    return <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>HIHI{children}</div>;
};
export default Layout;
