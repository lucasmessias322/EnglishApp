import RouterComponent from "./RouterComponent";
import AuthProvider from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
