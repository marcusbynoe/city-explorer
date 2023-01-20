import React from 'react';
import Movie from './Movie';
import Card from 'react-bootstrap/Card';


class Movies extends React.Component {
  render() {

    return (
      <>
        <Card>
          <h3>Movies</h3>
          {this.props.movies.slice(0, 5).map((movie, idx) => (
            <div key={idx}>
              <Movie movie={movie.movies} description={movie.description} />
              <img src={movie.image} alt={movie.title} />
            </div>
          ))
          }
        </Card>
      </>
    )
  }

}


export default Movies;