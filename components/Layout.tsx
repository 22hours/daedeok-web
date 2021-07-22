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

const drawerWidth = 240;

class Layout extends Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { children } = this.props;
        const { open } = this.state;
        return (
            <section>
                <AppBar
                    position="static"
                    style={{
                        width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                        marginLeft: open ? drawerWidth : 0,
                        transition: "all 0.2s",
                    }}
                >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.handleDrawerOpen}>
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            Static Website
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="persistent" open={open}>
                    <div style={{ width: drawerWidth }}>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeft />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <Link href="/">
                                <a>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                </a>
                            </Link>
                            <Link href="/post">
                                <a>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Inbox />
                                        </ListItemIcon>
                                        <ListItemText primary="Post" />
                                    </ListItem>
                                </a>
                            </Link>
                            <Link href="/about">
                                <a>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Mail />
                                        </ListItemIcon>
                                        <ListItemText primary="About" />
                                    </ListItem>
                                </a>
                            </Link>
                        </List>
                    </div>
                </Drawer>
                <Container>
                    <article
                        style={{
                            width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                            marginLeft: open ? drawerWidth : 0,
                            transition: "all 0.2s",
                            margin: "16px 0",
                        }}
                    >
                        {children}
                    </article>
                </Container>
            </section>
        );
    }
}

export default Layout;
