import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";

import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username should be atleast 3 characters long.")
      .max(24, "Woah! Username can't be that long.")
      .required("Username is required."),
    email: Yup.string()
      .email("Email must be valid.")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    const { username, email, password } = values;
    setIsLoading(true);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.token);
          history.push("/");
          toast.success("Welcome!");
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error.response.data);
        }
        setIsLoading(false);
        if (error?.response.status === 500) {
          toast.error("User with that email is already registered.");
        } else {
          toast.error(error.response);
        }
      });
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
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
                    Please fill the form below!
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="off"
                        required={true}
                        placeholder="Your username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.errors.username && formik.errors.username}
                        onBlur={formik.handleBlur}
                        autoFocus
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
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
                      required={true}
                      placeholder="you@example.com"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.errors.email && formik.errors.email}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required={true}
                        placeholder="Password (min 6 characters)"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="ConfirmPassword"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        required={true}
                        placeholder="Confirm Password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm"> Have an account?</div>
                  <Link to="/login" className="mx-2 text-blue-500">
                    {" "}
                    Login now.
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    isLoading={isLoading}
                    loadingtext="Signing you in"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-700 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    Sign in.
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

export default RegisterScreen;
