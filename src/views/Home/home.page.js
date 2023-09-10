import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import AppBarLayout from "../../components/appbar";
import BookCard from "../../components/Card";
import { useSelector } from "react-redux";

const customSignInStyles = makeStyles((theme) => ({
  mainBlock: {
    backgroundColor: "#090D1F", // Fixed color format
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
  title: {
    height: "295px",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "195px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "70px",
    },
  },
  titleName: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "240px",
    lineHeight: "243.88px",
    color: "#090D1F",
    letterSpacing: "18px",
    whiteSpace: "nowrap", // Prevent line breaks
    [theme.breakpoints.down("lg")]: {
      fontSize: "190px",
      lineHeight: "200px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "140px",
      lineHeight: "160px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "50px",
      lineHeight: "60px",
    },
    width: "100%", // Ensure the text takes up the full width
    textAlign: "center", // Center the text horizontally
  },
  recentBook: {
    height: "80vh",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },

  detailsTags: {
    fontFamily: "lato",
    fontWeight: "200",
    // backgroundColor: "#FFFFFF",
    height: "20px",
    borderRadius: "2px solid #090D1F",
  },
  title: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "34px",
    marginBottom: "10px",
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
  },
}));

const HomePage = () => {
  const books = useSelector((state) => state.books.books);

  const customStyles = customSignInStyles();
  const selectedCategories = new Set();

  const categoriesItems = books
    ? books.filter((item) => {
        if (!selectedCategories.has(item.category)) {
          selectedCategories.add(item.category);
          return true;
        }
        return false;
      })
    : [];

  return (
    <Page title="home">
      {books.length > 0 && sessionStorage.getItem("token") && (
        <Box>
          <Container maxWidth="xl">
            {/* <AppBarLayout /> */}
            <Box className={customStyles.title} maxWidth="lg">
              <hr></hr>
              <Typography className={customStyles.titleName}>
                LIBRARY
              </Typography>
              <hr></hr>
            </Box>

            <Box
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
              maxWidth="lg"
              marginTop={"40px"}
            >
              <Typography className={customStyles.title}>Categories</Typography>
              <Grid container spacing={2}>
                {categoriesItems.map((book) => (
                  <Grid item key={book.id} xs={12} md={4}>
                    <BookCard book={book} category={true} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
              maxWidth="lg"
              marginTop={"40px"}
            >
              {/* <Typography className={customStyles.profileName}>
                Books
              </Typography> */}
              <Grid container spacing={2}>
                {books.map((book) => (
                  <Grid item key={book.id} xs={12} md={4}>
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <hr></hr>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
              maxWidth="lg"
              marginTop={"40px"}
            >
              <Box sx={{ flex: 1 }}>
                <Grid container alignItems="center">
                  <Avatar src="/static/img/previous.svg" />
                  <Button className={customStyles.detailsTags}>Previous</Button>
                </Grid>
              </Box>

              <Box>
                <Grid container alignItems="center">
                  <Button className={customStyles.detailsTags}>Next</Button>
                  <Avatar src="/static/img/next.svg" />
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Page>
  );
};

export default HomePage;
