import DashBoard from "./pages/DashBoard";
import AuthProvider from "./Context/AuthContext";
import RoutesComponent from "./RoutesComponent";
import 'swiper/swiper.scss';

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
