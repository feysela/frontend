import axios from "axios";
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};
export const setUserId = (userId) => {
  window.localStorage.setItem('userId', userId);
};

export const getUserId= () => {
  return window.localStorage.getItem('userId');
};
export const getInstructor= () => {
  return window.localStorage.getItem('instructor');
};
export const setInstructor = (instructor) => {
  window.localStorage.setItem('instructor', instructor);
};

export const setRoles = (roles) => {
  window.localStorage.setItem('roles', roles);
};
export const getRoles= () => {
  return window.localStorage.getItem('roles');
};
export const setQuraan_app_user_data =(quraan_app_user_data)=>{
  return window.localStorage.setItem('quraan_app_user_data', quraan_app_user_data);
}
export const getQuraan_app_user_data =()=>{
  var data= window.localStorage.getItem('quraan_app_user_data');
  return JSON.parse(data);
}
export const requestServer=  async (method, url, data)  => {
    const baseURL ='http://localhost:8080';
    let headers = {'Content-Type': 'application/json'};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers.Authorization = `Bearer ${getAuthToken()}`;
    }
    const requestOptions = {
        method: method,
        headers: headers,
        contenttype:"application/json; charset=utf-8",
        body: JSON.stringify(data)
      };
      try{
        const res= await fetch(baseURL.concat(url), requestOptions);
  
        const responseFromServer= await res.json();
        return responseFromServer;
      }catch (err){
        console.log(err);
      }
   
    }

    export const getRequestServer=  async (url)  => {
        const baseURL ='http://localhost:8080';
        let headers = {'Content-Type': 'application/json'};
        if (getAuthToken() !== null && getAuthToken() !== "null") {
            headers.Authorization = `Bearer ${getAuthToken()}`;
        }
        const requestOptions = {
            method: "GET",
            headers: headers,
            contenttype:"application/json; charset=utf-8",
             cache: "reload"
          };
          try{
            const res= await fetch(baseURL.concat(url), requestOptions);
           // console.log(res.ok);
            const responseFromServer= await res.json();
            return responseFromServer;
          }catch (err){
            console.log(err);
          }
       
        }
    

    axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const sendrequest =  (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};

export const requestServerWithHeader=  async (method, url,header)  => {
  const baseURL ='http://localhost:8080';
  // let headers = {'Content-Type': 'application/json'};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
      // headers.Authorization = `Bearer ${getAuthToken()}`;
  }
  const requestOptions = {
      method: method,
      headers:{ ...header,
      'Content-Type':"application/json; charset=utf-8",
      Authorization: `Bearer ${getAuthToken()}`
    }

    };
    try{
      const res= await fetch(baseURL.concat(url), requestOptions);

      const responseFromServer= await res.json();
      return responseFromServer;
    }catch (err){
      console.log(err);
    }
 
  }


  export const requestServerWithHeaderWithData=  async (method, url,header, data)  => {
    const baseURL ='http://localhost:8080';
    // let headers = {'Content-Type': 'application/json'};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        // headers.Authorization = `Bearer ${getAuthToken()}`;
    }
    const requestOptions = {
        method: method,
        headers:{ ...header,
        'Content-Type':"application/json; charset=utf-8",
        Authorization: `Bearer ${getAuthToken()}`},
        
        body:JSON.stringify(data)
      
  
      };
      try{
        const res= await fetch(baseURL.concat(url), requestOptions);
  
        const responseFromServer= await res.json();
        return responseFromServer;
      }catch (err){
        console.log(err);
      }
   
    }