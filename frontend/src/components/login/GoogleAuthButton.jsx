import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function GoogleAuthButton() {
    const handleSuccess = (response) => {
        const token = response.credential;
        const user = jwtDecode(token); // { email, name, picture, sub }
        console.log("Google User:", user);

        // Send token to backend for verification + JWT issuing
        fetch(`${BaseBackendURL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />;
}

export default GoogleAuthButton;
