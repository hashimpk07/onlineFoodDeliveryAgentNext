import axios from "axios";

const baseURL = "https://sandbox.4ulogistic.com/api";
const instance = axios.create({ baseURL });

console.warn('Request to "/test":', instance.getUri({ url: "/test" }));
console.warn('Request to "test":', instance.getUri({ url: "test" }));
