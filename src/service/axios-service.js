import axios from 'axios'
import { BASE_URL } from '../config/api-config'

 const api=axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1' 
      }

})
export default api