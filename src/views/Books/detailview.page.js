import React, { useState, useEffect, useRef } from "react";
import Page from "../../components/Page";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../../redux/bookStore/booksSlice";
import { setLoadingSpin } from "../../redux/bookStore/booksSlice";
import Rating from "@mui/material/Rating";

const productViewCustomStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  leftBlock: {
    width: "40vw",
    marginLeft: "5vw",
    marginTop: "1rem",
    marginRight: "5vw",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      marginLeft: "10vw",
      marginRight: "10vw",
    },
  },
  largeImage: {
    position: "relative",
  },
  mainImage: {
    position: "relative",
    width: "100%",
    height: "auto",
  },

  rightBlock: {
    width: "40vw",
    marginRight: "10vw",
    marginTop: "5rem",
    marginBottom: "auto",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      maginLerft: "10vw",
      marginRight: "10vw",
      marginTop: "1rem",
    },
  },

  title: {
    fontSize: "24px",
    fontWeight: "540",
    lineHeight: "27px",
    marginBottom: "16px",
  },
  price: {
    fontWeight: "700",
    fontSize: "21px",
    lineHeight: "24px",
    marginBottom: "24px",
  },

  buttonContainer: {
    justifyContent: "center",
    marginTop: "1rem",
  },

  button: {
    marginRight: "1rem",
  },

  description: {
    fontSize: "21px",
    fontWeight: "600",
    lineHeight: "24px",
    marginTop: "36px",
    marginBottom: "-24px",
  },

  rating: {
    marginTop: "20px",
  },
  paragraph: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19px",
  },
}));

const DetailViewPage = () => {
  const params = useParams();
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const currBook = books.find((book) => book.id === parseInt(params.id));
  let currBookRef = useRef(params.id);
  const [isFavLoadingSpin, setIsFavLoadingSpin] = useState(false);
  const [isCartLoadingSpin, setIsCartLoadingSpin] = useState(false);
  const customStyles = productViewCustomStyles();

  const handleRecordVisitHistory = () => {
    let payload = { id: params.id };
    privateApiPOST(Api.record_visit, payload)
      .then((response) => {
        const { status, data } = response;
        console.log("data", data?.message);
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleEditProduct = (data) => {
    let payload = data;
    privateApiPOST(Api.edit_book, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setBooks(data?.data));
          setIsFavLoadingSpin(false);
          setIsCartLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsFavLoadingSpin(false);
        setIsCartLoadingSpin(false);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleFavouriteClick = () => {
    const data = {
      id: currBook.id,
      title: currBook.title,
      is_favourite: !currBook.is_favourite,
    };
    setIsFavLoadingSpin(true);
    handleEditProduct(data);
  };

  const handleAddToCartClick = () => {
    const data = {
      id: currBook.id,
      title: currBook.title,
      is_item_in_cart: !currBook.is_item_in_cart,
      quantity: currBook.quantity + 1,
    };
    setIsCartLoadingSpin(true);
    handleEditProduct(data);
  };

  const handleFetchbooks = () => {
    setLoadingSpin(true);
    privateApiGET(Api.books)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          // Dispatch the setBooks action with the fetched data
          dispatch(setBooks(data?.data));
          setLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
      });
  };

  useEffect(() => {
    if (params.id !== currBookRef.current) {
      handleRecordVisitHistory();
    }
  }, [currBook]);

  useEffect(() => {
    handleFetchbooks();
    handleRecordVisitHistory();
  }, []);

  return (
    <Page title="books">
      {books.length > 0 && currBook ? (
        <Box sx={{ marginTop: "10px" }}>
          <Box className={customStyles.mainBlock}>
            <Box className={customStyles.leftBlock}>
              <Box className={customStyles.largeImage}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    className={customStyles.mainImage}
                    variant="square"
                    src={currBook.image}
                    alt={currBook.title}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={customStyles.rightBlock}>
              <Typography className={customStyles.title}>
                {currBook.title}
              </Typography>
              {currBook && currBook["price"] && (
                <Typography className={customStyles.price}>
                  Rs. {currBook.price}
                </Typography>
              )}
              <Box className={customStyles.buttonContainer}>
                <Button
                  variant={currBook.is_favourite ? "contained" : "outlined"}
                  onClick={handleFavouriteClick}
                  className={customStyles.button}
                >
                  ADD TO FAV{" "}
                  {isFavLoadingSpin && (
                    <CircularProgress
                      size={15}
                      color={currBook.is_favourite ? "secondary" : "primary"}
                      sx={{ marginLeft: "15px" }}
                    />
                  )}
                </Button>
                <Button
                  variant={currBook.is_item_in_cart ? "contained" : "outlined"}
                  onClick={handleAddToCartClick}
                  className={customStyles.button}
                >
                  ADD TO CART{" "}
                  {isCartLoadingSpin && (
                    <CircularProgress
                      size={15}
                      color={currBook.is_item_in_cart ? "secondary" : "primary"}
                      sx={{ marginLeft: "15px" }}
                    />
                  )}
                </Button>
              </Box>
              <Box className={customStyles.rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={currBook.rating}
                  precision={0.5}
                  readOnly
                />
              </Box>
              <Typography className={customStyles.description}>
                Description:
              </Typography>
              {currBook && currBook["description"] && (
                <Box className={customStyles.description}>
                  {currBook["description"].split("\n").map(
                    (line, index) =>
                      line.trim() !== "" && (
                        <React.Fragment key={index}>
                          <Typography className={customStyles.paragraph}>
                            {line}
                          </Typography>
                          <Typography>
                            <br></br>
                          </Typography>
                        </React.Fragment>
                      )
                  )}
                </Box>
              )}
              <Typography
                className={customStyles.title}
                sx={{ marginTop: "20px" }}
              >
                Author :{" "}
                <Box
                  component="span"
                  sx={{ fontSize: "24px", fontWeight: "400" }}
                >
                  {currBook.author}
                </Box>
              </Typography>
              <Typography className={customStyles.description}>
                Author Description:
              </Typography>
              {currBook && currBook["author_description"] && (
                <Box className={customStyles.description}>
                  {currBook["author_description"].split("\n").map(
                    (line, index) =>
                      line.trim() !== "" && (
                        <React.Fragment key={index}>
                          <Typography className={customStyles.paragraph}>
                            {line}
                          </Typography>
                          <Typography>
                            <br></br>
                          </Typography>
                        </React.Fragment>
                      )
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Page>
  );
};

export default DetailViewPage;
