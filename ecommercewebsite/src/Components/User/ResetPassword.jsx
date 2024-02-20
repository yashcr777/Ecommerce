import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate;

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [validpassword, setValidPassword] = useState(false);
  const [upper, setupper] = useState(false);
  const [lower, setlower] = useState(false);
  const [number, setnumber] = useState(false);
  const [special, setspecial] = useState(false);
  const [length, setlength] = useState(false);
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const paramField = query.get("token");
  const paramValue = query.get("token");

  console.log(paramValue);
  function handledata(e) {
    setpassword(e.target.value);
    var value = e.target.value;
    if (e.target.value === "") {
      const regexPatterns = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        minLength: /.{8,}/,
      };
      setupper(regexPatterns.uppercase.test(value));
      setlower(regexPatterns.lowercase.test(value));
      setnumber(regexPatterns.number.test(value));
      setspecial(regexPatterns.specialCharacter.test(value));
      setlength(regexPatterns.minLength.test(value));
      setValidPassword(upper || lower || number || special || length);
      setPasswordMessage("Please Enter Password");
    } else {
      setPasswordMessage();
      const regexPatterns = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        minLength: /.{8,}/,
      };
      setupper(regexPatterns.uppercase.test(value));
      setlower(regexPatterns.lowercase.test(value));
      setnumber(regexPatterns.number.test(value));
      setspecial(regexPatterns.specialCharacter.test(value));
      setlength(regexPatterns.minLength.test(value));
      setValidPassword(upper || lower || number || special || length);
    }
  }
  function handleClick(e) {
    console.log(validpassword);
    e.preventDefault();
    if (!validpassword) {
      alert("Enter Correct Password");
    } else if (password != confirmpassword) {
      alert("Both fields should be same");
    } else {
      var id = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      const url = `https://localhost:7027/api/User/User/ResetPassword/${id}`;
      const data = {
        password: password,
        token: paramValue,
      };
      axios
        .put(url, data)
        .then((result) => {
          console.log(result);
          toast.success('Password changed Successfully');
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error Token Expired");
          console.log(error);
        });
    }
  }
  return (
    <main
      id="content"
      role="main"
      className="w-full max-w-md mx-auto p-6 mt-36"
    >
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-xl font-bold text-gray-800 dark:text-white">
              Enter New Password
            </h1>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="password"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handledata}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                  {password ? (
                    <p>
                      {!upper ? (
                        <p className="text-red-600">*Enter Upper case</p>
                      ) : (
                        <p className="text-green-600">*Enter Upper case</p>
                      )}
                      {!lower ? (
                        <p className="text-red-600">*Enter Lower case</p>
                      ) : (
                        <p className="text-green-600">*Enter Lower case</p>
                      )}
                      {!number ? (
                        <p className="text-red-600">*Enter Number</p>
                      ) : (
                        <p className="text-green-600">*Enter Number</p>
                      )}
                      {!length ? (
                        <p className="text-red-600">
                          *Length of password should be above 8
                        </p>
                      ) : (
                        <p className="text-green-600">
                          *Length of password should be above 8
                        </p>
                      )}
                      {!special ? (
                        <p className="text-red-600">*Enter Special character</p>
                      ) : (
                        <p className="text-green-600">
                          *Enter Special character
                        </p>
                      )}
                    </p>
                  ) : (
                    <p className="text-red-600">{passwordmessage}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="confirmpassword"
                      name="confirmpassword"
                      value={confirmpassword}
                      onChange={(e) => setconfirmpassword(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="mt-4 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
        <a
          class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
          target="_blank"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View Github
        </a>
        
      </p> */}
    </main>
  );
};

export default ResetPassword;
