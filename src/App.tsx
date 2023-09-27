import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <MainLayout />
      <ToastContainer />
    </>
  );
}

export default App;
