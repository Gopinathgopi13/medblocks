import { createBrowserRouter } from "react-router-dom";
import Patients from "../views/home/patients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Patients />,
  },
]);
