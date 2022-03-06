const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
      })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
     .then(person => {
        person ? response.json(person) : response.status(404).end()
     })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
      response.status(204).end()
    })
      .catch(error => (next(error)))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body 
    const person = new Person({
      firstName : body.firstName,
      surName : body.surName,
      age: body.age,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        firstName : body.firstName,
        surName : body.surName,
        age: body.age,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})