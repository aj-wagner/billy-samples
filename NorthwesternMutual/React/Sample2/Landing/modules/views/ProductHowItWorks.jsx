import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import "./ImageAnimation.css";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.common.white,
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(10),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(10),
  },
  image: {
    height: 55,
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(8),
  },
  text: {
    marginBottom: theme.spacing(1),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="https://material-ui.com/static/themes/onepirate/productValues2.svg"
                  alt="match"
                  style={{
                    animation: "rotation 5s infinite linear",
                  }}
                />
                <Typography variant="h6" className={classes.text}>
                  Create or Join Match
                </Typography>
                <Typography variant="h5" style={{ textAlign: "justify" }}>
                  {
                    "From the latest trendy matches to the just-for-fun games, break a sweat and meet new friends within the range of your feet."
                  }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="https://material-ui.com/static/themes/onepirate/productValues1.svg"
                  alt="venue"
                  style={{
                    animation: "move 7s",
                    animationIterationCount: "infinite",
                  }}
                />
                <Typography variant="h6" className={classes.text}>
                  Pick Venue
                </Typography>
                <Typography variant="h5" style={{ textAlign: "justify" }}>
                  {"Booking venue could not have been easier! "}
                  {
                    "Book the perfect spot for your important games with a single click."
                  }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="https://material-ui.com/static/themes/onepirate/productValues3.svg"
                  alt="referee"
                  style={{
                    animation: "shake 0.82s",
                    animationIterationCount: "infinite",
                  }}
                />
                <Typography variant="h6" className={classes.text}>
                  Find Referee
                </Typography>
                <Typography variant="h5" style={{ textAlign: "justify" }}>
                  {
                    "Gain access to the A-list referee in your area. You will have special access to specially negotiated referees whoever you want."
                  }
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
