import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 0,
  },
  footer: {
    marginTop: "auto",
  },
}));
export default function Copyright() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ marginTop: "auto" }}
          >
            {"© WOIKS TEAM 2020."}
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
