import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sports from "../Constant/Sports";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import "./MatchCard.css";
import honeycomb from "../Assets/HoneyComb.png";

const styles = (theme) => ({
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    display: "inline",
    borderRadius: "10%",
    justifyContent: "center",
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.primary.light,
  },

  card: {
    borderStyle: "outset",
    borderRadius: "10%",
    borderWidth: 0.6,
    backgroundImage: `url(${honeycomb})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // paddingLeft: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "capitalize",
    width: 385,
    height: 220,
    fontWeight: "normal",
  },
  matchName: {
    textTransform: "uppercase",
  },
});

class MatchCard extends Component {
  state = {
    redirect: false,
    open: false,
    signup: false,
    login: false,
  };

  viewMatchHandler = () => {
    this.setState({ open: true });
    this.setState({ redirect: true });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickLogin = () => {
    this.setState({ login: true });
  };

  handleClickSignup = () => {
    this.setState({ signup: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    window.location.reload(false);
  };

  render() {
    const match = this.props.match;
    const { classes } = this.props;

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    var time =
      /-\d\d-\d\d/.exec(match.time)[0] + "-" + /\d\d\d\d/.exec(match.time)[0];
    time = time.replace("-", "");

    if (this.state.login) {
      return <Redirect to="/signin" push />;
    }

    if (this.state.signup) {
      return <Redirect to="/signup" push />;
    }

    if (this.state.redirect && this.props.disabled === false) {
      return (
        <Redirect to={{ pathname: "/matchdetail/", match: match.id }} push />
      );
    }

    if (this.state.redirect && this.props.disabled === true) {
      return (
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please Sign Up or Sign In to continue!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickSignup} color="primary">
              SIGN UP
            </Button>
            <Button onClick={this.handleClickLogin} color="primary">
              SIGN IN
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <Button
        id="card"
        className={classes.button}
        onClick={this.viewMatchHandler}
      >
        <Card className={classes.card}>
          <h3 className={classes.matchName}>{match.name}</h3>
          <label>
            <b>Type:</b> {sports[match.type]}
          </label>
          <label>
            <b>Location:</b> {match.city}
          </label>
          <label>
            <b>Date:</b> {time}
          </label>
          <label>
            <b>Players:</b> {match.roster.length}/{match.maxPlayers}
          </label>
          <div>
            <label>
              <b>Host:</b>
            </label>
            <label>{match.roster[0].first_name}</label>
          </div>
        </Card>
      </Button>
    );
  }
}

export default withStyles(styles)(MatchCard);
