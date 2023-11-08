import axios from "axios";
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

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
        console.log(res.ok);
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
            contenttype:"application/json; charset=utf-8"
          };
          try{
            const res= await fetch(baseURL.concat(url), requestOptions);
            console.log(res.ok);
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