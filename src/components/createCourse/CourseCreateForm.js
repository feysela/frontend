// import FormInputs from './FormInputs'
import "./form.css";
import { requestServer, getInstructor } from '../../serverRequest';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { useState } from 'react';
import { useFieldArray } from "react-hook-form";
import {imageDb} from "../../config/firestore";
import { ImageConfig } from '../../config/ImageConfig'; 
import { ref, 
    uploadBytesResumable, 
    uploadBytes,
    getDownloadURL 
} from "firebase/storage";
import UploadButton from './upload-button/UploadButton';
import "./upload-button/upload-button.css";
import { app, db } from '../../config/firestore';
import { doc, setDoc } from "firebase/firestore";
import  DropFileInput  from '../drop-file-input/DropFileInput';
import { Button } from "@mui/material";
import { EventBusy } from "@mui/icons-material";
const Form = () => {
    const [file, setFile] = useState(null);
    const [courseInfo, setCourseInfo] = useState({});
    const [per, setPerc] = useState(null);
    const navigate = useNavigate();

    const instructorFullName =getInstructor();
    const { register, control, handleSubmit } = useForm({});

    useEffect(() => {
        const uploadFile = () => {
          const name = new Date().getTime() + file.name;
    
          console.log(name);
          const storageRef = ref(imageDb, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPerc(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // setCourseInfo((prev) => ({ ...prev, img: downloadURL }));
                setCourseInfo((prev) => ({ ...prev, imageUrl: downloadURL }));
              });
            }
          );
        };
        file && uploadFile();
       console.log("UseEffect is run");
      }, [file]);
      console.log("courseInfo: " + JSON.stringify(courseInfo));
    
    
    const fileRemove = (file) => {
    setFile(null);
    }

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
    
        setCourseInfo({ ...courseInfo, [id]: value });
      };

    const onSubmit = (data) => {
        let objectives = "";
        data.whatStudentsLearn?.forEach((item, index) => {
            objectives += item.mainPoint + "|";
        }
        )
        const submission = {
            courseName: courseInfo.courseName,
            courseDescription: data.courseDescription,
            courseId:null,
            imageUrl: courseInfo.imageUrl,
            price: data.price,
            instructor: instructorFullName,
            language: data.language,
            whatStudentsLearn: objectives
        }
        requestServer("POST", "/private/createCourse", submission).then(response => {

            console.log("What is sent");
            console.log(submission);
            console.log("What is received");
            console.log(response);
            // navigate("/ChapterCreate", { state: response });
            navigate(`/createdCoursePreview/${response?.courseId}`);
        }).catch((error) => {
            console.log(error);
        }); 
    }
    
    const { fields, append, remove } = useFieldArray({ control, name: 'whatStudentsLearn' });

    const content = (
        <form className="form flex-col" onSubmit={handleSubmit(onSubmit)}>
            <header className="form-header">
                <h2>Course Information</h2>
            </header>
            <div className="flex-col">
                <div className="flex-col">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        {...register("courseName",
                            {
                                required: "Course name is required",
                            }
                        )}
                        type="text"
                        id="courseName"
                        name="courseName"
                        placeholder="Hadith"
                        onChange={handleInput}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea
                        {...register("courseDescription",
                            {
                                required: "Course description is required",
                            }
                        )}
                        type="text"
                        id="courseDescription"
                        name="courseDescription"
                        placeholder="This course teaches about...."
                        onChange={handleInput}
                        rows="10" cols="30"
                    />
                </div>

                <label htmlFor="imageUrl">Cover Image</label>

                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}              
                />
                    {(file!==null)&&<div  className="drop-file-preview__item">
                                    <img src={ImageConfig[file?.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{file?.name}</p>
                                        <p>{file?.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(file)}>x</span>
                                </div>}
                    {/* <button onClick={uploadToDatabase}>Upload</button> */}
                <div>
                    <label>What studnts learn</label>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <input
                                    className="chapter"
                                    type="text"
                                    placeholder="Enter an objective"
                                    {...register(`whatStudentsLearn.${index}.mainPoint`)}
                                    defaultValue={field?.mainPoint}
                                />
                                {
                                    (index > 0) && (<button className="chapter" type="button" onClick={() => { remove(index) }}>Remove</button>)
                                }
                            </div>
                        )

                    })}
                    <button type="button" onClick={() => append({ mainPoint: "" })}>Add Objectives</button>
                </div>
            </div>

            <label htmlFor="price">Price</label>
            <input
                {...register("price",
                    {
                        required: "Price is required",
                    }
                )}
                type="text"
                id="price"
                name="price"
                placeholder="0"
                onChange={handleInput}
            />
            <label htmlFor="language">Language</label>
            <input
                {...register("language",
                    {
                        required: "Language is required",
                    }
                )}
                type="text"
                id="language"
                name="language"
                placeholder="English"
                onChange={handleInput}
            />
             <button disabled={per !==null && per<100}>Preview</button>

        </form>
    )

    return content
}
export default Form
                //  <input
                //     {...register("imageUrl",
                //         {
                //             required: "Preview url is required",

                //         }
                //     )}
                //     type="text"
                //     id="imageUrl"
                //     name="imageUrl"
                //     placeholder="https://"

                // /> 
                //     <DropFileInput onFileChange={(files) => onFileChange(files)}/>
                //     <br></br>
                //     <UploadButton  onClick={()=>handleClick()}/> 
                // const uploadToDatabase = (event) => {
   
                //   const uploadFile = (event) => {
                   
                //       const name = new Date().getTime() + file.name;
                
                
                //       const storageRef = ref(imageDb, name);
                //       const uploadTask = uploadBytesResumable(storageRef, file);
                
                //       uploadTask.on(
                //         "state_changed",
                //         (snapshot) => {
                //           const progress =
                //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //           // console.log("Upload is " + progress + "% done");
                //           setPerc(progress);
                //           switch (snapshot.state) {
                //             case "paused":
                //               // console.log("Upload is paused");
                //               break;
                //             case "running":
                //               // console.log("Upload is running");
                //               break;
                //             default:
                //               break;
                //           }
                //         },
                //         (error) => {
                //           console.log(error);
                //         },
                //         () => {
                //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //               // setCourseInfo(courseInfo=>({...courseInfo, imageUrl:downloadURL}));
                //               setCourseInfo((prev) => ({ ...prev, imageUrl: downloadURL }));
                //             console.log(downloadURL);
                //           });
                //         }
                //       );
                //     };
                   
                //     file && uploadFile();
             // }
                 // const handleClick = () => {

    // if (img) {
    //     const imgRef = ref(imageDb,`videos/${img}`);
    //      uploadBytes(imgRef);
    // } 

    // }