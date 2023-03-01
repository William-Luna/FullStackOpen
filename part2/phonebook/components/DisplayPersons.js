import Person from './Person'

const DisplayPersons = ({ Persons, delOnClick }) => {
    return (
        Persons.map(p =>
            <Person key={p.name} person={p} delOnClick={delOnClick} />
        )
    )
}

export default DisplayPersons