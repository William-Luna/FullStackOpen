require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (request, response) => {
    return request.body
})

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(tokens.body(req, res))
    ].join(' ')
}));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(res => {
        if (res) response.json(res)
        else response.status(404).end()
    }).catch(error => next(error))
})


app.get('/info', (request, response, next) => {
    Person.countDocuments({}).then(res => {
        console.log(res)
        response.send(`<div>Phonebook has info for ${res} people</div><div>${Date()}</div>`)

    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body.name);

    //missing info check
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing info'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        response.json(result)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => {
        next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedPerson => {
        console.log(`Updated ${updatedPerson.name} number to ${updatedPerson.number}`)
        response.json(updatedPerson)
    }).catch(error => {
        next(error)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    //other errors past for Express to handle
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})