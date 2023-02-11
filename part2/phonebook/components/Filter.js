const Filter = ({ filterInput, handleFilterChange }) => {
    return (
        <div>Filter: Only show entries that contain <input value={filterInput} onChange={handleFilterChange} /> </div>
    )
}

export default Filter