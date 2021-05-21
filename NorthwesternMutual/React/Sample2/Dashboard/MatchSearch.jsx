import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MatchCard from "./MatchCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    marginTop: 30,
    marginBottom: 25,
    margin: "0 auto",
    alignItems: "center",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  button: {
    textTransform: "none",
    marginLeft: -265,
  },
}));

export default function MatchSearch(props) {
  const classes = useStyles();
  const [match, setMatch] = React.useState(null);
  const [state, setState] = React.useState({
    txt: "None",
    reset: true,
    recent: false,
    level: false,
    distance: false,
    anchorEl: null,
  });

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
  const availableMatch = [];
  var date;
  var time;
  var year;
  var month;
  var day;

  const defMatch = props.match;
  for (let i = 0; i < defMatch.length; i++) {
    date =
      /-\d\d-\d\d/.exec(defMatch[i].time) +
      "/" +
      /\d\d\d\d/.exec(defMatch[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(defMatch[i].time);
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
      availableMatch.push(defMatch[i]);
    }
  }

  var test_lat = props.lat;
  var test_lon = props.lon;

  let options = props.match.map((a) => {
    let username = a.roster[0] ? " - " + a.roster[0].username : "";
    return a.name + username + " (" + a.id + ")";
  });

  // filter sport type
  const [value, setValue] = useState(options[0]);
  let filter_match = match ? match : availableMatch;

  filter_match = filter_match.filter((filter_match) => {
    return props.type === "" || props.type === filter_match.type;
  });

  // filter skill level
  filter_match = filter_match.filter((filter_match) => {
    return (
      props.level === 0 ||
      (props.level >= filter_match.minSkill &&
        props.level <= filter_match.maxSkill)
    );
  });
  // filter distance
  filter_match = filter_match.filter((filter_match) => {
    
    var lat1 = test_lat * (Math.PI / 180);
    var lat2 = filter_match.lat * (Math.PI / 180);
    var long1 = test_lon * (Math.PI / 180);
    var long2 = filter_match.lon * (Math.PI / 180);

    var dlat = lat2 - lat1;
    var dlong = long2 - long1;

    var dist =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2);
    dist = 2 * Math.asin(Math.sqrt(dist));

    var radius = 3956;
    // distance between location and uswer
    dist = dist * radius;

    // distance should be less than f_dist
    return dist <= props.dist;
  });

  // filter time
  filter_match = filter_match.filter((filter_match) => {
    var year = filter_match.time.slice(0, 4);
    var month = filter_match.time.slice(5, 7);
    var date = filter_match.time.slice(8, 10);
    var hour = filter_match.time.slice(11, 13);
    var min = filter_match.time.slice(14, 16);
    var sec = filter_match.time.slice(17, 19);

    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    hour = parseInt(hour);
    min = parseInt(min);
    sec = parseInt(sec);

    var match_date = new Date();
    match_date.setDate(date);
    match_date.setHours(hour);
    match_date.setFullYear(year);
    match_date.setMinutes(min);
    match_date.setSeconds(sec);
    match_date.setMonth(month - 1);

    var today = new Date();
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    var output = true;

    if (props.time1 === true) {
      if (
        date === today.getDate() &&
        month === today.getMonth() + 1 &&
        year === today.getFullYear()
      ) {
        return true;
      } else {
        output = false;
      }
    }
    if (props.time2 === true) {
      if (
        date === tomorrow.getDate() &&
        month === tomorrow.getMonth() + 1 &&
        year === tomorrow.getFullYear()
      ) {
        return true;
      } else {
        output = false;
      }
    }
    if (props.time3 === true) {
      if (
        match_date.getTime() - today.getTime() > 0 &&
        24 * 60 * 60 * 1000 * 3 - (match_date.getTime() - today.getTime()) > 0
      ) {
        return true;
      } else {
        output = false;
      }
    }
    if (props.time4 === true) {
      if (
        match_date.getTime() - today.getTime() > 0 &&
        24 * 60 * 60 * 1000 * 7 - (match_date.getTime() - today.getTime()) > 0
      ) {
        return true;
      } else {
        output = false;
      }
    }
    if (props.time5 === true) {
      if (
        match_date.getTime() - today.getTime() > 0 &&
        24 * 60 * 60 * 1000 * 30 - (match_date.getTime() - today.getTime()) > 0
      ) {
        return true;
      } else {
        output = false;
      }
    }
    return output;
  });

  let card = filter_match
    .sort((a, b) => {
      // sort by time
      if (state.reset === true) {
        return true;
      } else if (state.recent === true) {
        var year1 = a.time.slice(0, 4);
        var month1 = a.time.slice(5, 7);
        var date1 = a.time.slice(8, 10);
        var hour1 = a.time.slice(11, 13);
        var min1 = a.time.slice(14, 16);
        var sec1 = a.time.slice(17, 19);

        year1 = parseInt(year1);
        month1 = parseInt(month1);
        date1 = parseInt(date1);
        hour1 = parseInt(hour1);
        min1 = parseInt(min1);
        sec1 = parseInt(sec1);

        var match_date1 = new Date();
        match_date1.setDate(date1);
        match_date1.setHours(hour1);
        match_date1.setFullYear(year1);
        match_date1.setMinutes(min1);
        match_date1.setSeconds(sec1);
        match_date1.setMonth(month1 - 1);

        var year2 = b.time.slice(0, 4);
        var month2 = b.time.slice(5, 7);
        var date2 = b.time.slice(8, 10);
        var hour2 = b.time.slice(11, 13);
        var min2 = b.time.slice(14, 16);
        var sec2 = b.time.slice(17, 19);

        year2 = parseInt(year2);
        month2 = parseInt(month2);
        date2 = parseInt(date2);
        hour2 = parseInt(hour2);
        min2 = parseInt(min2);
        sec2 = parseInt(sec2);

        var match_date2 = new Date();
        match_date2.setDate(date2);
        match_date2.setHours(hour2);
        match_date2.setFullYear(year2);
        match_date2.setMinutes(min2);
        match_date2.setSeconds(sec2);
        match_date2.setMonth(month2 - 1);

        return match_date1.getTime() - match_date2.getTime();
      }
      // sort by skill level
      else if (state.level === true) {
        return a.maxSkill - b.maxSkill;
      }
      // sort by distance
      else if (state.distance === true) {
        var lat_a1 = test_lat * (Math.PI / 180);
        var lat_a2 = a.lat * (Math.PI / 180);
        var long_a1 = test_lon * (Math.PI / 180);
        var long_a2 = a.lon * (Math.PI / 180);

        var dlat_a = lat_a2 - lat_a1;
        var dlong_a = long_a2 - long_a1;

        var dist_a =
          Math.pow(Math.sin(dlat_a / 2), 2) +
          Math.cos(lat_a1) *
            Math.cos(lat_a2) *
            Math.pow(Math.sin(dlong_a / 2), 2);
        dist_a = 2 * Math.asin(Math.sqrt(dist_a));

        var radius = 3956;

        dist_a = dist_a * radius;

        var lat_b1 = test_lat * (Math.PI / 180);
        var lat_b2 = b.lat * (Math.PI / 180);
        var long_b1 = test_lon * (Math.PI / 180);
        var long_b2 = b.lon * (Math.PI / 180);

        var dlat_b = lat_b2 - lat_b1;
        var dlong_b = long_b2 - long_b1;

        var dist_b =
          Math.pow(Math.sin(dlat_b / 2), 2) +
          Math.cos(lat_b1) *
            Math.cos(lat_b2) *
            Math.pow(Math.sin(dlong_b / 2), 2);
        dist_b = 2 * Math.asin(Math.sqrt(dist_b));

        dist_b = dist_b * radius;

        return dist_a - dist_b;
      }
      return true;
    })
    .map((match) => {
      return (
        <div key={match.id}>
          <MatchCard match={match} />
        </div>
      );
    });

  const handleClick = (event) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };

  const handleReset = () => {
    setState({ ...state, anchorEl: null, txt: "None", reset: true });
    filter_match = props.match;
  };

  const handleRecent = () => {
    setState({
      ...state,
      anchorEl: null,
      txt: "Most Recent",
      reset: false,
      recent: true,
      level: false,
      distance: false,
    });
  };

  const handleSkill = () => {
    filter_match.sort(function (a, b) {
      return a.maxSkill - b.maxSkill;
    });
    setState({
      ...state,
      anchorEl: null,
      txt: "Skill Level",
      reset: false,
      recent: false,
      level: true,
      distance: false,
    });
  };

  const handleDist = () => {
    filter_match.sort(function (a, b) {
      return a.locaton - b.location;
    });
    setState({
      ...state,
      anchorEl: null,
      txt: "Distance",
      reset: false,
      recent: false,
      level: false,
      distance: true,
    });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                let matchId = /\d\d\d-\d\d\d\d/.exec(newValue);
                let filteredMatch;
                if (newValue) {
                  filteredMatch = props.match.filter(
                    (match) => matchId[0] === match.id
                  );
                }
                setMatch(filteredMatch);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  style={{ width: "57.5vw" }}
                  {...params}
                  label="Search available matches"
                  variant="outlined"
                />
              )}
            />

            <Button
              className={classes.button}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Sort by: {state.txt}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={state.anchorEl}
              keepMounted
              open={Boolean(state.anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleReset}>None</MenuItem>
              <MenuItem onClick={handleRecent}>Most Recent</MenuItem>
              <MenuItem onClick={handleSkill}>Skill level</MenuItem>
              <MenuItem onClick={handleDist}>Distance</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          {card}
        </Grid>
      </div>
    </React.Fragment>
  );
}
