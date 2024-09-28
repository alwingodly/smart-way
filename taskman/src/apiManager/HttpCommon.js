import axios from "axios";
const getUrl = () => {
  //return window.location.href.split("#")[0] + "smartway";
  return "https://smart-way-final-api.vercel.app/smartway";
};
export default axios.create({
  baseURL: getUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});
