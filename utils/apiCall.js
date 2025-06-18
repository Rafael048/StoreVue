import axios from 'axios'

export async function apiCall(  url,method = 'GET', obj = null){
    const backendUrl = 'http://127.0.0.1:8000'
    try{
        console.log (obj,method)
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