import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";

import Box from "@material-ui/core/Box";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
  },
  locationText: {
    marginLeft: 6,
  },
  formControl: {
    margin: 3,
  },
  rating: {
    verticalAlign: "text-top",
    top: 7,
  },
  root: {
    marginTop: 10,
    margin: "0 auto",
    width: 250,
  },
  icon: {
    marginRight: 2,
  },
  input: {
    width: 42,
  },
  expanded: {
    "&.MuiExpansionPanel-root:before": {
      display: "none",
    },
    boxShadow: "none",
    margin: "0 auto",
  },
}));

const MySlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  active: {},
  valueLabel: {
    top: -18,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: "0 mi",
  },
  {
    value: 50,
    label: "50 mi",
  },
  {
    value: 100,
    label: "100 mi",
  },
];

export default function MatchFilter(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    f_sportsType: "",
    f_skilllevel: 0,
    f_distance: 999999,
    f_time1: false,
    f_time2: false,
    f_time3: false,
    f_time4: false,
    f_time5: false,
    disabled: true,
    previous: 50,
  });

  var filterStyle = {
    padding: 20,
  };

  const handleDistanceChange = (name) => (event, newValue) => {
    setState({ ...state, [name]: newValue, previous: newValue });
    props.onDist(name, newValue);
  };

  const handleTimeChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.onTime(event.target.name, event.target.checked);
  };

  const handleLevelChange = (name) => (event, newValue) => {
    if (
      newValue !== 1 &&
      newValue !== 2 &&
      newValue !== 3 &&
      newValue !== 4 &&
      newValue !== 5
    ) {
      setState({ ...state, [name]: 0 });
      props.onSkill(name, 0);
    } else {
      setState({ ...state, [name]: newValue });
      props.onSkill(name, newValue);
    }
  };

  const handleTypeClick = (name) => (event) => {
    if (event.target.value === state.f_sportsType) {
      setState({ ...state, [name]: "" });
      props.onType(name, "");
    } else {
      setState({ ...state, [name]: event.target.value });
      props.onType(name, event.target.value);
    }
  };

  const handleDisable = (name) => (event) => {
    if (state.disabled === false) {
      setState({
        ...state,
        f_distance: 999999,
        disabled: true,
      });
      props.onDist(name, 999999);
    } else {
      setState({ ...state, f_distance: state.previous, disabled: false });
      props.onDist(name, state.previous);
    }
  };

  return (
    <Fragment>
      <Box component="fieldset" mt={12} mb={3} borderColor="grey">
        <ExpansionPanel className={classes.expanded} defaultExpanded="true">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> Sports Type</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="sportstype"
                  name="f_sportsType"
                  value={state.f_sportsType}
                >
                  <FormControlLabel
                    value="SC"
                    control={
                      <Radio
                        onClick={handleTypeClick("f_sportsType")}
                        color="primary"
                      />
                    }
                    label="Soccer"
                  />
                  <FormControlLabel
                    value="BK"
                    control={
                      <Radio
                        onClick={handleTypeClick("f_sportsType")}
                        color="primary"
                      />
                    }
                    label="Basketball"
                  />
                  <FormControlLabel
                    value="FB"
                    control={
                      <Radio
                        onClick={handleTypeClick("f_sportsType")}
                        color="primary"
                      />
                    }
                    label="Football"
                  />
                  <FormControlLabel
                    value="VB"
                    control={
                      <Radio
                        onClick={handleTypeClick("f_sportsType")}
                        color="primary"
                      />
                    }
                    label="Volleyball"
                  />
                  <FormControlLabel
                    value="BS"
                    control={
                      <Radio
                        onClick={handleTypeClick("f_sportsType")}
                        color="primary"
                      />
                    }
                    label="Baseball"
                  />
                </RadioGroup>
              </FormControl>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div style={filterStyle}>
          <FormLabel component="legend">Skill Level</FormLabel>
          <Rating
            name="f_skilllevel"
            value={state.f_skilllevel}
            defaultValue={2}
            onChange={handleLevelChange("f_skilllevel")}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
          />
        </div>

        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Distance</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.disabled}
                    onChange={handleDisable("f_distance")}
                    name="disable"
                    color="primary"
                  />
                }
                label="Disable"
              />
            </FormGroup>
          </FormControl>

          <div style={filterStyle}>
            <MySlider
              name="f_distance"
              disabled={state.disabled}
              onChange={handleDistanceChange("f_distance")}
              defaultValue={50}
              marks={marks}
              valueLabelDisplay="on"
            />
          </div>
        </div>

        <ExpansionPanel className={classes.expanded} defaultExpanded="true">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> Time</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.f_time1}
                        onChange={handleTimeChange}
                        name="f_time1"
                        color="primary"
                      />
                    }
                    label="Today"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.f_time2}
                        onChange={handleTimeChange}
                        name="f_time2"
                        color="primary"
                      />
                    }
                    label="Tomorrow "
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.f_time3}
                        onChange={handleTimeChange}
                        name="f_time3"
                        color="primary"
                      />
                    }
                    label="In 3 days"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.f_time4}
                        onChange={handleTimeChange}
                        name="f_time4"
                        color="primary"
                      />
                    }
                    label="In a week"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.f_time5}
                        onChange={handleTimeChange}
                        name="f_time5"
                        color="primary"
                      />
                    }
                    label="In a month"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    </Fragment>
  );
}
