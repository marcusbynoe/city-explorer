import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
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
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&format=json`

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







  render() {
    return (
      <>
        <h1>API Location Calls</h1>

        <form>
          <label htmlFor="">Search for a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>



      </>


    )
  }


export default App;
