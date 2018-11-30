import React, { PureComponent } from "react";
import CallApi from "../api/api";
import PropTypes from "prop-types";

export default (Container) => class GenresHOC extends PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired
  };

  state = {
    genresList: []
  };

  componentDidMount() {
    const response = async () => {
      const data = await CallApi.get('/genre/movie/list',{
        params: {
          language: 'ru-RU'
        }
      })
      this.setState({
        genresList: data.genres
      });
    }
    response();
  }

  showAllGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  checkedGenges = event => {
    const value = event.target.checked
      ? [...this.props.with_genres, event.target.value]
      : this.props.with_genres.filter(genre => genre !== event.target.value);
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: value
      }
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;
    console.log("genres");
    return (
      <Container
        genresList={genresList}
        showAllGenres={this.showAllGenres}
        with_genres={with_genres}
        checkedGenges={this.checkedGenges}
      />
    );
  }
}
