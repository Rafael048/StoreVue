import axios from 'axios'

export async function apiCall(url, method = 'GET', obj = null) {
    const backendUrl = import.meta.env.VITE_DIRECCION_BACKEND
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const config = {
        method,
        url: `${backendUrl}/${url}`,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(obj ? { data: obj } : {})
    }

    // Solo añade Authorization si no es login/registro
    if (!['usuarios/login/', 'usuarios/registro/'].includes(url)) {
        if (!accessToken) {
            console.error('No access token available')
            window.location.href = '/login'
            return
        }
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    try {
        const response = await axios(config)
        
        // Actualiza tokens si vienen en la respuesta
        if (response.data?.refresh || response.data?.access) {
            localStorage.setItem('accessToken', response.data.access)
            if (response.data.refresh) {
                localStorage.setItem('refreshToken', response.data.refresh)
            }
        }
        
        return response
        
    } catch (error) {
        if (error.response?.status === 401 && refreshToken) {
            try {
                // Intenta refrescar el token
                const refreshResponse = await axios.post(`${backendUrl}/api/token/refresh/`, {
                    refresh: refreshToken
                })

                if (refreshResponse.data?.access) {
                    // Guarda el nuevo token y reintenta
                    localStorage.setItem('accessToken', refreshResponse.data.access)
                    config.headers.Authorization = `Bearer ${refreshResponse.data.access}`
                    return await axios(config)
                }
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError)
                // Limpia tokens y redirige
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return
            }
        }
        
        // Otros errores o sin refresh token
        // localStorage.removeItem('accessToken')
        // localStorage.removeItem('refreshToken')
        // window.location.href = '/login'
        throw error.response?.data || error.message
    }
}