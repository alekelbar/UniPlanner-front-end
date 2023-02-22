import axios from "axios";

const API = axios.create({
  baseURL: "https://apis.gometa.org/cedulas/",
});

export const getNameByID = async (id: string) => {
  return await API.get(id);
}
