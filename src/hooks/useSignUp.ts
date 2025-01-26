import { useMutation, UseMutationResult } from "@tanstack/react-query";

export type SignUpUserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date; // Ensure consistency with DateTime in C#
  phoneNumber?: string;
  username: string; // Ensure username is included
  profilePictureUrl?: string;
  address?: string;
  role: "user" | "admin";
  sqlServerId: string;
};

// Define the expected response type from the sign-up API
export interface SignUpResponse {
  id: string; // Adjust according to your API response
  email: string;
  firstName: string;
  lastName: string;
  sqlServerId: string;
  dateOfBirth: Date;
  username: string;
}

// Define the expected error type if needed
export interface SignUpError {
  message: string;
}

// Function to handle the sign-up API call
const signUpUser = async (
  userData: SignUpUserData
): Promise<SignUpResponse> => {
  const response = await fetch("/api/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up");
  }

  return response.json(); // Return the expected response data
};

// Custom hook for signing up users
const useSignUp = (): UseMutationResult<
  SignUpResponse,
  SignUpError,
  SignUpUserData
> => {
  return useMutation<SignUpResponse, SignUpError, SignUpUserData>({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
      // You can add any additional success handling here
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      // You can add any additional error handling here
    },
  });
};

export default useSignUp;
