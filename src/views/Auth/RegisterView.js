import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";
import PerfectScrollbar from "react-perfect-scrollbar";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
  alert: {
    position: "absolute",
    right: 50,
    top: 50,
    [theme.breakpoints.down("sm")]: {
      right: 20,
      maxWidth: 250,
    },
  },
  logo: {
    width: 100,
  },
  menuPaper: {
    maxHeight: 200,
  },
  mainBlock: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSide: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#2069D8",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40vh",
      margin: "0",
    },
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "72px",
    textAlign: "center",
    lineHeight: "87.7px",
    color: "#FFFFFF",
    margin: "auto",
    marginTop: "50vh",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10vh",
    },
  },

  rightSide: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    margin: "0",
    padding: "0", // Reset padding
    [theme.breakpoints.up("md")]: {
      paddingLeft: "244px", // Adjust padding for medium and larger screens
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Set width to 100%
      paddingLeft: "0", // Reset padding
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
    },
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Page className={classes.root} title="Register">
      <Container className={classes.mainBlock}>
        <Box className={classes.leftSide}>
          <Typography className={classes.title}>LIBRARY.</Typography>
        </Box>
        <Box className={classes.rightSide}>
          {showAlert.isAlert ? (
            <CustomAlert
              open={showAlert.isAlert}
              severity={showAlert.severity}
              alertTitle={showAlert.alertTitle}
              alertText={showAlert.alertText}
              onClose={() =>
                setShowAlert({
                  isAlert: false,
                  alertTitle: "",
                  alertText: "",
                  severity: "",
                })
              }
            />
          ) : null}

          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <PerfectScrollbar>
              <Container maxWidth="sm">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  marginBottom={2}
                >
                  {/* We can place our logo here */}
                </Box>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                    phone_no: "",
                    address: "",
                    college: "",
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required("name is required"),
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),

                    password: Yup.string()
                      .required("Please enter your password")
                      .matches(
                        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                      ),
                    passwordConfirmation: Yup.string().when("password", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Both password need to be the same"
                      ),
                    }),
                    phone_no: Yup.string()
                      .required("phone number is required")
                      .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        "Phone number is not valid"
                      ),
                    address: Yup.string()
                      .max(255)
                      .required("address is required"),
                    college: Yup.string()
                      .max(255)
                      .required("college is required"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    const url = Api.signup;

                    const config = {
                      headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                      },
                    };

                    axios
                      .post(url, values, config)
                      .then((res) => {
                        if (res.status === 200) {
                          setShowAlert({
                            isAlert: true,
                            alertText: "Your are successfully registered.",
                            severity: "success",
                          });
                          setSubmitting(false);
                          resetForm();
                        }
                      })
                      .catch((error) => {
                        if (error.response) {
                          const { data } = error.response;
                          setShowAlert({
                            isAlert: true,
                            alertText: data?.["message"],
                            severity: "error",
                            alertTitle: "Error",
                          });
                          // resetForm();
                          setSubmitting(false);
                        }
                      });
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                  }) => (
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <Box mb={3}>
                        <Typography color="textPrimary" variant="h2">
                          Register
                        </Typography>
                      </Box>

                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          touched.passwordConfirmation &&
                            errors.passwordConfirmation
                        )}
                        fullWidth
                        helperText={
                          touched.passwordConfirmation &&
                          errors.passwordConfirmation
                        }
                        label="Confirm Password"
                        margin="normal"
                        name="passwordConfirmation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirmation}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.phone_no && errors.phone_no)}
                        fullWidth
                        helperText={touched.phone_no && errors.phone_no}
                        label="Phone number"
                        margin="normal"
                        name="phone_no"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone_no}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label="Address"
                        margin="normal"
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(touched.college && errors.college)}
                        fullWidth
                        helperText={touched.college && errors.college}
                        label="College"
                        margin="normal"
                        name="college"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.college}
                        variant="outlined"
                      />

                      <Box my={2}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Sign up
                        </Button>
                      </Box>
                      <Typography color="textSecondary" variant="body1">
                        Have an account?{" "}
                        <Link component={RouterLink} to="/login" variant="h6">
                          Sign in
                        </Link>
                      </Typography>
                    </form>
                  )}
                </Formik>
              </Container>
            </PerfectScrollbar>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default RegisterView;
