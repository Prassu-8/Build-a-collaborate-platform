import axios from 'axios';

export const url = 'http://localhost:3000'



export const AxiosApi = axios.create({
  baseURL: url,
  withCredentials: true

})

export default AxiosApi