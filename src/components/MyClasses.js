// import React from 'react'
// import { getAuthToken, setAuthHeader} from "../serverRequest";
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


export default function MyClasses (){
    // const navigate=useNavigate();
    // if(!getAuthToken())
    // navigate("/login");
 
    // const [mydata, setMydata] = useState([]);
    // let data=[];
    // let headers = {};
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //     headers = {'Authorization': `Bearer ${getAuthToken()}`};
    // }
    // useEffect(() => {
    //     //Dashboard api for both admin and users
    //     fetch('http://localhost:8080/messages', {
    //     method: 'GET',
    //     headers:headers
    //   }).then(
    //     (response) => {
    //         //console.log("Response",response);
    //       return response.json();
    //     }).then(dataRecieved => {
    //         console.log(dataRecieved);
    //       setAuthHeader(dataRecieved.token);
    //      //data=dataRecieved;
    //      setMydata(dataRecieved);
      
    //     }).catch(
    //       (error) => {
    //           console.log(error);
    //           setAuthHeader(null);       
    //       }
    //   );
    //   }, []);


    /*sendrequest(
        "GET",
        url,
        data
    ).then((response)=>{
       // console.log(response.data);
        data=response.data;

    })*/
    /*const requestOptions = {
        method: 'GET',
        headers:headers,
        data:data
    }
    
    fetch('http://localhost:8080/messages', requestOptions).then(
        (response) => {
            console.log("Response",response);
          return response.json();
        }).then(dataRecieved => {
            console.log(dataRecieved);
          setAuthHeader(dataRecieved.token);
         data=dataRecieved
      
        }).catch(
          (error) => {

              setAuthHeader(null);       
          }
      );*/
      return(
        <div>
       <div>
            <h1>Member Area</h1>
        </div>            
        </div>
    )

 
}

