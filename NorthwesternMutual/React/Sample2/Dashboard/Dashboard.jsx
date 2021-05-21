import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Link,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItems from "./ListItems";
import ProfilePage from "./ProfilePage";
import Copyright from "./Copyright";
import MatchPage from "./MatchPage";
import VenuePage from "./VenuePage";
import RefereePage from "./RefereePage";
import MatchHistoryPage from "./MatchHistoryPage";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#05294b",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  flexGrow: {
    flexGrow: 1,
  },
});

class Dashboard extends Component {
  state = {
    open: true,
    content: "1",
    lat: "",
    lon: "",
    match: [],
    options: [],
  };

  componentDidMount() {
    fetch(
      "http://api.ipstack.com/check?access_key=8f0af5c4d95ea86b0ae3944323331ad0",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.setState({ lat: res.latitude });
        this.setState({ lon: res.longitude });
      })
      .catch((err) => console.error("Problem fetching my IP", err));

    fetch("http://35.163.180.234/api/match/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ match: res });
      })
      .catch((error) => alert(error));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  setContent = (c) => {
    this.setState({ content: c });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/dashboard"
              font="tahoma"
            >
              <img
                src={require("../Assets/appbarlogo.png")}
                alt="logo"
                width="50"
                height="55"
                display="flex"
                flex="1"
                style={{ textAlign: "left", marginTop: 5 }}
              />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            ),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <ListItems onClick={this.setContent} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                {this.state.content === "1" ? (
                  <MatchPage
                    match={this.state.match}
                    lat={this.state.lat}
                    lon={this.state.lon}
                  />
                ) : null}
                {this.state.content === "2" ? <VenuePage /> : null}
                {this.state.content === "3" ? <RefereePage /> : null}
                {this.state.content === "4" ? <ProfilePage /> : null}
                {this.state.content === "5" ? (
                  <MatchHistoryPage match={this.state.match} />
                ) : null}
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
