import axios from "axios";

let apiUrl = "http://localhost:3000/";

const headers = {
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
   'X-Requested-With': 'XMLHttpRequest',
};

console.log("jrejrg");

const Api  = axios.create({
   baseURL: apiUrl,
   headers: headers,
   withCredentials: true,
});


export default Api;
