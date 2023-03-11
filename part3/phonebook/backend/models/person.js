const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(function () {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

function numberValidator(value) {
  const [part1, part2, ...other] = value.split('-')

  //multiple dashes validation
  if (other.length !== 0) return false

  //no dash validation
  if (!part2) return false

  // only numerical characters validation
  if (!part1.match('[0-9]+') || !part2.match('[0-9]+')) return false

  //length of part1 validation
  if (part1.length < 2 || part1.length > 3) return false

  //length of 8 or more (including dash in string) validation
  if (part1.length + part2.length < 7) return false

  return true

}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: numberValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)