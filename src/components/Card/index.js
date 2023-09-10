import React, { Profiler } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const customCardStyles = makeStyles((theme) => ({
  mainBlock: {
    width: "100%",
    height: "520px",
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "400px",
    },
  },
  topBlock: {
    height: "80%",
  },
  posterImage: {
    height: "100%",
    width: "100%",
    objectFit: "scale-down",
    borderRadius: "10px",
    cursor: "pointer",
  },

  bottomBlock: {
    height: "20%",
    padding: "5px 20px",
  },
  bookTitle: {
    color: "#090D1F", // Change text color to white for visibility
    fontFamily: "lato",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "23.88px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "20px",
    },
  },
  bookCategory: {
    fontFamily: "lato",
    fontWeight: "200",
    height: "20px",
    color: "#090D1F",
    borderRadius: "2px solid #090D1F",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "20px",
    },
  },
  bookPrice: {
    lineHeight: "21px",
    fontSize: "24px",
    color: "#222222",
    fontWeight: "700",
    color: "#090D1F",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
      fontSize: "20px",
      lineHeight: "20px",
    },
  },
}));

const BookCard = ({ book, category }) => {
  const customStyles = customCardStyles();
  const navigate = useNavigate();
  const handleBookView = (id, title) => {
    console.log(title);
    const regex = /[^a-zA-Z0-9-]/g;
    navigate(`/app/books/${id}/${title.replace(/ /g, "-").replace(regex, "")}`);
  };

  return (
    <Box className={customStyles.mainBlock} maxWidth="sm">
      <Box className={customStyles.topBlock}>
        <Avatar
          variant="square"
          className={customStyles.posterImage}
          src={book.image}
          onClick={() =>
            category
              ? navigate(`/app/books/categories/${book.category}`)
              : handleBookView(book.id, book.title)
          }
        ></Avatar>
      </Box>
      <Box className={customStyles.bottomBlock}>
        {!category && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Typography className={customStyles.bookTitle}>
              {book.title}
            </Typography>
            <Avatar
              src="/static/img/upArrow.svg"
              onClick={() => handleBookView(book.id, book.title)}
              sx={{
                cursor: "pointer",
                height: "36px",
                width: "36px",
                display: { xs: "none", sm: "block" },
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className={
              !category ? customStyles.bookTitle : customStyles.bookPrice
            }
            sx={{ textTransform: "uppercase" }}
          >
            {book.category}
          </Typography>
          {!category && (
            <Typography className={customStyles.bookTitle}>
              Rs. {book.price}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
