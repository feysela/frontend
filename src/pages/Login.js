

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../serverRequest";
import { requestServer } from "../serverRequest";
import {  useContext } from "react";
import {UserContext} from "../context/UserContext";



export default function Login() {
   const {setUserData} =useContext(UserContext);
  const navigate = useNavigate();
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (formValues) => {
    console.log("Login clicked");
    const submission = {
      userName: formValues.login,
      password: formValues.password
    }

    requestServer('POST', '/public/authenticate', submission)
      .then(response => {
        setAuthHeader(response.token);
        console.log(response);

        if(response.token)
            setUserData(response);
           

        if (response.token && response.roles[0].name === "INSTRUCTOR")//and the role
   
          navigate("/instructordashboard",{ replace: true });

        if (response.token && response.roles[0].name === "USER")//and the role   
          navigate("/userdashboard", { replace: true });
      }).catch(
        (error) => {
          setAuthHeader(null);
          navigate("/login");
        }
      );
  }

  return (
    <div className="login">
      <h3>Login to Access Your Courses</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="default-form">
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
        <button disabled={isSubmitting} >Login</button>
      </form>

    </div>
  )

}
