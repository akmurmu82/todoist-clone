import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import PropTypes from "prop-types";

// Note: This is a placeholder implementation
// You'll need to set up Google OAuth properly with your Google Console project
const GoogleSignIn = ({ onSuccess, onError, buttonText = "Continue with Google" }) => {
  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement actual Google Sign-In
      // This would typically use Google's OAuth library
      console.log("Google Sign-In initiated");
      
      // Placeholder success response
      const mockGoogleResponse = {
        profileObj: {
          email: "user@gmail.com",
          name: "Google User",
          imageUrl: "https://via.placeholder.com/150"
        },
        tokenId: "mock-google-token"
      };
      
      if (onSuccess) {
        onSuccess(mockGoogleResponse);
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Button
      variant="outline"
      fontSize="lg"
      w="full"
      leftIcon={<FaGoogle />}
      aria-label={buttonText}
      _hover={{ bg: "gray.100" }}
      onClick={handleGoogleSignIn}
    >
      {buttonText}
    </Button>
  );
};

GoogleSignIn.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  buttonText: PropTypes.string,
};

export default GoogleSignIn;