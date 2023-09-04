import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const customCardStyles = makeStyles((theme) => ({
  mainBlock: {
    width: "100%",
    height: "620px",
    marginRight: "20px",
  },
  leftBlock: {
    height: "60%",
  },
  posterImage: {
    width: "100%",
    height: "100%",
  },
  rightBlock: {
    height: "30%",
  },
  detailsDate: {
    color: "#FFFFFF", // Change text color to white for visibility
    fontFamily: "lato",
    fontWeight: "200",
    fontSize: "16px",
    color: "#6941C6",
    lineHeight: "23.88px",
    paddingTop: "20px",
  },
  detailsTitle: {
    color: "#FFFFFF", // Change text color to white for visibility
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "43.88px",
  },
  detailsQuestion: {
    color: "#C0C5D0", // Change text color to white for visibility
    fontFamily: "lato",
    fontWeight: "200",
    fontSize: "14px",
    lineHeight: "21.88px",
  },
  detailsTags: {
    fontFamily: "lato",
    fontWeight: "200",
    backgroundColor: "#FFFFFF",
    height: "20px",
    borderRadius: "2px solid #090D1F",
  },
}));
const BlogCard = () => {
  const customStyles = customCardStyles();
  return (
    <Box className={customStyles.mainBlock} maxWidth="sm">
      <Grid container className={customStyles.leftBlock}>
        <Avatar
          variant="square"
          className={customStyles.posterImage}
          src="/static/img/Captain_america.jpg"
        ></Avatar>
      </Grid>
      <Grid container className={customStyles.rightBlock}>
        <Grid display={"flex"} flexDirection={"column"} width="100%">
          <Grid>
            <Typography className={customStyles.detailsDate}>
              Sunday , 1 Jan 2023
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography className={customStyles.detailsTitle}>
              UX Review presentation
            </Typography>
            <Avatar src="/static/img/upArrow.svg" />
          </Grid>
        </Grid>
        <Typography className={customStyles.detailsQuestion}>
          How do you create compelling presentation that wow your colleagues and
          impress your manager?
        </Typography>
        <Button className={customStyles.detailsTags}>Design</Button>
      </Grid>
    </Box>
  );
};

export default BlogCard;
