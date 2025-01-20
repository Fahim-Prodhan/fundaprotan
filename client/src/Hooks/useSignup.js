import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signup = async ({ firstName, lastName, username, email, password, confirmPassword , role }) => {
        const success = handleInputErrors({ firstName, lastName, username, email, password, confirmPassword ,role });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, username, email, password, confirmPassword ,role }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Successfully send otp!')
            localStorage.setItem("foundation", JSON.stringify(data));
            setAuthUser(data);
            navigate("/otp");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ firstName, lastName, username, email, password, confirmPassword ,role }) {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !role) {
        toast.error("Please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}
