import axios from 'axios'

export async function apiCall(  url,method = 'GET', obj = null){
    const backendUrl = import.meta.env.VITE_DIRECCION_BACKEND
    try{
        const config = {
            method,
            url : `${backendUrl}/${url}`,
            headers: {
            'Content-Type': 'application/json',
          },
          ...(obj ? { data:obj } : {})
        }
        const response = await axios(config)
        return response
    }catch(error){
        console.log(error)
        throw error
    }
   
}