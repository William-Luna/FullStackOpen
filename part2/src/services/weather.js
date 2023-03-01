import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getCapitalWeather = country => {
    const request = axios.get(`${baseUrl}${country.capital},${country.cca2}&appid=${api_key}`);
    const data = request.then(res => res.data);
    console.log(data);
    return data;
}

export default { getCapitalWeather }