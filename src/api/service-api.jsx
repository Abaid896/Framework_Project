import axios from "axios";
let apiUrl = "http://localhost:3000/";

const servicesApi = axios.create({
   baseURL: apiUrl,
   withCredentials: true,
   headers: {
      common: {
         "Accept": "application/json",
      }
   }
});

export default servicesApi;