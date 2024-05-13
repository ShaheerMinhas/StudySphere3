/*import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";

import peer from "../../service/peer";
import { useSocket } from "../../context/SocketProvider";*/

//import * as React from "react";

import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import peer from "../../service/peer";
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
import Stack from "@mui/material/Stack";

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

const RoomPage = () => {
  /*const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);*/

  const [searchValue, setSearchValue] = React.useState("");
  const [selectedChannel, setSelectedChannel] = React.useState("");

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

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

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const url=window.location.href;
  const sc2=url.charAt(url.length-1);
  const sc1="Video Channel ";
  const title3=sc1 + sc2;
  const [isButtonHidden, setButtonHidden] = useState(false);


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
                {title3}
              </Typography>
            
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
                //console.log(text);
                //console.log(title3);
                if(text!=title3 && !remoteSocketId){
                setSelectedChannel(text);
                handleSubmitForm(event, index + 1);
                }
                else if(text==title3 && !remoteSocketId){
                  window.location.reload();;
                }
                else if(text==title3 && remoteSocketId){
                  //window.location.reload();;
                }
                else if(text!=title3 && remoteSocketId){
                  window.location.reload();;
                }
                
              }}
            >
              {text}
            </Button>
          ))}
        </List>
      </Drawer>
      
      <div>
      <Toolbar/>
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
            {remoteSocketId ? "CONNECTED" : "NO ONE HERE"}
          </Typography>
      {myStream && <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderColor: "#392b65",
                borderWidth: "2px",
                width: "10%",
                height: "5%",
                "&:hover": {
                  border: 1,
                  backgroundColor: "#13111b",
                  borderColor: "#ea9022",
                },
                position: "absolute",
                top: 690,
                right: 14,
                textAlign: "left",
              }}
              onClick={sendStreams}
            >
              SEND STREAM
            </Button>}

            {isButtonHidden && remoteSocketId && <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderColor: "#392b65",
                borderWidth: "2px",
                width: "10%",
                height: "5%",
                "&:hover": {
                  border: 1,
                  backgroundColor: "#D60C0C"
                },
                position: "absolute",
                top: 750,
                right: 14,
                textAlign: "left",
              }}
              onClick={(event) => {window.location.reload();}}
            >
              LEAVE
            </Button>}

      {!isButtonHidden && remoteSocketId && <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "14px",
                backgroundColor: "#13111b",
                borderColor: "#392b65",
                borderWidth: "2px",
                width: "10%",
                height: "14%",
                "&:hover": {
                  border: 1,
                  backgroundColor: "#13111b",
                  borderColor: "#ea9022",
                  color: "#0ca877",
                },
                textAlign: "left",
                position: "absolute",
                top: 110, 
                right: 14,
              }}
              onClick={(event) => {setButtonHidden(true); handleCallUser()}}
            >
              CALL
            </Button>}

      {myStream && (
        <>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              color: "#13111b",
              fontStyle: "italic",
              fontWeight: "bold",
              position: "absolute",
            }}
            top={110}
            left={400}
          >
            YOUR STREAM
          </Typography>
          <div style={{ position: "absolute", top: 72, left:400}}>
          <ReactPlayer
            playing
            muted={false}
            height="400px"
            width="259px"
            url={myStream}
          />
          </div>
        </>
      )}
      {remoteStream && (
        <>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              color: "#13111b",
              fontStyle: "italic",
              fontWeight: "bold",
              position: "absolute",
            }}
            top={400}
            left={400}
          >
            OTHER'S STREAM
          </Typography>
          <Stack direction="row" spacing={2} alignItems="stretch">
          <div style={{ position: "absolute", top: 360, left:400}}>
          <ReactPlayer
            playing
            muted={false}
            height="400px"
            width="259px"
            url={remoteStream}
          />
          </div>
          </Stack>
        </>
      )}
    </div>
    </Box>
  );
};

export default RoomPage;