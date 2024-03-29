const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) response.json(person)
    else response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${Date()}</div>`)
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random() * 999999)
        : 0
    return maxId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body.name);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing info'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        console.log(`${body.name} is duplicate`)
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number || false,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(`Deleted id ${id}`)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)