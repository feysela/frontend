
import * as React from 'react'
import { useNavigate } from "react-router-dom"
import { setAuthHeader } from '../serverRequest'
import { useForm } from "react-hook-form"
import { requestServer } from '../serverRequest'

import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack, TextField, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import "./loginAndRegister.css";
export default function Register() {
  //Take param error=? if error is available show error
  // const {updateUser } = AuthData();
  const navigate = useNavigate();
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    console.log("clicked");
    const submission = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      userPassword: data.userPassword,
      email: data.email,
      answer1: data.answer1,
      answer2: data.answer2,
      question1: data.question1,
      question2: data.question2
    }
    const questionsAndAnswers = [];
    questionsAndAnswers.push(submission.question1.concat('|', submission.answer1));
    questionsAndAnswers.push(submission.question2.concat('|', submission.answer2));
    submission.questionsAndAnswers = questionsAndAnswers;
    delete submission.answer1;
    delete submission.answer2;
    delete submission.question1;
    delete submission.question2;
    requestServer("POST", "/public/createUser", submission).then(response => {
      console.log("What is sent");
      console.log(submission);
      console.log("What is received");
      console.log(response);
      setAuthHeader(response.token);
      // updateUser({ name: data.firstName, isAuthenticated: true });
      navigate("/login");
    }).catch((error) => {
      console.log(error);
      setAuthHeader(null);
      navigate("/register");
    });
  }
  return (
        <div className='container'>
        <Paper sx={{width:"1", marginTop: 12, marginBottom: 14 }} className='form'>
          <Typography sx={{ textAlign: "center" }}>Signup to Start Learning Today</Typography>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={2} sx={{ width: { xs: "75", md: "500", lg: "500" } }}>
              {errors.firstName && (<p className="text-red-500">{`${errors.firstName.message}`}</p>)}
              <TextField variant="outlined" label="First Name"
                {...register("firstName",
                  {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First Name must be at least 2 characters"
                    }
                  }
                )}
                type="text"
                placeholder="First Name">
              </TextField>
              {errors.password && (<Typography className="text-red-500">{`${errors.password.message}`}</Typography>)}
              <TextField
                {...register("lastName",
                  {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name must be at least 2 characters"
                    }
                  }
                )}
                type="text"
                placeholder="Last Name"
              />
              {errors.phoneNumber && (<p className="text-red-500">{`${errors.phoneNumber.message}`}</p>)}
              <TextField
                {...register("phoneNumber",
                  { required: "Phone Number is required" }
                )}
                type="text"
                placeholder="Phone Number"
              />

              {errors.email && (<p className="text-red-500">{`${errors.email.message}`}</p>)}
              <TextField
                {...register("email",
                  {
                    required: "Email is required",
                    minLength: {
                      value: 6,
                      message: "Email must be at least 6 characters"
                    }
                  }
                )}
                type="email"
                placeholder="Email"
              />
              {errors.userPassword && (<p className="text-red-500">{`${errors.userPassword.message}`}</p>)}
              <TextField
                {...register("userPassword",
                  {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }
                )}
                type="password"
                placeholder="Password"
              />
               <InputLabel>Security Question #1</InputLabel>
              <Select
                {...register("question1",
                  { required: "Question is required" }

                )}
                label="Security Question #1"
                placeholder="Security Question #1"

              >
               
                <MenuItem value="Who is your favourite teacher?" label="Security Question #1">Who is your favourite teacher?</MenuItem>
                <MenuItem value="In which city were you born?" defaultChecked>In which city were you born?</MenuItem>
                <MenuItem value="Who is your best friend?">Who is your best friend?</MenuItem>
                <MenuItem value="What high school did you attend?">What high school did you attend?</MenuItem>
                <MenuItem value="What is your favourite food?">What is your favourite food?</MenuItem>
              </Select>
              {errors.answer1 && (<p className="text-red-500">{`${errors.answer1.message}`}</p>)}
              <TextField
                {...register("answer1",
                  {
                    required: "Answer is required",
                    minLength: {
                      value: 3,
                      message: "Answer must be at least 3 characters"
                    }
                  }
                )}
                placeholder="Answer to question 1"
              />
              <InputLabel>Security Question #2</InputLabel>
              <Select
                {...register("question2",
                  { required: "Question is required" }
                )}
            
              >
                <MenuItem value="Who is your favourite teacher?" defaultChecked>Who is your favourite teacher?</MenuItem>
                <MenuItem value="In which city were you born?">In which city were you born?</MenuItem>
                <MenuItem value="Who is your best friend?">Who is your best friend?</MenuItem>
                <MenuItem value="What high school did you attend?">What high school did you attend?</MenuItem>
                <MenuItem value="What is your favourite food?">What is your favourite food?</MenuItem>
              </Select>
              {errors.answer2 && (<p className="text-red-500">{`${errors.answer2.message}`}</p>)}
              <TextField
                {...register("answer2",
                  {
                    required: "Answer is required",
                    minLength: {
                      value: 3,
                      message: "Answer must be at least 3 characters"
                    }
                  }
                )}
                type="text"
                placeholder="Answer to question 2"
              ></TextField>

              <Button color="primary" variant="contained" disableRipple type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
        </div>
  )
}

    // <div className="register">
    //   <h3>Register to Start Learning Today</h3>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <label>
    //       <span>First Name</span>
    //       {errors.firstName && (<p className="text-red-500">{`${errors.firstName.message}`}</p>)}
    //       <input
    //         {...register("firstName",
    //           {
    //             required: "First name is required",
    //             minLength: {
    //               value: 2,
    //               message: "First Name must be at least 2 characters"
    //             }
    //           }
    //         )}
    //         type="text"
    //         placeholder="First Name"
    //       />
    //     </label>
    //     <label>
    //       <span>Last Name</span>
    //       {errors.lastName && (<p className="text-red-500">{`${errors.lastName.message}`}</p>)}
    //       <input
    //         {...register("lastName",
    //           {
    //             required: "Last name is required",
    //             minLength: {
    //               value: 2,
    //               message: "Last Name must be at least 2 characters"
    //             }
    //           }
    //         )}
    //         type="text"
    //         placeholder="Last Name"
    //       />
    //     </label>
    //     <label>
    //       <span>Phone Number</span>
    //       {errors.phoneNumber && (<p className="text-red-500">{`${errors.phoneNumber.message}`}</p>)}
    //       <input
    //         {...register("phoneNumber",
    //           { required: "Phone Number is required" }
    //         )}
    //         type="text"
    //         placeholder="Phone Number"
    //       />
    //     </label>
    //     <label>
    //       <span>Email</span>
    //       {errors.email && (<p className="text-red-500">{`${errors.email.message}`}</p>)}
    //       <input
    //         {...register("email",
    //           {
    //             required: "Email is required",
    //             minLength: {
    //               value: 6,
    //               message: "Email must be at least 6 characters"
    //             }
    //           }
    //         )}
    //         type="email"
    //         placeholder="Email"
    //       ></input>
    //     </label>
    //     <label>
    //       <span>Password</span>
    //       {errors.userPassword && (<p className="text-red-500">{`${errors.userPassword.message}`}</p>)}
    //       <input
    //         {...register("userPassword",
    //           {
    //             required: "Password is required",
    //             minLength: {
    //               value: 6,
    //               message: "Password must be at least 6 characters"
    //             }
    //           }
    //         )}
    //         type="password"
    //         placeholder="Password"
    //       ></input>
    //     </label>
    //     <label><span>Select Security Question 1</span>
    //       <select
    //         {...register("question1",
    //           { required: "Question is required" }
    //         )}>
    //         <option value="Who is your favourite teacher?">Who is your favourite teacher?</option>
    //         <option value="In which city were you born?">In which city were you born?</option>
    //         <option value="Who is your best friend?">Who is your best friend?</option>
    //         <option value="What high school did you attend?">What high school did you attend?</option>
    //         <option value="What is your favourite food?">What is your favourite food?</option>
    //       </select>
    //     </label>
    //     <label>
    //       <span>Answer</span>
    //       {errors.answer1 && (<p className="text-red-500">{`${errors.answer1.message}`}</p>)}
    //       <input
    //         {...register("answer1",
    //           {
    //             required: "Answer is required",
    //             minLength: {
    //               value: 3,
    //               message: "Answer must be at least 3 characters"
    //             }
    //           }
    //         )}
    //         type="text"
    //         placeholder="Answer to question 1"
    //       ></input>
    //     </label>
    //     <label><span>Select Security Question 2</span>
    //       <select
    //         {...register("question2",
    //           { required: "Question is required" }
    //         )}>
    //         <option value="Who is your favourite teacher?">Who is your favourite teacher?</option>
    //         <option value="In which city were you born?">In which city were you born?</option>
    //         <option value="Who is your best friend?">Who is your best friend?</option>
    //         <option value="What high school did you attend?">What high school did you attend?</option>
    //         <option value="What is your favourite food?">What is your favourite food?</option>
    //       </select>
    //     </label>
    //     <label>
    //       <span>Answer</span>
    //       {errors.answer2 && (<p className="text-red-500">{`${errors.answer2.message}`}</p>)}
    //       <input
    //         {...register("answer2",
    //           {
    //             required: "Answer is required",
    //             minLength: {
    //               value: 3,
    //               message: "Answer must be at least 3 characters"
    //             }
    //           }
    //         )}
    //         type="text"
    //         placeholder="Answer to question 2"
    //       ></input>
    //     </label>       

    //   <button disabled={isSubmitting}>Register</button>
    //   </form>
    // </div>

// const requestOptions = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(submission)
// };
// fetch('http://localhost:8080/public/createUser', requestOptions)