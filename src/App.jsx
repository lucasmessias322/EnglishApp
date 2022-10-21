import AuthProvider from "./Context/AuthContext";
import RoutesComponent from "./RoutesComponent";
import "swiper/swiper.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
