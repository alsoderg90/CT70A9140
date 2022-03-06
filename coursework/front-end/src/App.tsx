import { useEffect, useState } from 'react';
import {IPerson} from './interfaces/IPerson'
import PersonInfo from './components/PersonInfo'
import PersonTable from './components/PersonsTable'
import  personService  from './services/person'
import { HashRouter as Router, Routes, Route, Link, } from "react-router-dom"
import './App.scss';

function App() {

  const [ person, setPerson ] = useState<IPerson>( { id: NaN, firstName: "", surName: "", age: NaN } )
  const [ persons, setPersons ] = useState<IPerson[]>([])

  useEffect(() => {
    personService
     .getAll()
     .then(response => {

      setPersons(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])
  
    return (
      <div className='app'>
        <div className="nav-bar">
          <ul>
            <li>
              <Link 
                to="/"
                onClick={() => setPerson({ id: NaN, firstName: "", surName: "", age: NaN})}>
                Person
                <i className="fa-solid fa-user icon"></i>
              </Link>
            </li>
            <li>
              <Link 
                to="/persons">
                Persons 
                <i className="fa-solid fa-users icon"></i>
              </Link>
            </li>              
          </ul>
        </div>

        <Routes>
          <Route path={"/persons"} element={
            <PersonTable
              persons={persons}
              setPersons={setPersons}
              setPerson={setPerson}>
            </PersonTable>}/>
          <Route path={"/"} element={
            <PersonInfo 
              setPerson={setPerson}
              person={person}
              setPersons={setPersons}
              persons={persons}
              edit={false}>
            </PersonInfo>}/>
          <Route path={"/person"} element={
            <PersonInfo 
              setPerson={setPerson}
              person={person}
              setPersons={setPersons}
              persons={persons}
              edit={true}>
            </PersonInfo>}/>
        </Routes>
        </div>
  );
}

export default App;
