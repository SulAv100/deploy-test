import React, { useState, useEffect } from "react";
import "./Signup.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/Context";

const userScheme = z
  .object({
    email: z
      .string()
      .email("Enter a valid email")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email"
      ),
    username: z.string().min(5, "Enter a valid username"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: z.string().min(6, "Password doesn't match"),
    package: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

function Signup() {
  const { adminStatus, checkAdminStatus } = useAuth();

  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userScheme),
  });

  const handleRegister = async (formData) => {
    try {
      console.log(formData);
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/adminLanding");
        return;
      } else {
        toast.error(data.msg, {
          autoClose: 1000,
        });
        toast.error(data.userMsg || null, {
          autoClose: 1000,
        });
        toast.error(data.mailMsg || null, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (adminStatus) {
      console.log("xa hai");
    } else {
      navigate("/");
      console.log("Xaina");
    }
  }, []);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(handleRegister)}>
        <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          {...register("email")}
          required
        />
        {errors.email && (
          <span className="error-msg">{errors.email.message}</span>
        )}
        {emailError && <span className="error-msg">{emailError}</span>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
          required
        />
        {errors.username && (
          <span className="error-msg">{errors.username.message}</span>
        )}
        {userError && <span className="error-msg">{userError}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
          required
        />
        {errors.password && (
          <span className="error-msg">{errors.password.message}</span>
        )}

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          {...register("confirmPassword")}
          required
        />
        {errors.confirmPassword && (
          <span className="error-msg">{errors.confirmPassword.message}</span>
        )}

        <label htmlFor="package">Package</label>
        <select
          className="package-selection"
          name="package"
          {...register("package")}
        >
          <option value="30">Starter</option>
          <option value="60">Basic</option>
          <option value="120">Gold</option>
        </select>

        <button type="submit">Sign Up</button>

        
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;