import axios from "axios";

const API_BEARER = process.env.NEXT_PUBLIC_API_BEARER;
const initAxios = () =>
  (axios.defaults.headers.common["Authorization"] = "Bearer ".concat(
    API_BEARER
  ));
export { initAxios };
