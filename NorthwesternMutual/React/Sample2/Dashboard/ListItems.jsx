import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import PlaceIcon from "@material-ui/icons/Place";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import db from "../base";

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: theme.typography.fontWeightMedium,
    height: 60,
    "&:focus": {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: "rgba(107, 169, 235, 0.41)",
    },
  },
}));

export default function ListItems({ onClick }) {
  const classes = useStyles();
  return (
    <div>
      <ListItem button onClick={() => onClick("4")} className={classes.button}>
        <ListItemIcon>
          <AccountCircleIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => onClick("1")} className={classes.button}>
        <ListItemIcon>
          <SportsBasketballIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Match" />
      </ListItem>
      <ListItem button onClick={() => onClick("2")} className={classes.button}>
        <ListItemIcon>
          <PlaceIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Venue" />
      </ListItem>
      <ListItem button onClick={() => onClick("3")} className={classes.button}>
        <ListItemIcon>
          <EmojiPeopleIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Referee" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => onClick("5")} className={classes.button}>
        <ListItemIcon>
          <TimelineIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="My Match" />
      </ListItem>
      <Divider />
      <ListItem className={classes.button} />
      <ListItem className={classes.button} />
      <ListItem className={classes.button} />
      <ListItem className={classes.button} />
      <ListItem className={classes.button} />
      <ListItem className={classes.button} />
      <ListItem button component="a" href="/" className={classes.button}>
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "#05294b" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary="Log out"
          onClick={() => {
            db.auth().signOut();
          }}
        />
      </ListItem>
    </div>
  );
}
