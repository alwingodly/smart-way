import axios from "axios";
const getUrl = () => {
  //return window.location.href.split("#")[0] + "smartway";
  return "http://localhost:7700/smartway";
};
export default axios.create({
  baseURL: getUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});