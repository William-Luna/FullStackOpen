const imgUrlBase = 'http://openweathermap.org/img/wn/'

const CountryIndiv = ({ country, weather }) => {

    if (!country || !weather) return null;
    else {
        console.log(weather);
        return (
            <div>
                <div>
                    <h1>{country.name.common}</h1>
                    <div>capital {country.capital}</div>
                    <div>area {country.area}</div>
                    <b>languages:</b>
                    <ul>
                        {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
                    </ul>
                    <img src={country.flags["png"]} height="200" width="300" alt="{country.name.common} flag" />
                </div>
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <div>Temperature is {(weather.main.temp - 273.15).toFixed(2)} degrees Celsius</div>
                    <img src={imgUrlBase + weather.weather[0].icon + '@2x.png'} width='200' height='200' alt={weather.weather.description}></img>
                    <div>Wind {weather.wind.speed} m/s</div>
                </div>
            </div>
        )
    }
}

export default CountryIndiv