import './App.css';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Weather from './components/Weather';
import Movies from './components/Movies';
import { ListGroup } from 'react-bootstrap';

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
      showWeather: false,
      movies: [],
      movieError: false,
      movieErrorMessage: ''
    }
  }


  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

 
 callApis = () => {
  this.getMovie();
 }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&format=json&limit=1`
      let cityDataFromAxios = await axios.get(url)

      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;

      this.handleWeather(lat, lon);

      console.log(cityDataFromAxios);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=11&size=600x600&format=jpeg`
      }, this.callApis)




    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })


    }

  }
  // DEFINE A WEATHER HANDLER TO RETRIEVE 
  handleWeather = async (lat, lon) => {
    // e.preventDefault();

    try {
      // BUILD URL
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`

      // USE AXIOS TO HIT MY SERVER
      let weatherDataFromAxios = await axios.get(url);

      // SAVE THAT WEATHER DATA TO STATE
      this.setState({
        weatherData: weatherDataFromAxios.data,
        // showWeather: true
      })

    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }


  }

  getMovie = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`

      let moviesFromAxios = await axios.get(url);

      this.setState({
        movies: moviesFromAxios.data,
        movieError: false,
        movieErrorMessage: '',
      })

    } catch (error) {
      this.setState({
        movieError: true,
        movieErrorMessage: error.message
      })
    }
  }









  render() {
    return (
      <>
        <h1>API Location Calls</h1>



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
            : <>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.cityMap} alt="map" />
                <Card.Body>
                  <Card.Title>{this.state.cityData.display_name}</Card.Title>
                  <Card.Text>
                    <ListGroup variant='flush'>

                      <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
                      <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>


                    </ListGroup>
                  </Card.Text>

                </Card.Body>
              </Card>
              <Weather weatherData={this.state.weatherData} />
              <Movies movies={this.state.movies} />
            </>
          // <p>City: {this.state.cityData.display_name}</p>
          // <p>Latitude: {this.state.cityData.lat}</p>
          // <p>Longitude: {this.state.cityData.lon}</p>
          // <img src={this.state.cityMap} alt='map' />
          // ? <p>{this.state.errorMessage}</p>
          // : <p>{this.state.cityData.display_name}</p>

        }







      </>


    )
  }

}


export default App;
