import * as React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import "./home.scss";
import RoundButton from "./components/RoundButton";
import Shuffle from "../../images/shuffle-icon.png";
import Load from "../../images/load-icon.png";
import HeaderBar from "../../components/HeaderBar";

const MY_API_KEY = process.env.REACT_APP_API_KEY;

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [
        {
          id: "1",
          original_title: "Predator",
          src: "www.predator.com",
          vote_average: "8,6",
          description: "hgew iojgčwoighč  qihčgqhf",
          popularity: 83.568,
          language: "en",
          release_date: "2000-12-05",
        },
        {
          id: "2",
          original_title: "Matrix",
          src: "www.matrix.com",
          vote_average: "9,2",
          description: "hgew iwz ez ee čgqhf",
          popularity: 192.468,
          language: "en",
          release_date: "2000-12-05",
        },
        {
          id: "3",
          original_title: "LOTR",
          src: "www.lotr.com",
          vote_average: "8,4",
          description: "hgew iojgčwoighč  q eh eeuhj  eh e",
          popularity: 210.469,
          language: "en",
          release_date: "2013-12-05",
        },
        {
          id: "4",
          original_title: "Alien",
          src: "www.predator.com",
          vote_average: "8,6",
          description: "rth rtuqihčgqhf ezhsdghweh",
          popularity: 66.478,
          language: "en",
          release_date: "2008-12-05",
        },
        {
          id: "5",
          original_title: "Dumb & Dumber",
          src: "www.matrix.com",
          vote_average: "9,2",
          description: "hgew iojgčwoighč  qihčgqhf",
          popularity: 52.326,
          language: "en",
          release_date: "2005-12-05",
        },
        {
          id: "6",
          original_title: "LOTR 3",
          src: "www.lotr.com",
          vote_average: "8,4",
          description: "h qw rwq ghč  qihčgqhf",
          popularity: 180.336,
          language: "en",
          release_date: "1999-12-05",
        },
      ],
      rows: [],
    };
    this.handleMakeRow = this.handleMakeRow.bind(this);
    this.handleGetMovies = this.handleGetMovies.bind(this);
    this.handleGetRows = this.handleGetRows.bind(this);
    this.handleGetYear = this.handleGetYear.bind(this);
  }

  componentDidMount() {
    this.handleGetMovies();
    setTimeout(() => this.handleGetRows(), 1000);
  }

  handleGetMovies() {
    var randomMovies = [55, 82, 112, 251, 289, 550];
    var newMoviesArray: any = [];
    randomMovies.map((id: any) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${MY_API_KEY}`)
        .then((data) => data.json())
        .then((data) => {
          newMoviesArray.push(data);
        });
    });

    this.setState({ movies: newMoviesArray });
  }

  handleMakeRow(movies: any) {
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

  handleGetRows() {
    const { movies } = this.state;
    const newRows = this.handleMakeRow(movies);

    this.setState({ rows: newRows });
  }

  handleGetYear(date: Date) {
    var newDate = new Date(date);
    var year = newDate.getFullYear();

    return year;
  }

  render() {
    const { movies, rows } = this.state;
    console.log("movies: ", movies, rows);
    return (
      <div className="layout">
        <div className="layout-core">
          <HeaderBar title="Movie API" />
          {rows.map((row: any) => (
            <div className="flex-container">
              {row.map((movie: any) => (
                <Link
                  to={{
                    pathname: `/details/${movie.id}`,
                    state: {
                      title: `${movie.original_title} (${this.handleGetYear(
                        movie.release_date
                      )})`,
                      description: movie.overview,
                      rating: movie.vote_average,
                      popularity: movie.popularity,
                      language: movie.original_language,
                      prod_companies: movie.production_companies[0].name,
                      src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <MovieCard
                    key={movie.id}
                    title={`${movie.original_title} (${this.handleGetYear(
                      movie.release_date
                    )})`}
                    movieSrc={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    language={`Language: ${movie.original_language}`}
                    movieRating={movie.vote_average}
                  />
                </Link>
              ))}
            </div>
          ))}
          <div className="btns-container">
            <RoundButton
              icon={Load}
              name="load"
              style={{ textAlign: "center", marginLeft: 130 }}
              onClick={() => this.handleGetRows()}
            />
            <RoundButton icon={Shuffle} name="shuffle" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
