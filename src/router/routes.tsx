import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import App from "../App";
import BookDetails from "../pages/BookDetails";
import AddNewBook from "../pages/AddNewBook";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
