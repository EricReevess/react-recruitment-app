import axios from 'axios'

export default function ajax(method = 'GET', url = '', data = {}) {
  if (method === 'GET'){
    return  axios.get('/user',{
      params:{
        ...data
      }
    })
  }
  if(method === 'POST'){
    return axios.post(url, data)
  }
}

