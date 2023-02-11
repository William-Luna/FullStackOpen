import Country from './Country'

const DisplayCountries = ({ Countries, showInfo, countryInfo }) => {

    if (Countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (Countries.length === 1) {
        return (
            <></>
        )
    } else {
        return (
            Countries.map(c => <Country key={c.cca2} country={c} showCountryButton={showInfo} />)
        )
    }

}

export default DisplayCountries