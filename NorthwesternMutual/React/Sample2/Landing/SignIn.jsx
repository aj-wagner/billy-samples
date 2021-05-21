import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useContext } from "react";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import Button from "@material-ui/core/Button";
import FormFeedback from "./modules/form/FormFeedback";
import "../App.css";
import { AuthContext } from "../auth/Auth";
import db from "../base";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn({ history }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  const validate = (values) => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const handleSignin = (event) => {
    event.preventDefault();
    const { Email, Password } = event.target.elements;

    try {
      setSent(true);
      db.auth()
        .signInWithEmailAndPassword(Email.value, Password.value)
        .catch((error) => {
          handleClickOpen();
        });
      return <Redirect to="/dashboard" />;
    } catch {}
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/signup" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSignin}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSignin} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="Email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="Password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size="large"
                color="primary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgotpassword">
            Forgot password?
          </Link>
        </Typography>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please make sure there is an account associated with that email.
              Otherwise, please input the correct password (case matters).
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
