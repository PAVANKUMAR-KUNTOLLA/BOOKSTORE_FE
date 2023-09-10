import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  TextField,
  useMediaQuery,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { setLoadingSpin } from "../../redux/bookStore/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
const customProfileStyles = makeStyles((theme) => ({
  mainBlock: {
    marginTop: "50px",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
  },
  account: {
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "10px",
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
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
  },
  subTitle: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "left",
    marginTop: "24px",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      letterSpacing: "0.5px",
    },
  },
}));

const ProfilePage = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.app.userInfo);
  const [scrollEl, setScrollEl] = useState();
  const customStyles = customProfileStyles();

  function stringAvatar(name) {
    if (name.split(" ").length == 1) {
      return {
        children: `${name.split(" ")[0][0]}`,
      };
    }
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleBookView = (id, title) => {
    console.log(title);
    const regex = /[^a-zA-Z0-9-]/g;
    navigate(`/app/books/${id}/${title.replace(/ /g, "-").replace(regex, "")}`);
  };

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = 100;
    }
  }, [scrollEl]);

  return (
    <Page title="Profile">
      {sessionStorage.getItem("token") ? (
        <Container maxWidth="md" className={customStyles.mainBlock}>
          <Box className={customStyles.account}>
            {userInfo.name && (
              <Avatar
                {...stringAvatar(userInfo.name)}
                sx={{
                  width: "100px",
                  height: "100px",
                  fontSize: "48px",
                  color: "white",
                  backgroundColor: "rgb(0,76,153,0.8)",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            )}
            <Card sx={{ marginTop: "20px" }}>
              <CardHeader
                subheader={"This information can't be edited"}
                title={"PROFILE"}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={userInfo?.["name"]}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={userInfo?.["email"]}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone_no"
                          value={userInfo ? userInfo["phone_no"] : ""}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="College"
                          name="college"
                          value={userInfo ? userInfo["college"] : ""}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={userInfo ? userInfo["address"] : ""}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography className={customStyles.subTitle}>
              Order History
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ marginTop: "35px", maxHeight: "350px" }}
            >
              <PerfectScrollbar
                containerRef={(ref) => {
                  setScrollEl(ref);
                }}
              >
                <Table
                  sx={{ maxWidth: { xs: "767px", md: "1024px" } }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userInfo["orderHistory"].map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleBookView(row.product_id, row.title)
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{row.order_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
            </TableContainer>
          </Box>

          {/* <Box maxWidth={"sm"} sx={{ marginLeft: "auto", marginRight: "auto" }}>
            <Typography className={customStyles.subTitle}>
              Recently Visited
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                marginTop: "20px",
                maxHeight: "350px",
              }}
            >
              <PerfectScrollbar
                containerRef={(ref) => {
                  setScrollEl(ref);
                }}
              >
                <Table sx={{ maxWidth: "md" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Count</TableCell>
                      <TableCell align="left">Viewed_at</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userInfo["visitHistory"].map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() => handleProductView(row.id, row.title)}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{row.view_count}</TableCell>
                        <TableCell align="left">{row.visited_at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
            </TableContainer>
          </Box> */}
        </Container>
      ) : !sessionStorage.getItem("token") ? (
        <Container maxWidth="md">
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "25%" }}>
            <Typography sx={{ marginBottom: "20px" }}>
              Please sigin to view profile
            </Typography>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Click here to login
            </Button>
          </Grid>
        </Container>
      ) : null}
    </Page>
  );
};

export default ProfilePage;
