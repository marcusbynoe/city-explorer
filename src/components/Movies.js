import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    
    return (
      <>
        <h3>Movies</h3>
        <div>
          {this.props.movies.slice(0, 5).map((movie, idx) => (
            <div>
              <Movie key={idx} movie={movie.movies} description={movie.description} />
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