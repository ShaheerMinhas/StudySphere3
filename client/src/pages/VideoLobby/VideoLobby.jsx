/*import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import "./LobbyScreen.css"; // Import your CSS file

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container"> //Create a container div for the background
      <Card className="lobby-card"> //Add a class to the card
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Lobby
          </Typography>
          <form onSubmit={handleSubmitForm}>
            <TextField
              id="email"
              label="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="room"
              label="Room Number"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Join
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LobbyScreen;*/

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import voicec from "../../components/voicec.gif";

const drawerWidth = 351;
const email = "abc";
const videoChannels1 = ["Video Channel 1", "Video Channel 2", "Video Channel 3"];

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontStyle: "italic",
  },
}));

export default function VideoLobby() {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedChannel, setSelectedChannel] = React.useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = React.useCallback(
    (e, roomNumber) => {
      e.preventDefault();
      socket.emit("room:join", { email, room: roomNumber });
    },
    [email, socket]
  );

  const handleJoinRoom = React.useCallback(
    (data) => {
      const { room } = data;
      console.log("Room-itr2:", room);
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  React.useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  React.useEffect(() => {
    console.log("Selected channel changed:", selectedChannel);
    const temp = selectedChannel.match(/\d+/);
    const roomNumber = temp ? parseInt(temp[0]) : null;
    console.log("Room-itr1: ", roomNumber);
  }, [selectedChannel]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputValue = searchValue.trim();
      const exists = videoChannels1.includes(inputValue);
      if (exists) {
        const button = document.getElementById(inputValue);
        if (button) {
          button.click();
          setSelectedChannel(inputValue);
        }
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#181521",
            borderBottom: 1,
            borderColor: "#392b65",
            borderWidth: "2px",
            height: "66px",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            {selectedChannel && (
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "60%",
                  zIndex: 1,
                  fontWeight: "bold",
                }}
              >
                {selectedChannel}
              </Typography>
            )}
            <Avatar
              src={voicec}
              sx={{
                bgcolor: "#392b65",
                width: 720,
                borderRadius: 3,
                marginLeft: 37,
                zIndex: 0,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#13111b",
            borderRight: "2px solid #392b65",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#ffffff",
            }}
          >
            Video Channels
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: "#392b65", borderWidth: "1px" }} />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Search>
            <SearchIconWrapper1>
              <SearchIcon />
            </SearchIconWrapper1>
            <form
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            >
              <StyledInputBase
                placeholder="Search Channels"
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </Search>
          {videoChannels1.map((text, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              id={text}
              sx={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderColor: "#392b65",
                borderWidth: "2px",
                width: "90%",
                "&:hover": {
                  border: 1,
                  backgroundColor: "#13111b",
                  borderColor: "#ea9022",
                },
                marginBottom: 2,
                textAlign: "left",
              }}
              onClick={(event) => {
                setSelectedChannel(text);
                handleSubmitForm(event, index + 1);
              }}
            >
              {text}
            </Button>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#181521", height: "100vh" }}
      >
        <Toolbar />
        {!selectedChannel && (
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{
              color: "#13111b",
              fontStyle: "italic",
              fontWeight: "bold",
              position: "absolute",
              bottom: 0,
              right: 0,
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            SELECT CHANNEL
          </Typography>
        )}
      </Box>
    </Box>
  );
}


