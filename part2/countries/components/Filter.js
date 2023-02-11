const Filter = ({ filterInput, handleFilterChange }) => {
    return (
        <div>Find countries <input value={filterInput} onChange={handleFilterChange} /> </div>
    )
}

export default Filter