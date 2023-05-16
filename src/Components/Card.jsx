import axios from 'axios';
import { useState } from 'react';
import {
  WiHumidity,
  BiWind,
  BsCompass,
  GiBinoculars,
  WiSunrise,
  WiSunset,
} from 'react-icons/all';
const Card = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const API_KEY = '9170ac763a0c251b0757ad5cd380ff47';

  const getWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const res = await axios.get(url);
      if (res.data.cod === '404') {
        setWeather(null);
        setError(true);
      } else {
        setWeather(res.data);
        setError(false);
      }
    } catch (err) {
      console.error(err);
      setWeather(null);
      setError(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // getWeather(city);
    getWeatherData();
  };

  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  const windDirection = (degrees) => {
    if (degrees > 11.25 && degrees <= 33.75) {
      return 'NNE';
    } else if (degrees > 33.75 && degrees <= 56.25) {
      return 'NE';
    } else if (degrees > 56.25 && degrees <= 78.75) {
      return 'ENE';
    } else if (degrees > 78.75 && degrees <= 101.25) {
      return 'E';
    } else if (degrees > 101.25 && degrees <= 123.75) {
      return 'ESE';
    } else if (degrees > 123.75 && degrees <= 146.25) {
      return 'SE';
    } else if (degrees > 146.25 && degrees <= 168.75) {
      return 'SSE';
    } else if (degrees > 168.75 && degrees <= 191.25) {
      return 'S';
    } else if (degrees > 191.25 && degrees <= 213.75) {
      return 'SSW';
    } else if (degrees > 213.75 && degrees <= 236.25) {
      return 'SW';
    } else if (degrees > 236.25 && degrees <= 258.75) {
      return 'WSW';
    } else if (degrees > 258.75 && degrees <= 281.25) {
      return 'W';
    } else if (degrees > 281.25 && degrees <= 303.75) {
      return 'WNW';
    } else if (degrees > 303.75 && degrees <= 326.25) {
      return 'NW';
    } else if (degrees > 326.25 && degrees <= 348.75) {
      return 'NNW';
    } else {
      return 'N';
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className='flex flex-col justify-center items-center mt-12 gap-4'>
      <form onSubmit={handleSubmit}>
        <div className='bg-white flex justify-center items-center w-auto space-x-4 p-4 rounded-lg shadow-lg '>
          <input
            placeholder='Enter your city'
            type='text'
            name='city'
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className='bg-white px-4 py-2 rounded-lg '
          />
          <button
            type='submit'
            className='bg-black text-white px-4 py-2 rounded-lg shadow-lg'
          >
            Get Weather
          </button>
        </div>
      </form>
      <div className='bg-white w-auto h-auto rounded-md p-4 shadow-lg'>
        <div className='flex justify-center items-center'>
          {error && (
            <p className='text-red-500 text-2xl px-4 py-2 mt-2'>
              City not found
            </p>
          )}
          {weather && (
            <div className='flex '>
              <div className='w-1/3 bg-gray-200 flex flex-col justify-center text-center items-center rounded-lg shadow-md'>
                <h1 className='text-4xl font-bold items-center p-2'>
                  {weather.name},{weather.sys.country}
                </h1>
                <div className='flex flex-col items-center mb-4'>
                  <p className='text-xl'>{weather.weather[0].description}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                    alt='weather icon'
                    className='mr-2 w-32 h-32 mx-auto'
                  />
                </div>
                <h1 className=''>
                  <span className='text-8xl px-4 bg-white rounded-lg py-2 shadow-lg'>
                    {Math.round(weather.main.temp)}&deg;C
                  </span>
                  <div className='mt-8  text-lg'>
                    <p className='font-bold mr-2'>
                      Feels like {weather.main.feels_like}&deg;C
                    </p>
                  </div>
                </h1>
              </div>
              <div className='flex flex-col pl-8'>
                <div className='text-2xl bg-black py-2 text-center text-white rounded-md shadow-lg'>
                  <h1>
                    {currentDate}, {currentTime}
                  </h1>
                </div>
                <div className='grid grid-cols-3 gap-8 p-12 pl-0'>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border flex items-center'>
                    <div>
                      <h1>
                        Humidity:
                        <br />{' '}
                        <span className='font-bold text-2xl'>
                          {' '}
                          {weather.main.humidity}%
                        </span>
                      </h1>
                    </div>
                    <WiHumidity className='text-8xl ' />
                  </div>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border flex items-center'>
                    <div>
                      <h1>
                        Wind speed <br />{' '}
                        <span className='font-bold text-2xl'>
                          {' '}
                          {weather.wind.speed}m/s
                        </span>
                      </h1>
                    </div>
                    <BiWind className='text-8xl ml-2' />
                  </div>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border text-center items-center flex '>
                    <div className='text-center'>
                      <h1>Wind direction </h1>
                      <span className='font-bold text-2xl'>
                        {windDirection(weather.wind.deg)}
                      </span>
                    </div>
                    <BsCompass className='text-4xl ml-2' />
                  </div>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border flex items-center'>
                    <div>
                      <h1>
                        Visibility:
                        <br />
                        <span className='font-bold text-2xl'>
                          {' '}
                          {Math.round(weather.visibility / 1000)}km
                        </span>
                      </h1>
                    </div>
                    <GiBinoculars className='text-8xl ml-2' />
                  </div>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border flex items-center'>
                    <div>
                      <h1>
                        Sunrise:
                        <br />{' '}
                        <span className='font-bold text-2xl'>
                          {convertUnixTime(weather.sys.sunrise)}
                        </span>
                      </h1>
                    </div>
                    <WiSunrise className='text-8xl ml-2' />
                  </div>
                  <div className='bg-white shadow-md p-8 px-12 rounded-lg border flex items-center'>
                    <div>
                      <h1>
                        Sunset:
                        <br />{' '}
                        <span className='font-bold text-2xl'>
                          {convertUnixTime(weather.sys.sunset)}
                        </span>
                      </h1>
                    </div>
                    <WiSunset className='text-8xl ml-2' />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
