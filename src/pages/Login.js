

import { useForm } from "react-hook-form"
import { useNavigate,useLocation } from "react-router-dom";
import { setAuthHeader } from "../serverRequest";
import { requestServer } from "../serverRequest";
import {  useContext } from "react";
import UserContext from "../context/UserContextProvider";
import { useRef,useState } from "react";
import { setUserId,setRoles, setInstructor, getQuraan_app_user_data, setQuraan_app_user_data } from "../serverRequest";
import {Paper} from "@mui/material";
import {Typography} from "@mui/material";
import { Stack, TextField, Button } from "@mui/material";
import { styled } from '@mui/system';
import "./loginAndRegister.css";
const MyGridItem =styled('Grid')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    width:"1",
  },
  [theme.breakpoints.up('md')]: {
    width:"1",
  },
  [theme.breakpoints.up('lg')]: {
    width:"1"
  },
}));

export default function Login() {
  const {userData,updateUser} =useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  const navigate = useNavigate();
  const location=useLocation();
  // const from =location.state?.from?.pathname || "/";

  // const errRef=useRef();

  // const [errMsg, setErrMsg] = useState('');
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (formValues, e) => {
    e.preventDefault();

    const submission = {
      userName: formValues.login,
      password: formValues.password
    }

    requestServer("POST", "/public/authenticate", submission).then(response=>{

      setQuraan_app_user_data(JSON.stringify(response));
      var RoleObjects =getQuraan_app_user_data('quraan_app_user_data')?.roles;
      var RoleStrings =[];
      
      RoleObjects?.forEach((element)=>{
        RoleStrings.push(element.name);
      })
      updateUser(response);
      // userData.current =response;
      setAuthHeader(response.token);
      setUserId(response.pid);
      setRoles(response?.roles);
      setInstructor(`${response?.firstName}`+" "+`${response?.lastName}`);
        if(location.state?.from){
          navigate(location.state.from);
        }
      else{
        if(RoleStrings.includes("INSTRUCTOR")){
          navigate("/instructordashboard");
        }
        else{
          navigate("/userdashboard");
        }
      }
   
}).catch((error)=>{
console.log(error);
setAuthHeader(null);
navigate("/register");
});
  }

  return (

     <div className="container">
    <Paper sx={{ marginTop:12}} className="form">
    <Typography sx={{textAlign:"center"}}>Login to Access Your Courses</Typography>
    <form onSubmit={handleSubmit(onSubmit)} >
    <Stack spacing={2} sx={{width:{xs:"75", md:"500", lg:"500"}}}>
    {errors.login && (<Typography className="text-red-500">{`${errors.login.message}`}</Typography>)}
                <TextField variant="outlined" label="Username" 
                {...register("login",
              { required: "Username is required"})}></TextField>
                  {errors.password && (<Typography className="text-red-500">{`${errors.password.message}`}</Typography>)}
                   <TextField
                   {...register("password",
                    {
                      required: "Password is required",
                      minLength: {
                        value: 10,
                        message: "Password must be at least 10 characters"
                      }
                    })}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
                <Button color="primary" variant="contained" disableRipple type="submit">Login</Button>
      </Stack>
      </form>
    </Paper>
    </div>

  )

}

    // const _response =requestServer('POST', '/public/authenticate', submission)
    //   .then(response => {
    //     // console.log(response)
    //     if(response.token){
    //       setAuthHeader(response.token);
    //       setUserData(response);
    //     }
    //          console.log(userData)
    //          console.log(userData.roles);

    //     if (response.token && response.roles.some(role=>role.name.includes("INSTRUCTOR")))
   
    //       navigate("/instructordashboard",{ replace: true });

    //     if (response.token && response.roles.map(role=>role.name).includes("USER"))   
    //       navigate("/userdashboard", { replace: true });
    //   }).catch(
    //     (err) => {
    //       // setAuthHeader(null);
    //       if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 400) {
    //         setErrMsg('Missing Username or Password');
    //     } else if (err.response?.status === 401) {
    //         setErrMsg('Unauthorized');
    //     } else {
    //         setErrMsg('Login Failed');
    //     }
    //     errRef.current.focus();
    //     }
    //   );