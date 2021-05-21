import React, { Fragment, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  FormLabel,
  CardContent,
  FormGroup,
  Chip,
  Snackbar,
} from "@material-ui/core";
import MatchSearch from "./MatchSearch";
import MatchFilter from "./MatchFilter";
import { Form } from "react-final-form";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";
import MapContainer from "../Components/GMaps";
import useForceUpdate from "use-force-update";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from "@material-ui/lab/Alert";
import { AuthContext } from "../auth/Auth";
import { Typography } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  divider: {
    marginBottom: 15,
  },
  locationText: {
    marginLeft: 6,
  },
  form: {
    marginTop: 6,
  },
  formControl: {
    margin: 3,
  },
  rating: {
    marginLeft: 10,
    top: -3,
    marginRight: 15,
  },
  skillLevel: {
    margin: 7,
  },
  root: {
    marginTop: 35,
    margin: "0 auto",
  },
  button: {
    marginTop: 40,
    margin: "0 auto",
    width: 200,
  },
  icon: {
    marginRight: 2,
  },
  outer: {
    display: "flex",
    justifyContent: "space-between",
  },
  createMatch: {
    marginRight: "4%",
  },
  mapCont: {
    height: 300,
    width: 510,
    position: "relative",
    margin: 7,
  },
}));

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

