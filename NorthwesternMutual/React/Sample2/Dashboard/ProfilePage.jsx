import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  Input,
  InputLabel,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Fab,
  Avatar
} from "@material-ui/core";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SaveIcon from "@material-ui/icons/Save";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import db from "../base";
import MaskedInput from 'react-text-mask';

const styles = {
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    flexShrink: 0,
    flexGrow: 0,
    marginBottom: 25,
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
    verticalAlign: "text-top",
    top: 7,
  },
  input: {
    display: "none",
  },
  mapCont: {
    height: 300,
    width: "99%",
    position: "relative",
    margin: 10,
  },
  gmap: {
    margin: 7,
    width: "100%",
  },
};

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

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: {
        firstName: "",
        username: "",
        email: "",
        phone: "(1  )    -    ",
        lat: "",
        lon: "",
        age: "",
        bio: "",
        profile_image: null,
      },
      skill: [0, 0, 0, 0, 0],
      sports: [false, false, false, false, false],
      sportsArray: [],
      address: "",
      mainState: 0,
      selectedFile: null,
      currentUser: db.auth().currentUser,
      imageUploaded: 0,
    };
  }

  componentDidMount() {
    fetch("http://35.163.180.234/api/profile/get_profile/", {
      method: "GET",
      headers: {
        email: this.state.currentUser.email,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let boolSports = [false, false, false, false, false];
        if (res.result.sports.includes("SC")) {
          boolSports[0] = true;
        }
        if (res.result.sports.includes("BK")) {
          boolSports[1] = true;
        }
        if (res.result.sports.includes("FB")) {
          boolSports[2] = true;
        }
        if (res.result.sports.includes("VB")) {
          boolSports[3] = true;
        }
        if (res.result.sports.includes("BS")) {
          boolSports[4] = true;
        }

        this.setState({
          output: {
            firstName: res.result.user.first_name,
            email: res.result.user.email,
            username: res.result.user.username,
            phone: res.result.phone,
            age: res.result.age,
            lat: res.result.lat,
            lon: res.result.lon,
            bio: res.result.bio,
            profile_image: "http://35.163.180.234" + res.result.profile_image,
          },
          sports: boolSports,
          sportsArray: res.result.sports,
          skill:
            res.result.skill.length === 0 ? [1, 1, 1, 1, 1] : res.result.skill,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  handleSubmit() {
    let sportsArr = [];
    if (!!this.state.sports[0]) {
      sportsArr.push("SC");
    }
    if (!!this.state.sports[1]) {
      sportsArr.push("BK");
    }
    if (!!this.state.sports[2]) {
      sportsArr.push("FB");
    }
    if (!!this.state.sports[3]) {
      sportsArr.push("VB");
    }
    if (!!this.state.sports[4]) {
      sportsArr.push("BS");
    }

    const requestProfileData = {
      username: this.state.output.username,
      name: this.state.output.firstName,
      email: this.state.output.email,
      phone: this.state.output.phone,
      age: this.state.output.age,
      lat: this.state.output.lat,
      lon: this.state.output.lon,
      sports: sportsArr,
      bio: this.state.output.bio,
      skill: this.state.skill,
    };

    const form = new FormData();
    form.set("email", this.state.output.email);
    form.append("profile_image", this.state.selectedFile);

    if (
      this.state.sports[0] ||
      this.state.sports[1] ||
      this.state.sports[2] ||
      this.state.sports[3] ||
      this.state.sports[4]
    ) {
      fetch("http://35.163.180.234/api/profile/update_profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestProfileData),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      alert("You must select at least 1 sport");
    }

    if (this.state.selectedFile) {
      fetch("http://35.163.180.234/api/profile/update_image/", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then(() => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  }

  handleUploadClick(event) {
    this.setState({ mainState: "uploaded" });
    this.setState({ imageUploaded: 1 });
    this.setState({ selectedFile: event.target.files[0] });
    alert("Profile pic will be updated after save");
  }

  handleSportSC = (event) => {
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sports"][0] = value;
      return prev;
    });
  };

  handleSportBK = (event) => {
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sports"][1] = value;
      return prev;
    });
  };

  handleSportFB = (event) => {
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sports"][2] = value;
      return prev;
    });
  };

  handleSportVB = (event) => {
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sports"][3] = value;
      return prev;
    });
  };

  handleSportBS = (event) => {
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sports"][4] = value;
      return prev;
    });
  };

  handleSkillSC = (event) => {
    let value = event.target.value;
    this.setState((prev) => {
      prev["skill"][0] = value;
      return prev;
    });
  };

  handleSkillBK = (event) => {
    let value = event.target.value;
    this.setState((prev) => {
      prev["skill"][1] = value;
      return prev;
    });
  };

  handleSkillFB = (event) => {
    let value = event.target.value;
    this.setState((prev) => {
      prev["skill"][2] = value;
      return prev;
    });
  };

  handleSkillVB = (event) => {
    let value = event.target.value;
    this.setState((prev) => {
      prev["skill"][3] = value;
      return prev;
    });
  };

  handleSkillBS = (event) => {
    let value = event.target.value;
    this.setState((prev) => {
      prev["skill"][4] = value;
      return prev;
    })
  }

  TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader title="Profile" />
        <Divider />
        <Form
          onSubmit={this.handleSubmit}
          subscription={{ submitting: true }}
          validate={this.validate}
        >
          {({ handleSubmit, submitting }) => (
            <form
              onSubmit={this.handleSubmit}
              className={classes.form}
              noValidate
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Fragment>
                      <CardContent>
                        <div className={classes.details}>
                          <div>
                            <Typography gutterBottom variant="h4">
                              {"Hello " + this.state.output.firstName + " !"}
                            </Typography>
                          </div>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick.bind(this)}
                          />
                          {this.state.mainState === "initial" ? (
                            <label
                              htmlFor="contained-button-file"
                              className={classes.avatar}
                            >
                              <Fab component="span">
                                <AccountCircleIcon fontSize="large" />
                              </Fab>
                            </label>
                          ) : (
                            <label
                              htmlFor="contained-button-file"
                              className={classes.avatar}
                            >
                              <Fab component="span">
                                <Avatar
                                  alt=""
                                  src={this.state.output.profile_image}
                                />
                              </Fab>
                            </label>
                          )}
                        </div>
                      </CardContent>
                      <Divider className={classes.divider} />
                    </Fragment>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={this.state.output.firstName}
                      fullWidth
                      autoFocus
                      autoComplete="cc-name"
                      required
                      label="Full Name"
                      margin="dense"
                      name="firstName"
                      variant="outlined"
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              firstName: value,
                            },
                          };
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      required
                      label="Username"
                      margin="dense"
                      name="username"
                      variant="outlined"
                      value={this.state.output.username}
                      disabled
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="email"
                      required
                      label="Email"
                      margin="dense"
                      name="email"
                      variant="outlined"
                      value={this.state.output.email}
                      disabled
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Age"
                      margin="dense"
                      name="age"
                      required
                      variant="outlined"
                      select
                      value={this.state.output.age}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              age: value,
                            },
                          };
                        });
                      }}
                    >
                      <MenuItem value="" selected="selected">
                        Select Age Range
                      </MenuItem>
                      <MenuItem value="1">16-18</MenuItem>
                      <MenuItem value="2">19-21</MenuItem>
                      <MenuItem value="3">22-25</MenuItem>
                      <MenuItem value="4">26-30</MenuItem>
                      <MenuItem value="5">30+</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                    <Input
                      fullWidth
                      inputComponent={this.TextMaskCustom}
                      autoComplete="tel"
                      margin="dense"
                      name="phone"
                      id="formatted-text-mask-input"
                      value={this.state.output.phone}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              phone: value,
                            },
                          };
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel component="legend">
                          Sports Type - Skill Level
                        </FormLabel>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.sports[0]}
                                onChange={this.handleSportSC}
                                name="SC"
                              />
                            }
                            label="Soccer"
                          />
                          <Rating
                            name="SC"
                            defaultValue={this.state.skill[0]}
                            value={
                              !!this.state.sports[0]
                                ? this.state.skill[0]
                                : null
                            }
                            onChange={this.handleSkillSC}
                            disabled={this.state.sports[0] === false}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.sports[1]}
                                onChange={this.handleSportBK}
                                name="BK"
                              />
                            }
                            label="Basketball"
                          />
                          <Rating
                            name="BK"
                            defaultValue={this.state.skill[1]}
                            value={
                              !!this.state.sports[1]
                                ? this.state.skill[1]
                                : null
                            }
                            onChange={this.handleSkillBK}
                            disabled={this.state.sports[1] === false}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.sports[2]}
                                onChange={this.handleSportFB}
                                name="FB"
                              />
                            }
                            label="Football"
                          />
                          <Rating
                            name="FB"
                            defaultValue={this.state.skill[2]}
                            value={
                              !!this.state.sports[2]
                                ? this.state.skill[2]
                                : null
                            }
                            onChange={this.handleSkillFB}
                            disabled={this.state.sports[2] === false}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.sports[3]}
                                onChange={this.handleSportVB}
                                name="VB"
                              />
                            }
                            label="Volleyball"
                          />
                          <Rating
                            name="VB"
                            defaultValue={this.state.skill[3]}
                            value={
                              !!this.state.sports[3]
                                ? this.state.skill[3]
                                : null
                            }
                            onChange={this.handleSkillVB}
                            disabled={this.state.sports[3] === false}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.sports[4]}
                                onChange={this.handleSportBS}
                                name="BS"
                              />
                            }
                            label="Baseball"
                          />
                          <Rating
                            name="BS"
                            defaultValue={this.state.skill[4]}
                            value={
                              !!this.state.sports[4]
                                ? this.state.skill[4]
                                : null
                            }
                            onChange={this.handleSkillBS}
                            disabled={this.state.sports[4] === false}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={3}
                      rowsMax={6}
                      margin="dense"
                      variant="outlined"
                      name="bio"
                      label="About Me"
                      fullWidth
                      value={this.state.output.bio}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              bio: value,
                            },
                          };
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  // type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Save
                </Button>
              </CardActions>
            </form>
          )}
        </Form>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfilePage);
