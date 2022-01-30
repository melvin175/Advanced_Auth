import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useFormik } from "formik";

const ForgotPasswordScreen = ({ history, match }) => {
  const [isLoading, setIsLoading] = useState(false);

  const PasswordSchema = Yup.object().shape({
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
      password: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (values) => {
    const { password } = values;
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      toast.success(data.data);
      history.push("/login");
    } catch (error) {
      if ((error.response.status = 400)) {
        toast.error("Invalid token, please generate a new one.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl  text-center font-extrabold text-gray-900">
              Please Enter Your New Passcode!
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
                    Few steps away from having a new passcode.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                onSubmit={formik.handleSubmit}
                method="POST"
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required={true}
                      placeholder="Enter New Password!"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={formik.errors.password && formik.errors.password}
                      onBlur={formik.handleBlur}
                      autoFocus
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      autoComplete="confirmpassword"
                      required={true}
                      placeholder="Confirm New Password!"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      error={
                        formik.errors.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                      onBlur={formik.handleBlur}
                      autoFocus
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-sm"> Return to</div>
                  <Link to="/login" className="mx-2 text-blue-500">
                    {" "}
                    Login page.
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    isLoading={isLoading}
                    loadingtext="Signing you in"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-700 text-white focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
