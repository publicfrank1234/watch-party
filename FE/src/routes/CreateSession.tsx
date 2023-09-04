import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux"; 
import { setSessionId, setVideoUrl } from "../redux/videoPlayerSlice"; // Import your action


const CreateSession: React.FC = () => {
  const navigate = useNavigate();
  const [newUrl, setNewUrl] = useState("");
  const dispatch = useDispatch();

  const createSession = async () => {
    setNewUrl("");
    const sessionId = uuidv4();
    dispatch(setSessionId(sessionId));
    dispatch(setVideoUrl(newUrl));

    // Send a POST request to your server to create a new session
    console.log("Creating session: ", sessionId, newUrl)
    const response = await fetch("http://localhost:3000/api/sessions/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        videoLink: newUrl,
      }),
    });

    if (response.status === 201) {
      navigate(`/watch/${sessionId}`);
    } else {
      console.error("Failed to create session:", response.statusText);
    }
  };

  return (
    <div>
    <h2>link: https://www.youtube.com/watch?v=NX1eKLReSpY</h2>
    <Box width="100%" maxWidth={600} display="flex" gap={1} marginTop={1}>
      <TextField
        label="Youtube URL"
        variant="outlined"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        fullWidth
      />
      <Button
        disabled={!newUrl}
        onClick={createSession}
        size="small"
        variant="contained"
      >
        Create a session
      </Button>
    </Box>
    </div>
  );
};

export default CreateSession;
