import React from "react";
import Page from "../../components/Page";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Box, Container, Typography, Grid, Avatar } from "@mui/material";
import { theme } from "../../theme";
import { makeStyles } from "@mui/styles";

const customSignInStyles = makeStyles((theme) => ({
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
    backgroundColor: "#000000",
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

  signIn: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "43.88px",
    letterSpacing: "0em",
    textAlign: "left",
    marginLeft: "-250px",
    color: "#000000",
    marginBottom: "0px",
    marginTop: "200px", // Adjusted margin
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
  signInAccount: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "-224px",
    lineHeight: "19.2px",
    letterSpacing: "0em",
    color: "#000000",
    marginBottom: "0px",
    marginTop: "10px", // Adjusted margin
  },
  loginCard: {
    width: "385px",
    height: "317px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
  },

  loginForm: {
    width: "385px",
    marginTop: "10px", // Adjusted width to fit within the car
    marginBottom: "30px", // Centered within the card
    display: "flex",
    flexDirection: "column",
  },

  email: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#000000",
    paddingTop: "20px",
    marginBottom: "8px",
    paddingLeft: "30px",
  },

  inputEmail: {
    width: "80%",
    height: "40px",
    backgroundColor: "#F5F5F5",
    marginLeft: "30px",
    paddingTop: "10px",
    borderRadius: "10px",
  },

  inputEmailText: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#000000",
    paddingLeft: "10px", // Adjusted padding
  },

  password: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#000000",
    paddingLeft: "30px",
    marginBottom: "8px", // Adjusted margin
    paddingTop: "20px",
  },

  passwordInput: {
    width: "80%",
    height: "40px",
    marginLeft: "30px",
    backgroundColor: "#EAEAEA",
    borderRadius: "10px",
  },

  passwordInputText: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#000000",
    paddingLeft: "10px",
    paddingTop: "10px",
  },

  forgetPassword: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#346BD4",
    paddingLeft: "30px",
    paddingTop: "20px",
  },

  buttonSignIn: {
    width: "80%",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20px",
    marginLeft: "30px",
  },

  buttonSignInName: {
    width: "80%",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "16px",
    color: "#FFFFFF",
    textAlign: "center",
    margin: "0 auto",
    paddingTop: "10px",
  },

  register: {
    fontFamily: "Lato",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19.2px",
    color: "#858585",
    width: "80%", // Adjusted width
    textAlign: "center",
    marginTop: "20px", // Adjusted margin
    [theme.breakpoints.down("sm")]: {
      marginLeft: "30px",
    },
  },
}));

const SignInPage = () => {
  const customStyles = customSignInStyles();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      window.localStorage.setItem("token", codeResponse.access_token);
      navigate("/");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Page title="signin">
      <Container className={customStyles.mainBlock}>
        <Box className={customStyles.leftSide}>
          <Typography className={customStyles.title}>Board.</Typography>
        </Box>
        <Box className={customStyles.rightSide}>
          <Typography className={customStyles.signIn}>Sign In</Typography>
          <Typography className={customStyles.signInAccount}>
            Sign in to your account
          </Typography>
          <Grid className={customStyles.loginForm}>
            <Avatar
              variant="square"
              src="/static/img/Google Sign ingoogle.svg"
              alt="Sign in with Google"
              onClick={login}
              sx={{
                cursor: "pointer",
                height: "36px",
                width: "200px",
                borderRadius: "2px",
              }}
            />
          </Grid>
          <Grid className={customStyles.loginCard}>
            <Typography className={customStyles.email}>
              Email&nbsp;address
            </Typography>

            <Grid className={customStyles.inputEmail}>
              <Typography className={customStyles.inputEmailText}>
                johndoe@gmail.com
              </Typography>
            </Grid>
            <Typography className={customStyles.password}>Password</Typography>

            <Grid className={customStyles.passwordInput}>
              <Typography className={customStyles.passwordInputText}>
                ••••••••
              </Typography>
            </Grid>
            <Grid className={customStyles.forgetPassword}>
              <Box>Forgot password?</Box>
            </Grid>

            <Grid className={customStyles.buttonSignIn}>
              <Typography className={customStyles.buttonSignInName}>
                Sign In
              </Typography>
            </Grid>
          </Grid>
          <Typography className={customStyles.register}>
            Don’t have an account?{" "}
            <Box component="span" sx={{ color: "#346BD4" }}>
              Register here
            </Box>
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default SignInPage;
