import React, { useEffect, useRef, useState } from "react";
import "./ImageDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useImageContext } from "../../context/imageContext";
import { Button, CircularProgress } from "@mui/material";

const ImageDetails = () => {
  const [description, setdescription] = useState("");
  const [buttonLoading, setbuttonLoading] = useState(false);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  const {
    error,
    image = {},
    getSingleImageDetails,
    updateImageDetails,

    error: updatederror,
  } = useImageContext();
  console.log(image);

  const { id } = useParams();

  useEffect(() => {
    getSingleImageDetails(id);

    if (updatederror) {
      toast.error(error);
      setbuttonLoading(false);
    }
  }, [id]);

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      ctx.font = "30px Monstreat";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      ctx.fillText(
        image?.image?.description || "",
        img.width / 2,
        img.height / 2
      );

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "image_with_caption.png";
      link.click();
    };

    img.src = image.image?.image?.url;
  };

  const handleAddCaption = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please enter a caption before submitting!");
      return;
    }

    try {
      setbuttonLoading(true);
      const response = await updateImageDetails(id, description);
      if (response) {
        setbuttonLoading(false);
        setdescription("");
        toast.success("Caption has been added successfully");
        navigate(`/image/${id}`);

        getSingleImageDetails(id);
      }
    } catch (error) {
      toast.error("Unable to update, please try again");
      setbuttonLoading(false);
    }
  };

  return (
    <div className="ImageDetailsContainer">
      <div className="leftSection">
        <img src={image.image?.image?.url} value={description} alt="" />
        {image && (
          <div className="imageCaption">
            {description || image.image?.description}
          </div>
        )}
      </div>
      <div className="righSection">
        <div className="righSectionContent">
          <div>
            <h1>Write Caption</h1>
            <input
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              required
              placeholder="Enter Caption"
              type="text"
            />
            <div className="buttonContainer">
              <Button
                disabled={buttonLoading}
                fullWidth
                sx={{ backgroundColor: "black" }}
                variant="contained"
                onClick={handleAddCaption}
              >
                {buttonLoading ? <CircularProgress size={18} /> : "Add Caption"}
              </Button>
              <Button
                fullWidth
                sx={{ backgroundColor: "black" }}
                variant="contained"
                onClick={handleDownloadImage}
              >
                Download Image
              </Button>
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
    </div>
  );
};

export default ImageDetails;
