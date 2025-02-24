import {
  Button,
  Card,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import React from "react";
import "./CardImage.css";
import { NavLink } from "react-router-dom";

const CardImage = ({ curImage }) => {
  return (
    <Card
      className="cardContainer"
      sx={{
        maxWidth: 290,
        m: 2,
        p: 2,
        gap:2,
        cursor:"pointer",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <NavLink  to={`/image/${curImage._id}`}>
      <CardMedia
        component="img"
        height="300"
        
        sx={{
          borderRadius: "10px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(0.8)",
           
          },
        }}
        image={curImage.image.url}
        alt="Uploaded Image"
      />
      </NavLink>

     <NavLink  to={`/image/${curImage._id}`} style={{textDecoration:"none",color:"white"}}>
     <CardActions >
        <Button variant="contained" fullWidth>
         Add Caption
        </Button>
      </CardActions>
     </NavLink>
    </Card>
  );
};

export default CardImage;
