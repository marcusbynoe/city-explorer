import logo from './logo.svg';
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
}

export default App;
