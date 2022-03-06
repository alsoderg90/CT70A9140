import React from 'react'
import { useState } from 'react';
import {IPerson} from '../interfaces/IPerson'
import personService from '../services/person'
import {useNavigate} from 'react-router-dom';


type Props = {
    setPersons: (val: IPerson[]) => void
    persons: IPerson[]
    setPerson: (val: IPerson) => void
}

const PersonsTable: React.FC<Props> = ( {persons, setPersons, setPerson }) => {
    
    const navigate = useNavigate();
    const [order, setOrder ] = useState({
        firstName: true,
        surName: true,
        age: true,
    })

    const SortByFN = () => {
        const sorted = [...persons].sort((a, b) => 
            order.firstName
            ? a.firstName.toUpperCase() > b.firstName.toUpperCase() ? 1 : -1
            : a.firstName.toUpperCase() > b.firstName.toUpperCase() ? -1 : 1
        )
        setPersons(sorted)
        setOrder({...order, firstName: !order.firstName})
    }

    const SortBySN = () => {
        const sorted = [...persons].sort((a, b) => 
            order.surName
            ? a.surName.toUpperCase() > b.surName.toUpperCase() ? 1 : -1
            : a.surName.toUpperCase() > b.surName.toUpperCase() ? -1 : 1

        )
        setPersons(sorted)
        setOrder({...order, surName: !order.surName})
    }

    const SortByAge = () => {
        const sorted = [...persons].sort((a, b) => 
            order.age ? a.age> b.age ? 1 : -1 : a.age> b.age ? -1 : 1
        )
        setPersons(sorted)
        setOrder({...order, age: !order.age})
    }

    const deletePerson = (id: number) => {
        personService
         .Delete(id).then(response => {
             console.log(response)
             setPersons((persons.filter(person =>  person.id !== id)))
         })
    }

    const editPerson = (id: number) => {
        personService
         .getOne(id).then(response => {
             setPerson(response.data)
             navigate("/person")
         })

    }

    return (
        <table className="table">
            <thead>
              <tr>
                <th scope="col"
                  onClick={SortByFN}
                  >First name
                  <i className="fas fa-sort"></i>
                </th>
                <th scope="col"
                  onClick={SortBySN}
                  >Surname 
                  <i className="fas fa-sort"></i>
                </th>
                <th 
                  scope="col"
                  onClick={SortByAge} 
                  >Age 
                  <i className="fas fa-sort"></i>
                </th>
                <th 
                  scope="col"
                  >Delete 
                </th>
                <th 
                  scope="col"
                  >Edit 
                </th>
              </tr>
            </thead>
            <tbody>
                {persons.map( (person) => {
                    return (
                        <tr key={person.id}>
                            <td> { person.firstName } </td>
                            <td> { person.surName } </td>
                            <td> {person.age} </td>
                            <td> <button className='delete' onClick={ () => deletePerson(person.id)}> Delete</button></td>
                            <td> <button onClick={ () => editPerson(person.id)}> Edit</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default PersonsTable