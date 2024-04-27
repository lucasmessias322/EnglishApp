import RouterComponent from "./RouterComponent";
import AuthProvider from "./Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
}

export default App;
