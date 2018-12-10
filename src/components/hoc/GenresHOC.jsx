import React from "react";
import { CallApi } from "../../api/api";
import PropTypes from "prop-types";

export const GenresHOC = Container =>
  class GenresHOC extends React.PureComponent {
    static propTypes = {
      onChangeFilters: PropTypes.func.isRequired
    };

    state = {
      genresList: []
    };

    componentDidMount() {
      const response = async () => {
        const data = await CallApi.get("/genre/movie/list", {
          params: {
            language: "ru-RU"
          }
        });
        this.setState({
          genresList: data.genres
        });
      };
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
      const {
        filters: { with_genres }
      } = this.props;
      const value = event.target.checked
        ? [...with_genres, event.target.value]
        : with_genres.filter(genre => genre !== event.target.value);
      this.props.onChangeFilters({
        target: {
          name: "with_genres",
          value: value
        }
      });
    };

    render() {
      const { genresList } = this.state;
      const {
        filters: { with_genres }
      } = this.props;
      //console.log("genres");
      return (
        <Container
          genresList={genresList}
          showAllGenres={this.showAllGenres}
          with_genres={with_genres}
          checkedGenges={this.checkedGenges}
        />
      );
    }
  };
