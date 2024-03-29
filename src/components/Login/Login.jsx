import React from "react";
import loginLogo from "../../assets/images/login/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProviders";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  // const { signInUser } = useContext(AuthContext);
  const {signInUser}=useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // console.log(loggedUser)
        // navigate(location?.state ? location.state : "/");
        // const user = { email };
        // axios
        //   .post("https://car-doctor-server-batch8.onrender.com/jwt", user, { withCredentials: true })
        //   .then((res) => {
        //     // console.log(res.data.success);
        //     if (res.data.success) {
        navigate(location?.state ? location.state : "/");
        //     }
        //   });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img src={loginLogo} alt="" />
        </div>
        <div className="card p-4 shrink-0 w-full pt-2 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
          <p className="text-center">
            Already have account? Please{" "}
            <Link className="bg-blue-500 p-2 text-white rounded" to="/signUp">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
