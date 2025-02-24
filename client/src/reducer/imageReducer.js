const imageReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_IMAGE_REQUEST":
    case "GET_SINGLE_IMAGE_REQUEST":
    case "UPDATE_SINGLE_IMAGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_ALL_IMAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        images: action.payload.images,
       
      };

    case "GET_SINGLE_IMAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        image: action.payload,
      };

    case "UPDATE_SINGLE_IMAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "GET_ALL_IMAGE_FAIL":
    case "GET_SINGLE_IMAGE_FAIL":
    case "UPDATE_SINGLE_IMAGE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_SINGLE_IMAGE_RESET":
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};
export default imageReducer;
