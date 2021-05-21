import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import "../../style.css";
import "./ImageAnimation.css";

const backgroundImage = require("../../../Assets/hero_background.jpg");

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: theme.palette.secondary.light,
    backgroundPosition: "center",
    backgroundPositionY: "25%",
    backgroundSize: "200% 125%",
    animation: `gradientImg 15s ease infinite`,
  },
  button: {
    minWidth: 200,
  },
  h1: {
    marginTop: theme.spacing(20),
  },
  h5: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img alt="" style={{ display: "none" }} src={backgroundImage} />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        SPORTS TEAMMATES FOR U
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Sports networking made easy.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        component="a"
        href="/signup"
      >
        Register
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
