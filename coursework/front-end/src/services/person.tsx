import axios from "axios";
import { IPerson } from '../interfaces/IPerson'

// .NET api
//const apiUrl = 'https://my-person-app2.azurewebsites.net/api/persons/'

// express API
const apiUrl = '/api/persons/'

const getAll = () => {
    return axios.get(apiUrl)
  }

  const getOne = (id: number) => {
    return axios.get(`${apiUrl}${id}`)
  }

  const create = (object: IPerson) => {
    console.log(object)
    return axios.post(apiUrl, { 
      firstName: object.firstName,
      surName: object.surName,
      age: object.age
    })
  }  

  const Delete = (id: number) => {
    return axios.delete(`${apiUrl}${id}`)
  }

  const Edit = (id: number, object: IPerson) => {
    console.log(id, object)
    return axios.put(`${apiUrl}${id}`, object)
  } 
  
  const personService =  { 
    getAll, 
    create, 
    Delete,
    getOne,
    Edit,
  }

  export default personService