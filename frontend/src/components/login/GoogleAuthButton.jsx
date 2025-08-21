import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function GoogleAuthButton() {
    let navigate = useNavigate();
    const handleSuccess = async (response) => {
        const token = response.credential;
        const user = jwtDecode(token); // { email, name, picture, sub }
        console.log("Google User:", user);

        // Send token to backend for verification + JWT issuing
        // fetch(`${BaseBackendURL}/auth/google`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ token }),
        // });
        try {
            const res = await fetch(`${BaseBackendURL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
                credentials: "include", // 🔑 allows cookies
            });

            console.log("Res:", res.ok)
            if (res.ok) {
                // ✅ Navigate to /home after cookie is set
                navigate("/home");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />;
}

export default GoogleAuthButton;
