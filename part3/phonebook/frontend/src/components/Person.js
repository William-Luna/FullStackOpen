const Person = ({ person, delOnClick }) => {
    return (
        <div>{person.name} {person.number} <button onClick={() => delOnClick(person.id)}>delete</button></div>
    )
}

export default Person