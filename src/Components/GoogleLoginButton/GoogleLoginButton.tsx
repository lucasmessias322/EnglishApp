import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { engleshPlusApi } from "../../Apis/englishplusApi";

export default function GoogleLoginButton() {
  const { setToken, setuserId } = useContext(AuthContext);

  async function handleSuccess(response: any) {
    try {
      const res = await engleshPlusApi.post("/auth/google", {
        token: response.credential,
      });

      setToken(res.data.token);
      setuserId(res.data.userId);
      window.location.reload();
    } catch (err) {
      console.error("Erro no login Google", err);
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Google falhou")}
    />
  );
}
