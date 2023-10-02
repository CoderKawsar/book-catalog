import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  const location = useLocation();

  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
