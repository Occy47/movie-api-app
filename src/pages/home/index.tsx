import * as React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import "./home.scss";
import NoImage from "../../images/not_available.png";
import RoundButton from "./components/RoundButton";
import Shuffle from "../../images/shuffle-icon.png";
import Load from "../../images/load-icon.png";
import HeaderBar from "../../components/HeaderBar";

const MY_API_KEY = process.env.REACT_APP_API_KEY;

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newMovies: [],
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
      randomMovies: [55, 82, 112, 251, 289, 550],
    };
    this.handleMakeRow = this.handleMakeRow.bind(this);
    this.handleGetMovies = this.handleGetMovies.bind(this);
    this.handleGetRows = this.handleGetRows.bind(this);
    this.handleGetYear = this.handleGetYear.bind(this);
    this.handleGetRandomMovies = this.handleGetRandomMovies.bind(this);
    this.handleGetMoreMovies = this.handleGetMoreMovies.bind(this);
  }

  componentDidMount() {
    this.handleGetRandomMovies();
    setTimeout(() => this.handleGetMovies(), 800);
    setTimeout(() => this.handleGetRows(), 1200);
  }

  handleGetMovies() {
    var randomMovies = this.state.randomMovies;
    var newMoviesArray: object[] = this.state.newMovies;
    randomMovies.map((id: number) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${MY_API_KEY}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.status_code === 34) {
            console.log("no movie");
          } else {
            newMoviesArray.push(data);
          }
        });
      return null;
    });

    this.setState({ movies: newMoviesArray });
  }

  handleMakeRow(movies: object[]) {
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
    console.log("moves from get rows:", movies);
    const newRows = this.handleMakeRow(movies);
    console.log("new rows: ", newRows);
    this.setState({ rows: newRows });
  }

  handleGetYear(date: Date) {
    var newDate = new Date(date);
    var year = newDate.getFullYear();

    return year;
  }

  handleGetRandomMovies() {
    var randomMovies = [];
    var randomNum;
    var i;
    for (i = 0; i < 6; i++) {
      randomNum = Math.floor(Math.random() * Math.floor(85550));
      randomMovies.push(randomNum);
    }
    this.setState({ randomMovies: randomMovies });
  }

  handleGetMoreMovies() {
    this.handleGetRandomMovies();
    setTimeout(() => this.handleGetMovies(), 800);
    setTimeout(() => this.handleGetRows(), 1200);
  }

  render() {
    const { movies, rows, randomMovies } = this.state;
    console.log("movies: ", movies, rows, randomMovies);
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
                      prod_companies: movie.production_companies.name,
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
                    movieSrc={
                      movie.poster_path === null
                        ? NoImage
                        : `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    }
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
              onClick={() => this.handleGetMoreMovies()}
            />
            <RoundButton
              icon={Shuffle}
              name="shuffle"
              onClick={() => this.handleGetRows()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
