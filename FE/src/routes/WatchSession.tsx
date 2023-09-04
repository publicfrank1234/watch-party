import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { setSessionId, setVideoUrl } from "../redux/videoPlayerSlice"; // Import your action

const WatchSession: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState<string | null>(null);
  const dispatch = useDispatch(); 

  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Dispatch the sessionId to Redux
      dispatch(setSessionId(sessionId));
    }


    // Send a GET request to retrieve the videoLink
    fetch(`http://localhost:3000/api/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('Session not found');
        } else {
          throw new Error(`Failed to retrieve videoLink: ${response.statusText}`);
        }
      })
      .then((data) => {
        const { videoLink } = data;
        // Now, you have the videoLink for the given sessionId
        console.log('Video Link:', videoLink);
        setUrl(videoLink);
        dispatch(setVideoUrl(videoLink))
      })
      .catch((error) => {
        console.error(error.message);
      });
    
    // setUrl(videoLink);
    // // load video by session ID -- right now we just hardcode a constant video but you should be able to load the video associated with the session
    //setUrl("https://www.youtube.com/watch?v=NX1eKLReSpY");

    // if session ID doesn't exist, you'll probably want to redirect back to the home / create session page
  }, [dispatch, sessionId]);

  if (!!url) {
    return (
      <>
        <Box
          width="100%"
          maxWidth={1000}
          display="flex"
          gap={1}
          marginTop={1}
          alignItems="center"
        >
          <TextField
            label="Youtube URL"
            variant="outlined"
            value={url}
            inputProps={{
              readOnly: true,
              disabled: true,
            }}
            fullWidth
          />
          <Tooltip title={linkCopied ? "Link copied" : "Copy link to share"}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              disabled={linkCopied}
              variant="contained"
              sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}
            >
              <LinkIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Create new watch party">
            <Button
              onClick={() => {
                navigate("/create");
              }}
              variant="contained"
              sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Tooltip>
        </Box>
        <VideoPlayer url={url} />;
      </>
    );
  }

  return null;
};

export default WatchSession;
