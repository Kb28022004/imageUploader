import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import ImageDetails from "../components/imageDetails/ImageDetails";

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/:keyword", element: <Home /> },
    { path: "/image/:id", element: <ImageDetails /> },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
