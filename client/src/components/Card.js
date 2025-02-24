import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useImageContext } from "../context/imageContext";
import CardImage from "./helper/cardImage/CardImage";
import { Grid, Typography } from "@mui/material";
import "./Card.css";
import toast from "react-hot-toast";
import Loader from "./helper/loader/Loader";

const Card = () => {
  const { getAllImages, loading, images = [], error } = useImageContext();
  const { keyword } = useParams();

  useEffect(() => {
    getAllImages(keyword || "");

    if (error) {
      toast.error(error);
    }
  }, [keyword, error]);

  const groupedImages = images.reduce((acc, curImage) => {
    const category = curImage.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curImage);
    return acc;
  }, {});

  return (
    <Grid padding={3} container spacing={2} justifyContent="center" className="ImageContainer">
      {loading ? (
        <Loader />
      ) : Object.keys(groupedImages).length > 0 ? (
        Object.keys(groupedImages).map((category) => (
          <Grid item xs={12} key={category}>
            <Typography variant="h5" color="primary" style={{ marginBottom: "10px", color:'black', textTransform: "capitalize" }}>
              {category}
            </Typography>
            
            <Grid container spacing={2}>
              {groupedImages[category].map((curImage) => (
                <Grid item xs={12} sm={6} md={3} key={curImage._id}>
                  <CardImage curImage={curImage} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: "20px" }}>
          No results found for "{keyword}"
        </Typography>
      )}
    </Grid>
  );
};

export default Card;
