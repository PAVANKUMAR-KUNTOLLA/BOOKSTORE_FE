import React from "react";
import BookCard from "./Card";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "./DataNotFound";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
  },
}));

const SearchResultsPage = () => {
  const customStyles = useStyles();
  const books = useSelector((state) => state.books.books);
  const searchQuery = useSelector((state) => state.books.searchQuery);
  const isSearchOn = useSelector((state) => state.books.isSearchOn);

  return (
    <Container maxWidth="md" className={customStyles.container}>
      {isSearchOn && books.length > 0 ? (
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                alignItems: "center",
                marginTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
                textTransform: "capitalize",
              }}
            >
              {searchQuery}
            </Typography>
            <hr
              sx={{
                borderTop: "2px solid black",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></hr>
          </Grid>
          {books.map((book) => (
            <Grid item key={book.id} xs={6} md={3} lg={3}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      ) : isSearchOn && books.length === 0 ? (
        <DataNotFound />
      ) : null}
    </Container>
  );
};

export default SearchResultsPage;
