import React, { Component } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const style = {
  card: {
    width: "100%"
  }
};

export default class App extends Component {
  state = {
    filters: {
      sort_by: "popularity.desc"
    },
    page: 1,
    total_pages: "..."
  };

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    }));
  };

  getTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={style.card}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  page={page}
                  onChangePage={this.onChangePage}
                  total_pages={total_pages}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              getTotalPages={this.getTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
