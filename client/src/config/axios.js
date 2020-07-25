import axios from 'axios'
const instace = axios.create({
  baseURL: 'https://cms-ecom-greg.herokuapp.com/'
})

export default instace
