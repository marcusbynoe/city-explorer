import React from 'react';

class Movie extends React.Component {
  render() {
    return (

      <>
        <div key={this.props.idx}>
          <p>Title: {this.props.movie}</p>
          <p>Description: {this.props.description}</p>

        </div>

      </>

    )

  }
}

export default Movie;