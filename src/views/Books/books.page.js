import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import Page from "../../components/Page";
import BookCard from "../../components/Card";
import { Grid, Container, Typography } from "@mui/material";

import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";

import { makeStyles } from "@mui/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../../redux/bookStore/booksSlice";
import { useParams, useNavigate } from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  acordinBlock: {
    width: "30%",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  accordionContent: {
    "&.MuiListItemText-primary": {
      fontWeight: "700",
    },
  },
}));

const BooksPage = () => {
  const customStyles = useStyles();
  const params = useParams();
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookFilters, updateBookFilters] = useImmer({
    category: params.category,
    character: "",
    price: "",
  });
  const [expanded, setExpanded] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);

  const categorybooks = books.filter(
    (book) => book.category === params.category
  );

  const categoriesList = ["fiction", "sci-fi", "comedy"];

  const handleFetchbooks = () => {
    setLoadingSpin(true);
    privateApiGET(Api.books)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setBooks(data?.data));
          setLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleFetchFilterbooks = (data) => {
    setLoadingSpin(true);
    let payload = data;
    privateApiPOST(Api.books, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setBooks(data?.data));
          setLoadingSpin(false);
          if (
            payload &&
            "category" in payload &&
            params.payload != payload["category"]
          ) {
            navigate(`/app/books/categories/${payload["category"]}`);
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCategoryFilterClick = (category) => {
    if (bookFilters["category"] === category) {
      updateBookFilters((draft) => {
        draft.category = "";
      });
      handleFetchbooks();
      navigate("/app/books");
    } else if (category === "all") {
      updateBookFilters((draft) => {
        draft.category = "";
      });
      handleFetchFilterbooks();
      navigate("/app/books");
    } else {
      updateBookFilters((draft) => {
        draft.category = category;
      });
      let data = {
        category: category,
        // price: productFilters["price"],
        // character: productFilters["character"],
      };
      handleFetchFilterbooks(data);
    }
  };

  return (
    <Page title="books">
      <Container maxWidth="lg">
        <Typography variant="h1" alignItems="left" marginTop="36px">
          Books
        </Typography>
        <hr bordertop="2px solid black" fontWeight="bold"></hr>
      </Container>
      <Container maxWidth="lg" className={customStyles.mainBlock}>
        <Container className={customStyles.acordinBlock}>
          <Accordion
            expanded={expanded === "panel2a"}
            onChange={handleAccordionChange("panel2a")}
            sx={{
              "&. MuiListItem-button": {
                backgroundColor: "red !important",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>CATEGORY</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem key="all" disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryFilterClick("all")}
                  >
                    <ListItemText primary="ALL" />
                  </ListItemButton>
                </ListItem>
                {categoriesList.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleCategoryFilterClick(item.toLowerCase())
                      }
                    >
                      <ListItemText primary={item.toUpperCase()} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Container>
        <Container maxWidth="md" className={customStyles.container}>
          {params.category && books.length > 0 && !loadingSpin ? (
            <Grid container spacing={2} mt={2}>
              {categorybooks.map((book, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <BookCard key={id} book={book} />
                  </Grid>
                );
              })}
            </Grid>
          ) : !params.category && books.length > 0 && !loadingSpin ? (
            <Grid container spacing={2} mt={2}>
              {books.map((book, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <BookCard key={id} book={book} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            ""
          )}
        </Container>
      </Container>
    </Page>
  );
};

export default BooksPage;
