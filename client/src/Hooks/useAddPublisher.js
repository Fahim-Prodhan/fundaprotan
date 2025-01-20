import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useAddPublisher = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const addPublisher = async ({
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    role,
    verified,
  }) => {
    const success = handleInputErrors({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      role,
      verified,
    });
    if (!success) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You want add an publisher?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Add",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const res = await fetch("/api/auth/addPublisher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              username,
              email,
              password,
              confirmPassword,
              role,
              verified,
            }),
          });
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          toast.success("New Publisher is Added!");
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
          navigate('/admin/users')
        }
      }
    });
  };
  return { loading, addPublisher };
};

export default useAddPublisher;

function handleInputErrors({
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
  role,
  verified,
}) {
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !role ||
    !verified
  ) {
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
