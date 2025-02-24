import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/imageReducer";
import axios from "axios";

const ImageContext = createContext();

const API = "http://localhost:8000/api/v1/image";

const initialState = {
  loading: false,
  error: null,
  image: {},
  images: [],
  currentPage: 1,
  resultPerPage: 0,
  imageCounts: 0,
  isUpdated: false,
};

const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllImages = async (keyword = "") => {
    try {
      dispatch({ type: "GET_ALL_IMAGE_REQUEST" });

      const { data } = await axios.get(`${API}/allimages?keyword=${keyword}`, {
        withCredentials: true,
      });

      dispatch({
        type: "GET_ALL_IMAGE_SUCCESS",
        payload: {
          images: data.images,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_ALL_IMAGE_FAIL",
        payload: error.response?.data?.message,
      });
    }
  };

  // get single image details

  const getSingleImageDetails = async (id) => {
    try {
      dispatch({ type: "GET_SINGLE_IMAGE_REQUEST" });
      const { data } = await axios.get(`${API}/singleimage/${id}`, {
        withCredentials: true,
      });
      dispatch({ type: "GET_SINGLE_IMAGE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "GET_SINGLE_IMAGE_FAIL",
        payload: error.response?.data?.message,
      });
    }
  };

  const updateImageDetails = async (id, description) => {
    try {
      dispatch({ type: "UPDATE_SINGLE_IMAGE_REQUEST" });

      const { data } = await axios.put(
        `${API}/update/${id}`,
        { description }, // ✅ Corrected payload
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UPDATE_SINGLE_IMAGE_SUCCESS",
        payload: data.image, // Ensure the backend sends the updated image
      });

      return data.image;
    } catch (error) {
      dispatch({
        type: "UPDATE_SINGLE_IMAGE_FAIL",
        payload: error.response?.data?.message || "Error updating image",
      });
      return null;
    }
  };

  return (
    <ImageContext.Provider
      value={{
        ...state,
        getAllImages,
        getSingleImageDetails,
        updateImageDetails,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// custom hook

const useImageContext = () => {
  return useContext(ImageContext);
};

export { ImageContext, ImageProvider, useImageContext };
