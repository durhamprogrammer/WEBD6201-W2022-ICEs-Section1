import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3500/api",
  //baseURL: "https://webd6201-w2022-section1.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});