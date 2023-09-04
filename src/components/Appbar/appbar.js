import React from "react";
import { Container, Grid, Typography, Box, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const customAppbarStyles = makeStyles((theme) => ({
  navbar: {
    width: "100%",
    height: "112px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      height: "70px",
    },
  },
  leftBlock: {
    width: "60%",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
  },
  profileName: {
    alignSelf: "self-start",
    color: "#FFFFFF", // Change text color to white for visibility
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "43.88px",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  rightBlock: {
    width: "40%",
    paddingTop: "30px",
    paddingBottom: "30px",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  detailsName: {
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "43.88px",
    color: "#FFFFFF",
  },
  avatarContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "60%",
      paddingTop: "30px",
      paddingBottom: "30px",
    },
  },
}));
const AppBarLayout = () => {
  const customStyles = customAppbarStyles();

  return (
    <Box className={customStyles.navbar} maxWidth="md">
      <Grid container className={customStyles.leftBlock}>
        <Typography className={customStyles.profileName}>Your Name</Typography>
      </Grid>

      <Grid container className={customStyles.avatarContainer}>
        <Avatar alt="Your Avatar" src="/static/img/toggle.svg" />
      </Grid>

      <Grid container className={customStyles.rightBlock}>
        <Typography className={customStyles.detailsName}>Blog</Typography>
        <Typography className={customStyles.detailsName}>Projects</Typography>
        <Typography className={customStyles.detailsName}>About</Typography>
        <Typography className={customStyles.detailsName}>NewsLetter</Typography>
        <Typography className={customStyles.detailsName}>Profile</Typography>
      </Grid>
    </Box>
  );
};

export default AppBarLayout;
