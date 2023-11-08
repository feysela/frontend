

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../serverRequest";
import { AuthData } from "../App";
import { getAuthToken, requestServer} from "../serverRequest";

export default function Login() {
  const {updateUser } = AuthData();
  const navigate = useNavigate();
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    const submission = {
      userName: data.login,
      password: data.password
    }
   // requestServer("POST","/public/authenticate",submission)
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
      headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }
    const loginInfo = JSON.stringify(submission);
    fetch('http://localhost:8080/public/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: loginInfo
    })
    requestServer('POST','/public/authenticate', submission)
    .then(data => {
        setAuthHeader(data.token);
        console.log(data);
        updateUser({ name: data.firstName, isAuthenticated: true })
        if (data.token && data.roles[0].name === "INSTRUCTOR")//and the role 
          navigate("/instructordashboard");

        if (data.token && data.roles[0].name === "USER")//and the role   
          navigate("/userdashboard");
      }).catch(
        (error) => {
          setAuthHeader(null);
          navigate("/login");
        }
      );
  }

  return (
    <div className="contact">

      <h3>Login to Access Your Courses</h3>
      <form  onSubmit={handleSubmit(onSubmit)} className="default-form">
        <label>
          <span>Username</span>
          {errors.login && (<p className="text-red-500">{`${errors.login.message}`}</p>)}
          <input
            {...register("login",
              { required: "Username is required" }
            )}
            type="text"
            placeholder="Login"
           
          />
        </label>
        <label>
          <span>Password</span>
          {errors.password && (<p className="text-red-500">{`${errors.password.message}`}</p>)}
          <input
            {...register("password",
              {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters"
                }
              }
            )}
            type="password"
            placeholder="Password"
          ></input>
        </label>
        <button className="btn-login"
          disabled={isSubmitting} >Login</button>
      </form>
    </div>
  )

}
  // let headers = {};
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //   headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    // }
    // const loginInfo = JSON.stringify(submission);
    // fetch('http://localhost:8080/public/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: loginInfo
    // })