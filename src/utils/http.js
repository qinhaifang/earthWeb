import axios from 'axios'

axios.interceptors.request.use(request =>{
    request.url += '.json'
    return request
})
axios.interceptors.response.use(response =>{
    if(response.status === 200){
        return response.data.data
    }
    
})

export default axios