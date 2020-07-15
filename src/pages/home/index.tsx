import * as React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import "./home.scss";
import NoCardImage from "../../images/not_available.png";
import NoDetailsImage from "../../images/not_available_details.png";
import RoundButton from "./components/RoundButton";
import Shuffle from "../../images/shuffle-icon.png";
import Load from "../../images/load-icon.png";
import HeaderBar from "../../components/HeaderBar";
import MovieRoulleteModal from "./components/MovieRouletteModal";
import Loading from "./components/Loading";

const MY_API_KEY = process.env.REACT_APP_API_KEY;

// API key za svaki slucaj da ga ne vidis zbog gita 0e5d8609d969cdd351eca714cacfeaea

export interface HomeState {
  newMovies: Array<object>;
  rows: Array<object>;
  randomMovieIds: Array<number>;
  modalVisible: boolean;
  isLoading: boolean;
}

class HomePage extends React.Component<HomeState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newMovies: [],
      rows: [],
      randomMovieIds: [55, 82, 112, 251, 289, 550],
      modalVisible: false,
      isLoading: true,
    };
    this.handleMakeRow = this.handleMakeRow.bind(this);
    this.handleGetMovies = this.handleGetMovies.bind(this);
    this.handleGetRows = this.handleGetRows.bind(this);
    this.handleGetYear = this.handleGetYear.bind(this);
    this.handleGetRandomMovieIds = this.handleGetRandomMovieIds.bind(this);
    this.handleGetMoreMovies = this.handleGetMoreMovies.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleGetMoviesByGenreWithLoading = this.handleGetMoviesByGenreWithLoading.bind(
      this
    );
  }

  componentDidMount() {
    this.handleGetRandomMovieIds();
    setTimeout(() => this.handleGetMovies(), 800);
    setTimeout(() => this.handleGetRows(), 1200);
  }

  //Fetches movies using tmdb API and provided API key then stores it in state
  handleGetMovies() {
    var randomMovies = this.state.randomMovieIds;
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

    this.setState({ newMovies: newMoviesArray, isLoading: false });
    console.log("movies from get movie: ", this.state.movies);
  }

  // Makes array of array of objects based on length of movies array. Each row contains array with 3 movie objects
  handleMakeRow(movies: object[]) {
    var numOfRows = movies.length / 3;
    var arraysOfRows = [];
    var start = 0;
    var end = 3;
    var i;

    for (i = 0; i < numOfRows; i++) {
      arraysOfRows.push(movies.slice(start, end));
      start = start + 3;
      end = end + 3;
    }
    return arraysOfRows;
  }

  // Using handleMakeRow function creates rows of movies in state that are rendered
  handleGetRows() {
    const { newMovies } = this.state;
    const newRows = this.handleMakeRow(newMovies);

    this.setState({ rows: newRows });
  }

  handleGetYear(date: Date) {
    var newDate = new Date(date);
    var year = newDate.getFullYear();

    return year;
  }

  // Creates array of random numbers that are used as movie ids in fetching new movies
  handleGetRandomMovieIds() {
    var randomMovies = [];
    var randomNum;
    var i;
    for (i = 0; i < 12; i++) {
      randomNum = Math.floor(Math.random() * Math.floor(85550));
      randomMovies.push(randomNum);
    }
    this.setState({ randomMovieIds: randomMovies });
  }

  // Adds more movies in movie state array
  handleGetMoreMovies() {
    this.handleGetRandomMovieIds();
    setTimeout(() => this.handleGetMovies(), 800);
    setTimeout(() => this.handleGetRows(), 1200);
  }

  // Opens or closes Roulette modal
  showModal() {
    var visiblity = this.state.modalVisible;
    this.setState({ modalVisible: !visiblity });
  }

  // Fetches movies using tmdb API filtered by genre and stores them in state
  handleGetMoviesByGenre(genre: string) {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=${genre}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ newMovies: data.results, modalVisible: false });
        console.log("data from genre: ", data.results);
      });
    setTimeout(() => this.handleGetRows(), 1200);
    this.setState({ isLoading: false });
  }

  handleGetMoviesByGenreWithLoading(genre: string) {
    this.setState({ isLoading: true });
    setTimeout(() => this.handleGetMoviesByGenre(genre), 300);
  }

  render() {
    const { rows, modalVisible, isLoading } = this.state;
    const loadingRows = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    return (
      <div className="layout">
        <div className="layout-core">
          <HeaderBar title="Movie API" />
          {isLoading
            ? loadingRows.map((loadRow) => (
                <div className="flex-container">
                  {loadRow.map((load) => (
                    <Loading key={load} />
                  ))}
                </div>
              ))
            : rows.map((row: any) => (
                <div className="flex-container">
                  {row.map((movie: any) => (
                    <Link
                      to={{
                        pathname: `/details/${movie.id}`,
                        state: {
                          id: movie.id,
                          title: `${movie.original_title} (${this.handleGetYear(
                            movie.release_date
                          )})`,
                          description: movie.overview,
                          rating: movie.vote_average,
                          popularity: movie.popularity,
                          language: movie.original_language,
                          prod_companies: movie.production_companies,
                          src:
                            movie.backdrop_path === null
                              ? NoDetailsImage
                              : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
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
                            ? NoCardImage
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
              onClick={this.handleGetMoreMovies}
            />
            <RoundButton
              icon={Shuffle}
              name="shuffle"
              onClick={this.showModal}
            />
          </div>
          <MovieRoulleteModal
            show={modalVisible}
            handleClose={this.showModal}
            rollButtonClick={(genre: string) =>
              this.handleGetMoviesByGenreWithLoading(genre)
            }
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