export default function MatchPage(props) {
  const [userIndex, setUserIndex] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openCapacitySnack, setOpenCapacitySnack] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState({
    name: "",
    minSkill: null,
    maxSkill: null,
    age: "",
    location: "",
    maxPlayers: 1,
    description: "",
    type: "",
    f_sportsType: "",
    f_skilllevel: 0,
    f_distance: 999999,
    f_time1: false,
    f_time2: false,
    f_time3: false,
    f_time4: false,
    f_time5: false,
    lat: 32.8801,
    lon: -117.234,
    address: "",
    roster: [],
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [roster, setRoster] = useState([]);
  const [successBool, setSuccessBool] = useState(false);

  const forceUpdate = useForceUpdate();
  const mapCallbackLatLng = (mapAddress, mapLat, mapLng) => {
    setState({
      ...state,
      address: mapAddress,
      lat: mapLat,
      lon: mapLng,
    });
  };

  useEffect(() => {
    fetch("http://35.163.180.234/api/user/", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i]["email"] === currentUser.email) {
            setUserIndex(i);
          }
        }
        let userListTemp = res.map((info) => info.email);
        setUserList(userListTemp.filter((e) => e !== currentUser.email));
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [currentUser.email, userIndex]);

  function handleSubmit() {
    let ros = [{ email: currentUser.email }];
    for (let i = 0; i < roster.length; i++) {
      if (roster[i] !== currentUser.email) {
        ros.push({ email: roster[i] });
      }
    }

    const createMatchData = {
      name: state.name,
      description: state.description,
      type: state.type,
      age: state.age,
      lat: state.lat,
      lon: state.lon,
      time: selectedDate,
      roster: ros,
      maxPlayers: state.maxPlayers,
      minSkill: state.minSkill,
      maxSkill: state.maxSkill,
    };

    if (
      createMatchData.name === "" ||
      createMatchData.description === "" ||
      createMatchData.type === "" ||
      createMatchData.age === "" ||
      createMatchData.maxPlayers === "" ||
      createMatchData.maxSkill === null ||
      createMatchData.minSkill === null ||
      createMatchData.roster.length > createMatchData.maxPlayers
    ) {
      setSuccessBool(false);
    } else {
      setSuccessBool(true);
      fetch("http://35.163.180.234/api/match/create_match/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createMatchData),
      })
        .then((response) => response.json())
        .then(() => {
          handleClose();
          window.location.reload(false);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  }

  const handleSelect = (description) => {
    geocodeByPlaceId(description.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setState({
          ...state,
          lat: lat,
          lon: lng,
        });
        forceUpdate();
      });
  };

  const onTypeSubmit = (name, type) => {
    setState({ ...state, [name]: type });
  };
  const onSkillSubmit = (name, level) => {
    setState({ ...state, [name]: level });
  };
  const onDistSubmit = (name, dist) => {
    setState({ ...state, [name]: dist });
  };
  const onTimeSubmit = (name, checked) => {
    setState({ ...state, [name]: checked });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSnackBar = () => {
    setOpenSnack(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleCloseCapacitySnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCapacitySnack(false);
  };

  return (
    <Fragment>
      <Grid container className={classes.outer}>
        <Grid item xs={6}>
          <MatchSearch
            match={props.match}
            lat={props.lat}
            lon={props.lon}
            type={state.f_sportsType}
            level={state.f_skilllevel}
            dist={state.f_distance}
            time1={state.f_time1}
            time2={state.f_time2}
            time3={state.f_time3}
            time4={state.f_time4}
            time5={state.f_time5}
          />
        </Grid>

        <Grid item xs={2} className={classes.createMatch}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            className={classes.button}
          >
            Create Match
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Create New Match</DialogTitle>
            <DialogContent>
              <Form
                onSubmit={handleSubmit}
                subscription={{ submitting: true }}
                render={({ handleSubmit, form, submitting, values }) => (
                  <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    noValidate
                  >
                    <CardContent spacing={2}>
                      <TextField
                        fullWidth
                        autoFocus
                        label="Match Name"
                        margin="dense"
                        name="name"
                        variant="outlined"
                        required
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        label="Sports Type"
                        margin="dense"
                        name="type"
                        variant="outlined"
                        select
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value="" selected="selected">
                          Select Sports Type
                        </MenuItem>
                        <MenuItem value="SC">Soccer</MenuItem>
                        <MenuItem value="BK">Basketball</MenuItem>
                        <MenuItem value="BS">Baseball</MenuItem>
                        <MenuItem value="FB">Football</MenuItem>
                        <MenuItem value="VB">Volleyball</MenuItem>
                      </TextField>
                      <FormGroup required row className={classes.skillLevel}>
                        <FormLabel component="legend">Skill Level</FormLabel>
                        <Rating
                          name="minSkill"
                          defaultValue={0}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                          onChange={handleChange}
                        />
                        {" to "}
                        <Rating
                          name="maxSkill"
                          defaultValue={0}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <TextField
                        fullWidth
                        label="Age Range"
                        margin="dense"
                        name="age"
                        variant="outlined"
                        select
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value="" selected="selected">
                          Select Age Range
                        </MenuItem>
                        <MenuItem value="0">16-18</MenuItem>
                        <MenuItem value="1">19-21</MenuItem>
                        <MenuItem value="2">22-25</MenuItem>
                        <MenuItem value="3">26-30</MenuItem>
                        <MenuItem value="4">30+</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        label="Number of players"
                        type="number"
                        margin="dense"
                        name="maxPlayers"
                        variant="outlined"
                        defaultValue="1"
                        select
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value="" selected="selected">
                          Select a number
                        </MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="13">13</MenuItem>
                        <MenuItem value="14">14</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="16">16</MenuItem>
                        <MenuItem value="17">17</MenuItem>
                        <MenuItem value="18">18</MenuItem>
                        <MenuItem value="19">19</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="21">21</MenuItem>
                        <MenuItem value="22">22</MenuItem>
                        <MenuItem value="23">23</MenuItem>
                        <MenuItem value="24">24</MenuItem>
                        <MenuItem value="25">25</MenuItem>
                      </TextField>
                      <div className={classes.skillLevel}>
                        <GooglePlacesAutocomplete
                          initialValue={state.address}
                          placeholder={state.address}
                          onSelect={handleSelect}
                        />
                      </div>
                      <div className={classes.mapCont}>
                        <MapContainer
                          center={{ lat: state.lat, lng: state.lon }}
                          callback={mapCallbackLatLng}
                        />
                      </div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <TextField
                        multiline
                        rows={3}
                        rowsMax={6}
                        margin="dense"
                        variant="outlined"
                        name="description"
                        label="Match Description"
                        fullWidth
                        required
                        onChange={handleChange}
                      />
                      <Typography> Host: {currentUser.email}</Typography>
                      <Autocomplete
                        required
                        multiple
                        margin="dense"
                        id="tags-outlined"
                        options={userList.map((option) => option)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            return (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            );
                          })
                        }
                        onChange={(event, value) => {
                          setRoster(value);
                          if (value.length > state.maxPlayers - 1) {
                            setOpenCapacitySnack(true);
                          } else {
                            setOpenCapacitySnack(false);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Invite players"
                            placeholder="Example: db@ucsd.edu"
                            fullWidth
                          />
                        )}
                      />
                      <Typography>
                        {" "}
                        Roster capacity: {roster.length + 1}/{state.maxPlayers}
                      </Typography>
                      <Typography style={{ fontSize: 10 }}>
                        {" "}
                        *Host is by default in the roster{" "}
                      </Typography>
                      <Snackbar
                        open={openCapacitySnack}
                        onClose={handleCloseCapacitySnackBar}
                      >
                        <Alert
                          onClose={handleCloseSnackBar}
                          severity={"warning"}
                        >
                          Over roster Capacity
                        </Alert>
                      </Snackbar>
                    </CardContent>
                    <Divider />
                    <DialogActions>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={handleClickSnackBar}
                      >
                        Create
                      </Button>
                      <Snackbar open={openSnack} onClose={handleCloseSnackBar}>
                        <Alert
                          onClose={handleCloseSnackBar}
                          autoHideDuration={2000}
                          severity={successBool ? "success" : "error"}
                        >
                          {successBool
                            ? "Your match is successfully created!"
                            : "Please check if inputs are all properly filled in or roster is within capacity"}
                        </Alert>
                      </Snackbar>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </form>
                )}
              />
            </DialogContent>
          </Dialog>
          <MatchFilter
            onType={onTypeSubmit}
            onSkill={onSkillSubmit}
            onDist={onDistSubmit}
            onTime={onTimeSubmit}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}