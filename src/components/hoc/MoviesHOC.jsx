import React from "react";
import { CallApi } from "../../api/api";
import PropTypes from "prop-types";

export const MoviesHOC = Component =>
  class MoviesHOC extends React.Component {
    static propTypes = {
      getTotalPages: PropTypes.func.isRequired,
      onChangePage: PropTypes.func.isRequired,
      filters: PropTypes.object.isRequired,
      page: PropTypes.number
    };

    state = {
      movies: [],
      isLoading: false
    };

    getMovies = async (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      let queryParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };
      if (with_genres.length > 0) {
        queryParams.with_genres = with_genres.join(",");
      }
      this.setState({ isLoading: true });
      const discover = await CallApi.get("/discover/movie", {
        params: queryParams
      });
      this.setState({
        movies: discover.results,
        isLoading: false
      });
      this.props.getTotalPages(discover.total_pages);
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
      if (this.props.filters !== prevProps.filters) {
        this.props.onChangePage(1);
        this.getMovies(this.props.filters, 1);
      }
      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }
    }

    render() {
      const { movies, isLoading } = this.state;
      return <Component movies={movies} isLoading={isLoading} />;
    }
  };
