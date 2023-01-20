import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <>
        <div>
          <p>Date: {this.props.date}</p>
          <p>Description: {this.props.description}</p>
        </div>
      </>

    )
  }
}

export default WeatherDay;