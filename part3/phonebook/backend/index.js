require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]


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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then((err, res) => {
        if (err) {
            return response.status(400).json({
                error: 'no matching id to person'
            })
        }
        response.json(res)
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments({}, (err, res) => {
        if (err) {
            console.log(err)
            response.status(400).json({
                error: 'error finding count of phonebook entries'
            })
        }
        response.send(`<div>Phonebook has info for ${res} people</div><div>${Date()}</div>`)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body.name);

    //missing info check
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing info'
        })
    }

    //duplicate check
    // Person.findOne({name: body.name}).then((err, result) => {
    //     if (err) console.log('Name is not in database. Proceeding to add...')
    //     else {
    //         console.log(`${body.name} is duplicate`)
    //         return response.status(400).json({
    //             error: 'name must be unique'
    //         })
    //     }
    // })

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(`Deleted id ${id}`)
    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})