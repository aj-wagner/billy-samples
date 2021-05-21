import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./button.css";

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "93vh",
  },
  container: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    zIndex: -1,
    height: "100vh",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
    height: "100vh",
  },
  html: {
    scrollBehavior: "smooth",
  },
});

function ProductHeroLayout(props) {
  const { backgroundClassName, children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
        <a
          href="#section"
          style={{ textDecoration: "none", marginTop: 40, marginBottom: 50 }}
        >
          <button className="button">
            <div className="buttonH"></div>
            <div className="buttonV"></div>
            Discover the Experience
          </button>
        </a>
      </Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHeroLayout);
