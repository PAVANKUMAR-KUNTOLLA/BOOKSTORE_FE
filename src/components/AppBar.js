import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PersistentDrawerLeft from "./sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { privateApiGET, privateApiPOST } from "./PrivateRoute";

import { useSelector, useDispatch } from "react-redux";

import {
  setBooks,
  setLoadingSpin,
  setSearchQuery,
  setSearch,
} from "../redux/bookStore/booksSlice";
import Api from "./Api";
const pages = ["home", "books", "favourites", "cart"];
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "25px",
    },
  },
  rightBlock: {
    width: "40%",
    paddingTop: "30px",
    paddingBottom: "30px",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
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
    cursor: "pointer",
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
  button: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  typography: {
    marginLeft: theme.spacing(1),
    color: "#ffffff",
  },
}));
const AppBarLayout = () => {
  const customStyles = customAppbarStyles();
  const userInfo = useSelector((state) => state.app.userInfo);
  const navigate = useNavigate();

  const [newSearchQuery, setNewSearchQuery] = useState("");
  const state = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavMenu = (value) => {
    let path = value;
    navigate(path);
  };

  const handleCancelClick = () => {
    setNewSearchQuery("");
    dispatch(setSearchQuery(""));
    dispatch(setSearch(false));
    dispatch(setLoadingSpin(true));
    // Optionally, you can clear the search results by calling the handleChange function with an empty query.
    if (params.category) {
      let payload = { category: params.category };
      privateApiPOST(Api.books, payload)
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            console.log("data", data);
            dispatch(setBooks(data?.data));
            dispatch(setLoadingSpin(false));
          }
        })
        .catch((error) => {
          console.log("Error", error);
          dispatch(setLoadingSpin(false));
        });
    } else {
      privateApiGET(Api.books)
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            console.log("data", data);
            dispatch(setBooks(data?.data));

            dispatch(setLoadingSpin(false));
          }
        })
        .catch((error) => {
          console.log("Error", error);
          dispatch(setLoadingSpin(false));
        });
    }
  };

  const handleFetchSearchBooks = () => {
    dispatch(setLoadingSpin(true));
    dispatch(setSearch(true));
    dispatch(setSearchQuery(newSearchQuery));
    let payload = { search: newSearchQuery };
    privateApiPOST(Api.books, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setBooks(data?.data));
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "dodgerblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Avatar
            src="/static/img/super-heros-logo.png"
            sx={{
              height: "60px",
              width: "250px",
            }}
          /> */}
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600px",
              display: { xs: "none", sm: "block" },
            }}
          >
            Library Management System
          </Typography>
          {isMobile && <PersistentDrawerLeft />}
          {!isMobile && (
            <>
              <Box
                maxWidth="sm"
                sx={{
                  display: "flex",
                  alignSelf: "end",
                  marginLeft: "auto",
                  marginRight: "0px",
                }}
              >
                <TextField
                  className={customStyles.globalSearch}
                  name="globalSearch"
                  value={newSearchQuery}
                  placeholder="Search here"
                  onChange={(e) => {
                    setNewSearchQuery(e.target.value);
                    if (!e.target.value && state.isSearchOn) {
                      handleCancelClick();
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={customStyles.searchIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {state.searchQuery && (
                          <IconButton
                            color="inherit"
                            onClick={handleCancelClick}
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      newSearchQuery && handleFetchSearchBooks();
                    }
                  }}
                />

                {[
                  { icon: <HomeIcon />, label: "Home" },
                  { icon: <FavoriteIcon />, label: "Favourites" },
                  { icon: <ShoppingCartIcon />, label: "Cart" },
                  { icon: <AccountCircleIcon />, label: "Profile" },
                ].map((option, index) => (
                  <Button
                    key={index}
                    className={customStyles.button}
                    onClick={() => handleNavMenu(option.label.toLowerCase())}
                  >
                    {option.icon}
                    <Typography
                      variant="body2"
                      className={customStyles.typography}
                    >
                      {option.label}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarLayout;
