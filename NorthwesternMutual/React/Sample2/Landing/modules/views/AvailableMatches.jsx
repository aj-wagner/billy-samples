import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import MatchCard from "../../../Components/MatchCard";
import { GridList } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    display: "stretch",
    backgroundColor: theme.palette.common.white,
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cardContainer: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    height: 275,
    overflowY: "hidden",
  },
});

function AvailableMatches(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          align="center"
          component="h2"
          color="inherit"
          border="auto"
          style={{ paddingBottom: 50, paddingTop: 25 }}
        >
          Available Matches
        </Typography>
        <GridList className={classes.cardContainer} cols={2}>
          {props.matches.map((match) => {
            return (
              <div key={match.id}>
                <MatchCard match={match} disabled={true} />
              </div>
            );
          })}
        </GridList>
      </Container>
    </section>
  );
}

AvailableMatches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvailableMatches);
