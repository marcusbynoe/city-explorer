import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityMap: '',
      error: false,
      errorMessage: ''
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

      console.log(url);
      let cityDataFromAxios = await axios.get(url)

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      })




    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })


    }

  }

 getMapData = async (e) => {

  try {
    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.cityMap.lat},${this.state.cityData.lon}&zoom=11&size=600x600&format=jpeg`

    this.setState({
      cityMap: mapUrl,
    })
  } catch (error) {
    console.log(error);
    this.setState({
      error: true,
      errorMessage: error.message
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

        <p>City: {this.state.cityData.display_name}</p>
        <p>Latitude: {this.state.cityData.lat}</p>
        <p>Longitude: {this.state.cityData.lon}</p>
        {this.state.cityMap}
        <img src={this.state.cityMap} alt='map' />

        {/* {
          this.state.error
          ? <p>{this.state.errorMessage}</p>
          : <p>{this.state.cityData.display_name}</p>
        } */}


      </>


    )
  }

}


export default App;
