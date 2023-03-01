const PersonForm = ({ addPerson, name, num, handleName, handleNum }) => {
    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={name} onChange={handleName} /></div>
            <div>number: <input value={num} onChange={handleNum} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm