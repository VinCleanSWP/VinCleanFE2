import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_VIN_URL_API,
    
});
api.interceptors.response.use(
    (response) =>{
        return response.data
    },
    (Error)=>{
        console.log(Error);
    }
);

export default api;