import React from "react";
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
import AppBarLayout from "../../components/Appbar/appbar";
import BlogCard from "../../components/Card/blogCard";
import { theme } from "highcharts";

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
  },
  titleName: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "193px",
    lineHeight: "243.88px",
    color: "#FFFFFF",
    whiteSpace: "nowrap", // Prevent line breaks
    [theme.breakpoints.down("md")]: {
      fontSize: "160px",
      lineHeight: "190px",
    },
  },
  recentBlog: {
    height: "80vh",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },

  detailsTags: {
    fontFamily: "lato",
    fontWeight: "200",
    backgroundColor: "#FFFFFF",
    height: "20px",
    borderRadius: "2px solid #090D1F",
  },
}));

const HomeBlog = () => {
  const blogData = [
    // Array of blog post objects
    { title: "Blog Post 1", content: "Content for Blog Post 1" },
    { title: "Blog Post 2", content: "Content for Blog Post 2" },
    { title: "Blog Post 3", content: "Content for Blog Post 3" },
    { title: "Blog Post 4", content: "Content for Blog Post 4" },
    { title: "Blog Post 5", content: "Content for Blog Post 5" },
    { title: "Blog Post 6", content: "Content for Blog Post 6" },
  ];

  const customStyles = customSignInStyles();
  return (
    <Page title="blog">
      <Box sx={{ backgroundColor: "#090D1F" }}>
        <Container maxWidth="lg">
          <AppBarLayout />
          <Box className={customStyles.title} maxWidth="md">
            <hr></hr>
            <Typography className={customStyles.titleName}>THE BLOG</Typography>
            <hr></hr>
          </Box>
          <Box className={customStyles.recentBlog} maxWidth="md">
            <Typography className={customStyles.profileName}>
              {" "}
              Recent blog posts
            </Typography>
            <Grid display={"flex"} className={customStyles.recentCard}>
              <Grid marginRight="10px">
                <BlogCard />
              </Grid>
              <Grid marginRight="10px">
                <BlogCard />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
            }}
            maxWidth="md"
            marginTop={"40px"}
          >
            <Typography className={customStyles.profileName}>
              All blog posts
            </Typography>
            <Grid container spacing={2}>
              {blogData.map((blog, index) => (
                <Grid item key={index} xs={12} md={6} lg={4}>
                  <BlogCard title={blog.title} content={blog.content} />
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
            maxWidth="md"
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
    </Page>
  );
};

export default HomeBlog;
