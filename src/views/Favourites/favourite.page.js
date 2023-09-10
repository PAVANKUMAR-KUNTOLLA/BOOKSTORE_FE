import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import BookCard from "../../components/Card";
import { Typography } from "@mui/material";
import { Box, Grid, Container, Alert, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

export const customFavouriteStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
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
      marginTop: "20px",
    },
  },
}));

const FavouritePage = () => {
  const customStyles = customFavouriteStyles();
  const favourites = useSelector((state) => state.books.favourites);
  const navigate = useNavigate();

  return (
    <Page title="Favourites">
      <Container maxWidth="md" className={customStyles.container}>
        {favourites.length > 0 ? (
          <Box>
            <Typography className={customStyles.title}>Favourites</Typography>
            <hr bordertop="2px solid black" fontWeight="bold"></hr>
            <Grid container spacing={2} mt={2}>
              {favourites.map((book, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <BookCard key={id} book={book} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <Container maxWidth="sm" className={customStyles.container}>
            <Alert severity="info" sx={{ marginTop: { xs: "3%", sm: "5%" } }}>
              Your Favourites is Empty{" "}
              <Link onClick={() => navigate("/app/books")}>View books</Link>
            </Alert>
          </Container>
        )}
      </Container>
    </Page>
  );
};

export default FavouritePage;
