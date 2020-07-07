import * as React from "react";
import MovieCard from "./components/MovieCard";
import "./home.scss";

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [
        { id: "1", title: "Predator", src: "www.predator.com", rating: "8,6" },
        { id: "2", title: "Matrix", src: "www.matrix.com", rating: "9,2" },
        { id: "3", title: "LOTR", src: "www.lotr.com", rating: "8,4" },
        { id: "4", title: "Alien", src: "www.predator.com", rating: "8,6" },
        {
          id: "5",
          title: "Dumb & Dumber",
          src: "www.matrix.com",
          rating: "9,2",
        },
        { id: "6", title: "LOTR 3", src: "www.lotr.com", rating: "8,4" },
      ],
    };
    this.handleMakeRow = this.handleMakeRow.bind(this);
  }

  handleMakeRow(movies: Array<object>) {
    var numOfRows = movies.length / 3;
    var arraysOfRows = [];
    var start = 0;
    var end = 3;
    var i;
    console.log(numOfRows);
    for (i = 0; i < numOfRows; i++) {
      arraysOfRows.push(movies.slice(start, end));
      start = start + 3;
      end = end + 3;
    }
    return arraysOfRows;
  }

  render() {
    const { movies } = this.state;
    const rowsOfMovies = this.handleMakeRow(movies);
    return (
      <div className="layout">
        <div className="layout-core">
          <div>Home Page</div>
          {rowsOfMovies.map((row: any) => (
            <div className="flex-container">
              {row.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  movieSrc={movie.src}
                  rating={movie.rating}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
