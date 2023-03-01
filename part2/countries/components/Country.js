const Country = ({ country, showCountryButton }) => {
    return (
        <div>{country.name.common} <button onClick={() => showCountryButton(country)}>show</button></div>
    )
}

export default Country