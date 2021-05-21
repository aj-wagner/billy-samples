import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

const styles = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
    top: 0,
  },
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(3),
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            font="tahoma"
          >
            <img
              src={require("../../../Assets/appbarlogo.png")}
              alt="logo"
              width="50"
              height="55"
              display="flex"
              flex="1"
              style={{ textAlign: "left", marginTop: 5 }}
            />
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/signin"
            >
              {"Sign In"}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/signup"
            >
              {"Sign Up"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
