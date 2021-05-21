import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
    backgroundColor: theme.palette.grey.main,
    color: theme.palette.common.white,
    bottom: 0,
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignContent: "center",
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Container component="footer" className={classes.root}>
      <Typography className={classes.container}>
        {"© WOIKS Team "}
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
}
