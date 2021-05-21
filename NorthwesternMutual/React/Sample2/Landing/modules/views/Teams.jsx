import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, Avatar, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  card: {
    borderRadius: '10%',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    minWidth: 150,
    minHeight: 150,
    width: 230,
    height: 180,
    alignContent: 'center'
  },
  avatar: {
    width: 90,
    height: 90,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: theme.palette.grey[600],
    marginBottom: '0.875em',
  },
  gridItem: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
  }
}));

const members = [
  {
    pic:
    require("../../../Assets/carlos.jpg"),
    name: "Carlos Wirawan",
    title: "Project Manager",
  },
  {
    pic:
    require("../../../Assets/shirley.jpg"),
    name: "Gabriela Shirley",
    title: "User Interface Specialist",
  },
  {
    pic:
    require("../../../Assets/billy.jpg"),
    name: "Billy Halim",
    title: "Software Development Lead",
  },
  {
    pic:
    require("../../../Assets/bruce.jpg"),
    name: "Shih Gau Peng",
    title: "Algorithm Specialist",
  },
  {
    pic:
    require("../../../Assets/albert.jpg"),
    name: "Albert Estevan",
    title: "Senior System Analyst",
  },
  {
    pic:
      require("../../../Assets/tian.jpg"),
    name: "Tiancheng Fu",
    title: "Business Analyst",
  },
  {
    pic: require("../../../Assets/woosung.jpg"),
    name: "Woosung Kim",
    title: "Database Specialist",
  },
  {
    pic:
    require("../../../Assets/wong.jpg"),
    name: "Jason Wong",
    title: "Quality Assurance Lead",
  },
  {
    pic:
    require("../../../Assets/jody.jpg"),
    name: "Nikolas Jody",
    title: "Software Architect",
  },
  {
    pic:
    require("../../../Assets/jason.jpg"),
    name: "Jason Kaharudin",
    title: "Software Architect",
  },
];

export default function Teams() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" marked="center" gutterBottom className={classes.title} component="h2">
          Teams
        </Typography>
        <div>
          <Grid container spacing={5} className={classes.gridItem}>
            {members.map((member) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Avatar className={classes.avatar} src={member.pic} />
                    <h3 className={classes.heading}>{member.name}</h3>
                    <span className={classes.subheader}>{member.title}</span>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}