import { useState } from "react";
import { Button, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./PlayTrailer.css";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 420,
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

const PlayTrailer = (result: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [trailerURL, setTrailerURL] = useState<string | null>(null);

  const handleClick = (result: any) => {
    movieTrailer(result?.title || "")
      .then((url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerURL(urlParams.get("v"));
      })
      .catch((error: any) => console.log(error));
  };

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          handleOpen();
          handleClick(result.result);
        }}
      >
        Play trailer
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <div className="trailer_close-icon" onClick={handleClose}>
            <CloseIcon />
          </div>
          {trailerURL ? (
            <YouTube videoId={trailerURL} opts={options} />
          ) : (
            <p className="trailer-error-message">
              We are sorry, there is no trailer for this movie.
            </p>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PlayTrailer;
