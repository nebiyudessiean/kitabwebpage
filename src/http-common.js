import axios from "axios";
export default axios.create({
  baseURL: "http://10.2.64.163",
  // baseURL: "http://192.168.43.19",
 
  "crossDomain": true,
  "contentType": false,
  "mimeType": "multipart/form-data"
});