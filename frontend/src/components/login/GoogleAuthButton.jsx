import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser, setAuthenticated } from "../../redux/slices/userSlice";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function GoogleAuthButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleSuccess = async (response) => {
        const token = response.credential;
        const user = jwtDecode(token); // { email, name, picture, sub }
        console.log("Google User:", user);

        try {
            const res = await axios.post(
                `${BaseBackendURL}/api/auth/google`,
                { token }, // body directly
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = res.data;
            console.log("Google auth response:", data);

            if (res.status === 200) {
                // Store the JWT token
                localStorage.setItem("todoistAuthToken", JSON.stringify(data.token));

                // Update Redux state
                dispatch(updateUser(data.user));
                dispatch(setAuthenticated(true));

                toast({
                    title: "Login successful",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

                // Navigate to home
                navigate("/home");
            } else {
                throw new Error(data.message || "Google authentication failed");
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast({
                title: "Login failed",
                description: err.response?.data?.message || err.message || "Please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleError = () => {
        console.log("Google Login Failed");
        toast({
            title: "Google Login Failed",
            description: "Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}

export default GoogleAuthButton;
