import { accountVerification, userSignUp } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useState } from "react";
import images from "../../assets";
import {Loader} from "../Loader";


const Register = () => {

  const navigate = useNavigate();

  const [userVerificationStatus, setUserVerificationStatus] = useState("");
  const [userVerificationErrorStatus, setUserVerificationErrorStatus] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("" || JSON.parse(localStorage.getItem('userId')));
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    agreeTerm: false,
  });

  // error info catch object...
  const [errorInfo, setErrorInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });



  // collect all user input data from UI
  const handleUserInput = e => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };



  // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
  // User Info send to backend for registration... 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await userSignUp(userInfo);

      // store this userId, for creating an object to account verification process...
      setUserId(data.userId);

      // store user id at local storage for future reference
      localStorage.setItem("userId", JSON.stringify(data.userId));

      setLoader(false);
    } catch (error) {
      setLoader(false);
      // get error info to display user, for Form validation...
      setErrorInfo((pre) => ({ ...pre, fullName: error.response.data?.issue?.fullName, }));
      setErrorInfo((pre) => ({ ...pre, email: error.response.data?.issue?.email, }));
      setErrorInfo((pre) => ({ ...pre, password: error.response.data?.issue?.password, }));
      setErrorInfo((pre) => ({ ...pre, phone: error.response.data?.issue?.phone, }));
    }
  };


  // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
  // user account activation by CODE verification process +
  // without login - user direct enter into dashboard...
  const handleAccountActivation = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      // user id + user given activation code, for authentication...
      const userIdActive = { userId, code: activationCode };

      //send activation cose into backend 
      const { data } = await accountVerification(userIdActive);

      // store user (JWT token) + (user ID) into local storage...
      localStorage.setItem("jwt", JSON.stringify(data.jwtToken));
      localStorage.setItem("userId", JSON.stringify(data.loggedUser));
      localStorage.setItem("userId", JSON.stringify(data.loggedUser));

      // display notification for user...
      toast.success(data?.message, { autoClose: 2000 });

      setUserVerificationStatus(data?.message);
      setUserVerificationErrorStatus("");
      setLoader(false);

      // after 2 second auto redirect user into this route...
      setTimeout(() => navigate("/projects"), 2000);
    } catch (error) {
      setLoader(false);

      // console.log(error.response.data.issue?.message);
      setUserVerificationErrorStatus(error.response.data.issue?.message);
      setUserVerificationStatus("");
    }
  };



  return (
    <section className="flex">
      {/* left side */}
      <div className="w-[455px] h-screen text-white bg-cover bg-center bg-[url('/src/assets/images/loginPage.png')]">
        <div className="pt-[80px]">
          <h6 className="text-2xl text-center">HeySpace</h6>

          <div className="pt-8 pl-9 pr-4 text-sm">
            <h6 className="pb-2 font-bold">New level of collaborating:</h6>
            <ul className="list-disc space-y-2">
              <li>Private and group messaging</li>
              <li>Planning to-dos in lists and board view</li>
              <li>Adding messages into to-do lists</li>
              <li>Collaborating with an unlimited number of users</li>
              <li>Offline mode for being on top anytime and anywhere</li>
            </ul>

            <p className="pt-[110px]">
              Easy to use. Helps our office tremendously. Price is perfect
              (free). We couldn't function as an office nearly as well without
              it. Would recommend it for the most part. Really slick user
              interface. Nice features like tasks that make team interaction
              smoother.
            </p>

            <div className="flex pt-3">
              <div>
                <img src={images.userLogin} alt="" />
              </div>
              <div className="my-auto pl-2">
                <h6 className="text-base font-bold">Kamil Rudnicki</h6>
                <p className="text-xs">CEO in Timecamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="mx-9 pt-[60px] flex-1">
        <div className="flex justify-end">
          <h6 className="my-auto text-gray-400 pr-2">
            Already have an account?
          </h6>

          <Link
            to="/"
            className="py-2 px-6 border-2 border-[#C595C6] text-[#C595C6]	 rounded-md "
          >
            sign in
          </Link>
        </div>

        <div className="w-[400px]  mx-auto mt-8">
          <h2 className="text-center text-2xl font-bold text-cyan-800	">
            Get started with HeySpace
          </h2>

          <div className="cursor-pointer flex justify-center p-1.5 mt-4 rounded-md bg-gray-50 border hover:bg-gray-200 w-full text-gray-600 hover:text-gray-900">
            <FcGoogle className="my-auto text-center mr-1.5" />{" "}
            <span className="text-sm">Sign in with Google</span>
          </div>

          <div className="border-b-2 border-gray-100 pt-5 text-gray-100 relative">
            <span className="absolute left-1/2 top-1.5 bg-white  px-1.5 -translate-x-1/2 ">
              or
            </span>
          </div>

          {userId ? (
            <div className="p-4 space-y-4 mb-8">
              <p className="text-md font-bold text-center">
                Please enter a code to active your account
              </p>
              <input
                required
                type="text"
                placeholder="Enter 5 Digit Code"
                onChange={(e) => setActivationCode(e.target.value)}
                className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
              />

              <button
                onClick={handleAccountActivation}
                disabled={!(activationCode.length === 5)}
                className={`py-2 w-full ${activationCode.length === 5
                  ? "bg-[#C595C6] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
                  } text-yellow-50 rounded-lg`}
              >
                {loader ? <Loader dark /> : "Active Account"}
              </button>

              {userVerificationStatus && (
                <p className="text-center text-green-600">
                  Your email is verified
                </p>
              )}
              {userVerificationErrorStatus && (
                <p className="text-center text-red-600">
                  Your email is already verified
                </p>
              )}
            </div>
          ) : (
            <form className="space-y-6 mt-5" onSubmit={handleSubmit}>

              <div className="text-sm relative">
                <label htmlFor="name" className="text-gray-700">
                  Full Name :
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  name="fullName"
                  placeholder="John Smith"
                  className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
                  onChange={handleUserInput}
                />
                {errorInfo.fullName && (
                  <span className="absolute top-[102%] right-0 text-red-500">
                    {errorInfo.fullName}
                  </span>
                )}
              </div>

              <div className="text-sm relative">
                <label htmlFor="email" className="text-gray-700">
                  Email:
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="email@company.com"
                  className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
                  onChange={handleUserInput}
                />
                {errorInfo.email && (
                  <span className="absolute top-[102%] right-0 text-red-500">
                    {errorInfo.email}
                  </span>
                )}
              </div>

              <div className="text-sm relative">
                <label htmlFor="password" className="text-gray-700">
                  Password:
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Give Strong Password"
                  className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
                  onChange={handleUserInput}
                />
                {errorInfo.password && (
                  <span className="absolute top-[102%] right-0 text-red-500">
                    {errorInfo.password}
                  </span>
                )}
              </div>

              <div className="text-sm relative">
                <label htmlFor="number" className="text-gray-700">
                  Phone number (optional):
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+88 01717 000000"
                  className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
                  onChange={handleUserInput}
                />
                {errorInfo.phone && (
                  <span className="absolute top-[102%] right-0 text-red-500">
                    {errorInfo.phone}
                  </span>
                )}
              </div>

              <div className="text-sm">
                <input
                  required
                  type="checkbox"
                  name="agreeTerm"
                  onChange={(e) =>
                    setUserInfo((pre) => ({
                      ...pre,
                      agreeTerm: e.target.checked,
                    }))
                  }
                />

                <label htmlFor="checkbox" className="text-gray-700 pl-1">
                  By creating an account you agree to the{" "}
                  <Link to="/" className="underline text-[#C595C6]">
                    Terms and Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/" className="underline text-[#C595C6]">
                    Privacy Policy
                  </Link>{" "}
                  .
                </label>
              </div>

              <div className="text-center flex flex-col space-y-3">
                {/* <Link to='/' className="py-2 w-full bg-[#C595C6] text-yellow-50 rounded-lg">
                Get started now
              </Link> */}

                <button
                  disabled={!userInfo.agreeTerm}
                  type="submit"
                  className={`py-2 w-full ${userInfo.agreeTerm ? "bg-[#C595C6]" : "bg-gray-300"
                    } text-yellow-50 rounded-lg`}
                >
                  {loader ? <Loader dark /> : "Get started now"}
                </button>

                <span className="text-sm">Companies who love HeySpace</span>
              </div>
            </form>
          )}

          <div className="my-4 flex justify-between">
            <img src={images.timeCamp} alt="" className=" w-[100px] h-7" />
            <img src={images.remoteCamp} alt="" className=" w-[100px] h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
