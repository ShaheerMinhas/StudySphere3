import React, { useState, useEffect } from 'react';
import { auth } from '../../fire'; // Import the auth object from your Firebase configuration
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import logo from "../../components/logo.png";
import video from "../../components/video.gif";
import call from "../../components/calling.gif";
import text from "../../components/text.gif";
import quit from "../../components/quit.gif";
import background from '../../components/background.gif';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

// Your existing component code...

export default function Home() {
  // State to store the signed-in user's email
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Add listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUserEmail(user.email); // Set the user's email
      } else {
        // User is signed out
        setUserEmail(null); // Clear the user's email
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "14px",
  backgroundColor: "#13111b",
  borderColor: "#392b65",
  borderWidth: 2,
  borderStyle: "solid",
  "&:hover": {
    borderColor: "#ea9022",
  },
  marginBottom: 14,
  width: "90%",
}));

const SearchIconWrapper1 = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#392b65",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#392b65",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontStyle: "italic",
  },
}));

export default function Home() {
  const currentDay = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
  });

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
  });

  const currentYear = new Date().toLocaleDateString("en-US", {
    year: "numeric",
  });

  const currentWeek = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: 82,
          backgroundColor: "#181521",
          borderBottom: 1,
          borderColor: "#392b65",
        }}
      >
        <Toolbar sx={{}}>
          <div>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "120px", marginTop: 14, marginLeft: -35 }}
            />
          </div>
          <Search sx={{ marginTop: 1.4, maxWidth: "1214px" }}>
            <SearchIconWrapper1>
              <SearchIcon />
            </SearchIconWrapper1>
            <form>
              <StyledInputBase
                placeholder="Search Channels"
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </Search>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#13111b",
              border: 1,
              borderWidth: "2px",
              borderColor: "#392b65",
              width: "14%",
              "&:hover": {
                backgroundColor: "#13111b",
                borderColor: "#ea9022",
              },
              marginTop: 0,
              marginLeft: 3,
              textAlign: "left",
            }}
            onClick={(event) => {
              //setSelectedChannel(text);
              //console.log(text);
              //rest of functionality
            }}
          >
            JOIN CHANNEL
          </Button>

          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{
              marginLeft: "33px",
              marginTop: "-4px",
              height: "40px",
              width: "40px",
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#181521",
          height: "100vh",
          width:'100%',
        }}
      >
        <Toolbar sx={{ marginBottom: "39px" }} />
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            height: "400px",
            backgroundColor: "#392b65",
            borderRadius: "22px",
          }}
        >
          <img
            src={background}
            style={{
              display: "block",
              height: "100%",
              width: "1280px",
              objectFit: "cover",
              borderRadius: "22px",
            }}
          /> 
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{
              position: "absolute",
              top: "25%",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              background: "transparent",
              fontWeight: "bold",
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{
              position: "absolute",
              top: "42%",
              color: "white",
              fontSize: "20px",
              fontStyle: "italic",
              lineHeight: "2",
            }}
          >
            {currentDay} / {currentMonth} / {currentYear}.
            <br />
            {currentWeek}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "57px",
          }}
        >
          <Stack direction="row" spacing={7} alignItems="stretch">
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderWidth: "2px",
                width: isSmallScreen ? "110px" : "170px",
                height: isSmallScreen ? "110px" : "179px",
                position: "relative",
              }}
            >
              <img
                src={video}
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
              <Link to="/VideoLobby" >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "14px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: "14",
                    width: isSmallScreen ? "110px" : "170px",
                    height: isSmallScreen ? "110px" : "179px",
                    "&:hover": {
                      border: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      borderColor: "#392b65",
                    },
                    position: "absolute",
                    top: "49%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "left",
                    "&::before": {
                      content: "attr(data-text)",
                      position: "absolute",
                      bottom: "0",
                      fontWeight: "bold",
                      fontSize: "25px",
                      padding: "10px",
                    },
                  }}
                  onClick={(event) => {
                    //setSelectedChannel(text);
                    //console.log(text);
                    //rest of functionality
                  }}
                  data-text="Video Channels"
                ></Button>
              </Link>

            </div>

            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderWidth: "2px",
                width: isSmallScreen ? "110px" : "170px",
                height: isSmallScreen ? "110px" : "179px",
                position: "relative",
              }}
            >
              <img
                src={call}
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "14px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: "14",
                  width: isSmallScreen ? "110px" : "170px",
                  height: isSmallScreen ? "110px" : "179px",
                  "&:hover": {
                    border: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "#392b65",
                  },
                  position: "absolute",
                  top: "49%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "left",
                  "&::before": {
                    content: "attr(data-text)",
                    position: "absolute",
                    bottom: "0",
                    fontWeight: "bold",
                    fontSize: "25px",
                    padding: "10px",
                  },
                }}
                onClick={(event) => {
                  //setSelectedChannel(text);
                  //console.log(text);
                  //rest of functionality
                }}
                data-text="Voice Channels"
              ></Button>
            </div>

            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderWidth: "2px",
                width: isSmallScreen ? "110px" : "170px",
                height: isSmallScreen ? "110px" : "179px",
                position: "relative",
              }}
            >
              <img
                src={text}
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "14px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: "14",
                  width: isSmallScreen ? "110px" : "170px",
                  height: isSmallScreen ? "110px" : "179px",
                  "&:hover": {
                    border: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "#392b65",
                  },
                  position: "absolute",
                  top: "49%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "left",
                  "&::before": {
                    content: "attr(data-text)",
                    position: "absolute",
                    bottom: "0",
                    fontWeight: "bold",
                    fontSize: "25px",
                    padding: "10px",
                  },
                }}
                onClick={(event) => {
                  //setSelectedChannel(text);
                  //console.log(text);
                  //rest of functionality
                }}
                data-text="Text Channels"
              ></Button>
            </div>
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderWidth: "2px",
                width: isSmallScreen ? "110px" : "170px",
                height: isSmallScreen ? "110px" : "179px",
                position: "relative",
              }}
            >
              <img
                src={quit}
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "14px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: "14",
                  width: isSmallScreen ? "110px" : "170px",
                  height: isSmallScreen ? "110px" : "179px",
                  "&:hover": {
                    border: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "#392b65",
                  },
                  position: "absolute",
                  top: "49%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "left",
                  "&::before": {
                    content: "attr(data-text)",
                    position: "absolute",
                    bottom: "0",
                    fontWeight: "bold",
                    fontSize: "25px",
                    padding: "10px",
                  },
                }}
                onClick={(event) => {
                  //setSelectedChannel(text);
                  //console.log(text);
                  //rest of functionality
                }}
                data-text="Quit session"
              ></Button>
            </div>
          </Stack>
        </div>
      </Box>
    </>
  );
}
