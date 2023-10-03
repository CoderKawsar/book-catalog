import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/img/google.svg";

function GoogleSignIn() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in error");
    }
  };
  return (
    <div
      onClick={() => void handleGoogleSignIn()}
      className="max-w-md w-full my-12 px-4 py-2 bg-cyan-700 shadow-md rounded-md hover:bg-blue-600 transition-colors duration-300 flex justify-center items-center cursor-pointer"
    >
      <img src={googleIcon} alt="" height={30} width={30} />
      <p className="ml-4 text-white font-medium">Sign in with google</p>
    </div>
  );
}

export default GoogleSignIn;
