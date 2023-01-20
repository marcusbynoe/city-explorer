import React from 'react';


class Movies extends React.Component {
  render() {
    
    return (
      <>
        <h3>Movies</h3>
        <div>
          {this.props.movies.slice(0, 5).map((movie, idx) => (
            <div key={idx}>
              <p>Title: {movie.title}</p>
              <p>Description: {movie.description}</p>
              <img src={movie.image} alt={movie.title}/>
            </div>
          ))
          }
        </div>
      </>
    )
  }
    
}


export default Movies;