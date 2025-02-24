import React, { useState, useRef } from "react";
import "./Home.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/${searchTerm}`);  
    } else {
      navigate("/"); 
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    handleSearch(value);
  };

  return (
    <div className="homeContainer">
      <div className="headerPart">
        <div className="searchContainer">
          <input
            value={keyword}
            onChange={handleInputChange}
            placeholder="Search Images with categories like car, home,mountain,holi,diwali,water,nature etc.."
            type="search"
          />
        </div>
      </div>
      <div className="contentPart">
        <Card />
      </div>
    </div>
  );
};

export default Home;
