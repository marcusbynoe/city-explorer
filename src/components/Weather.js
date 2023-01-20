import React from 'react';
import WeatherDay from './weatherDay';

class Weather extends React.Component {
  render() {
    return (
      <>

        <h3>Daily Weather</h3>

        {this.props.weatherData.map((day, idx) => (
          <WeatherDay key={idx} date={day.date} description={day.description} />


        ))
        }
      </>

    )

 }
} 

export default Weather;