import './App.css';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityMap: '',
      error: false,
      errorMessage: '',
      weatherData: [],
      showWeather: false
    }
  }


  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&format=json&limit=1`

      let cityDataFromAxios = await axios.get(url)
      console.log(cityDataFromAxios);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=11&size=600x600&format=jpeg`
      })




    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })


    }

  }

  handleWeather = async (e) => {
    e.preventDefault();

    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`

      let weatherData = await axios.get(url);

      this.setState({
        weatherData: weatherData.data,
        showWeather: true
      })

    } catch (error) {
      console.log(error.message);

    }


  }











  render() {
    return (
      <>
        <h1>API Location Calls</h1>

        <body>

          <form onSubmit={this.getCityData}>
            <label htmlFor="">Search for a City!
              <input type="text" onInput={this.handleInput} />
              <button type='submit'>Explore</button>
            </label>
          </form>

          {

            this.state.error

              ? <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>{this.state.errorMessage}</Card.Title>
                  <Card.Text>
                    
                  </Card.Text>

                </Card.Body>
              </Card>
              : <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.cityMap} alt="map" />
                <Card.Body>
                  <Card.Title>{this.state.cityData.display_name}</Card.Title>
                  <Card.Text>
                    <div>Latitude: {this.state.cityData.lat}</div>

                    <div>Longitude: {this.state.cityData.lon}</div>
                  </Card.Text>

                </Card.Body>
              </Card>

            // <p>City: {this.state.cityData.display_name}</p>
            // <p>Latitude: {this.state.cityData.lat}</p>
            // <p>Longitude: {this.state.cityData.lon}</p>
            // <img src={this.state.cityMap} alt='map' />
            // ? <p>{this.state.errorMessage}</p>
            // : <p>{this.state.cityData.display_name}</p>

          }

        </body>





      </>


    )
  }

}


export default App;
