import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useFormik } from "formik";

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let history = useHistory();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Make sure email is valid.")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (values) => {
    const { email } = values;
    setIsLoading(true);
    try {
      await axios
        .post(
          "/api/auth/forgotpassword",
          {
            email,
          },
          config
        )
        .then((res) => {
          setIsLoading(false);
          setSuccess(res.data);
          history.push("/forgotpassword");
          toast.success("Email to reset your password sent!");
        });
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data);
      console.log(error.response.data);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl  text-center font-extrabold text-gray-900">
              Please enter the email address you register your account with.
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Password reset mail will be sent to this mail!
                  </span>
                </div>
              </div>
            </div>

            {error && <span>{error}</span>}
            {success && <span>{success}</span>}
            <div className="mt-6">
              <form
                onSubmit={formik.handleSubmit}
                method="POST"
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mt-1 text-left"
                  >
                    Email address.
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required={true}
                      placeholder="you@example.com"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.errors.email && formik.errors.email}
                      onBlur={formik.handleBlur}
                      autoFocus
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm"> Don't have an account?</div>
                  <Link to="/register" className="mx-2 text-blue-500">
                    {" "}
                    Register now.
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    isLoading={isLoading}
                    loadingtext="Signing you in"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-700 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    Send mail.
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordScreen;
