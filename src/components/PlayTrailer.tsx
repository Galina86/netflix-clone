import { useState } from "react";
import { Button, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import closeIcon from "../assets/images/close_white.png";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 390,
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PlayTrailer = (result: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [trailerURL, setTrailerURL] = useState<string | null>(null);

  const handleClick = (result: any) => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(result?.title || "")
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error: any) => console.log(error));
    }
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
          <img
            src={closeIcon}
            alt="close icon"
            onClick={handleClose}
            className="movie__trailer-close-icon"
          />
          {trailerURL ? (
            <YouTube videoId={trailerURL} opts={options} />
          ) : (
            <p className="movie__trailer-error">
              We are sorry, there is no trailer for this movie.
            </p>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PlayTrailer;
