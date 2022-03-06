import React, { ChangeEvent } from 'react'
import { IPerson } from '../interfaces/IPerson'
import  personService  from '../services/person'
import {useNavigate} from 'react-router-dom';

type Props = {
    setPerson : (val: IPerson) => void
    person: IPerson
    setPersons: (val: IPerson[]) => void
    persons: IPerson[]
    edit: boolean
}

const PersonInfo: React.FC<Props> = ({ setPerson, person, setPersons, persons, edit }) => {
    const navigate = useNavigate();
    
    const changeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson( {...person, firstName: e.target.value} )
    }

    const changeSurName = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson( {...person, surName : e.target.value} )
    }

    const changeAge = (e: ChangeEvent<HTMLInputElement>) => {
        setPerson( {...person,  age : Number(e.target.value)} )
    }

    const addPerson = () => {
        personService
         .create(person).then(response => {
            setPersons(persons.concat({ ...person, id: response.data.id }))
            navigate("/persons")
         })
         .catch(error => {
            console.log(error)
          })
    }

    const editPerson = (id: number) => {
        console.log(id)
        personService
         .Edit(id, person).then(response => {
             setPersons(persons.map(item => item.id === id ? response.data : item))
             navigate("/persons")
         })
    }

    return(
        <div className="container">      
            <h3> Person </h3>
            <div className="labels">
                <label> <i className="fa fa-user"></i>First name: </label>
                <label> <i className="fa fa-family"></i>Surname: </label>
                <label> <i className="fas fa-university"></i>Age: </label>
            </div>
            <div className='inputs'>
                <input 
                    onChange={changeFirstName} 
                    value={ person.firstName} 
                    required={true}/>
                <input 
                    onChange={changeSurName} 
                    value={ person.surName}
                    required={true}/>
                <input 
                    onChange={changeAge} 
                    type={"number"}
                    value={ person.age}
                    required={true}/>
            </div> 
            {edit ? 
            <button onClick={() => editPerson(person.id)}>Edit</button> 
            :<button onClick={ addPerson}>Add</button>}
        </div>
    )
}

export default PersonInfo