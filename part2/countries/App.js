import { useState, useEffect } from 'react'
import DisplayCountries from './components/DisplayCountries'
import Filter from './components/Filter'
import countryService from './services/countries'
import weatherService from './services/weather'
import CountryIndiv from './components/CountryIndiv'

const App = () => {
  const [countries, setCountries] = useState([]);

  const [filterInput, setFilter] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState(null);

  //filter function
  const countriesFilter = countries.filter(c => c.name.common.toLowerCase().includes(filterInput.toLowerCase()))

  useEffect(() => {
    countryService.getCountries()
      .then(countries => {
        console.log('Promise resolved: All countries retrieved');
        setCountries(countries);
      }).catch(error => {
        console.log('error retrieving countries');
      });
  }, [])

  useEffect(() => {
    //get weather data for country's capital when countryinfo changes
    if (countryInfo) {
      weatherService.getCapitalWeather(countryInfo)
        .then(w => {
          setWeather(w);
          console.log('Weather info received.');
        }).catch(error => console.log(`Error retrieving capital's weather (${error})`))
    }

  }, [countryInfo])

  useEffect(() => {
    if (countriesFilter.length === 1) setCountryInfo(countriesFilter[0])
  }, [filterInput, countriesFilter])

  const handleFilterChange = (e) => {
    setCountryInfo(null);
    setFilter(e.target.value);
  }

  const showInfo = (country) => {
    setCountryInfo(country);
  }

  return (
    <div>
      <Filter filterInput={filterInput} handleFilterChange={handleFilterChange} />
      <DisplayCountries Countries={countriesFilter} showInfo={showInfo} countryInfo={countryInfo} />
      {countryInfo ? (<CountryIndiv country={countryInfo} weather={weather} />) : <></>}
    </div>
  )
}

export default App