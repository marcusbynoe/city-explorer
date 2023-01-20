import React from 'react';

class WeatherDay extends React.Component {
  render(){
    return (
      <>
      <div key={this.props.idx}>
      <p>Date: {this.props.date}</p>
      <p>Description: {this.props.description}</p>
      </div>
      </>

    )
  }
}

export default WeatherDay;