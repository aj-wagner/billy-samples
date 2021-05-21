import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchHistoryCardPast from "./MatchHistoryCardPast";
import MatchHistoryCardActive from "./MatchHistoryCardActive";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../auth/Auth";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../Landing/modules/components/Typography";

const styles = makeStyles((theme) => ({}));

function MatchHistoryPage(props) {
  const { classes } = props;
  const { currentUser } = useContext(AuthContext);
  const match = props.match;

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "-" + dd + "-" + yyyy;
  const pastMatch = [];
  const activeMatch = [];
  var date;
  var time;
  var year;
  var month;
  var day;

  for (let i = 0; i < match.length; i++) {
    date =
      /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (
      parseInt(year) <= parseInt(yyyy) &&
      (parseInt(month) < parseInt(mm) ||
        (parseInt(month) === parseInt(mm) && parseInt(day) < parseInt(dd)))
    ) {
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
          pastMatch.push(match[i]);
        }
      }
    }
  }

  for (let i = 0; i < match.length; i++) {
    date =
      /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (
      parseInt(year) >= parseInt(yyyy) &&
      (parseInt(month) > parseInt(mm) ||
        (parseInt(month) === parseInt(mm) && parseInt(day) >= parseInt(dd)))
    ) {
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
          activeMatch.push(match[i]);
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <p>
        Current Date : {today} Current User Email: {currentUser.email}
      </p>
      <Typography
        variant="h4"
        marked="center"
        align="center"
        component="h2"
        color="inherit"
        border="auto"
        style={{ paddingBottom: 50, paddingTop: 25 }}
      >
        Active Matches
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        {activeMatch.map((match) => {
          return (
            <div key={match.id}>
              <MatchHistoryCardActive match={match} disabled={true} />
            </div>
          );
        })}
      </Grid>
      <Typography
        variant="h4"
        marked="center"
        align="center"
        component="h2"
        color="inherit"
        border="auto"
        style={{ paddingBottom: 50, paddingTop: 25 }}
      >
        Past Matches
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          {pastMatch.map((match) => {
            return (
              <div key={match.id}>
                <MatchHistoryCardPast match={match} disabled={true} />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MatchHistoryPage);
