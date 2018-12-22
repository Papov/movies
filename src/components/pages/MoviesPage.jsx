import React from "react";
import { Filters } from "../filters/Filters";
import MoviesList from "../movies/MoviesList";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark as solidFaBookmark,
  faHeart as solidFaHeart
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faBookmark, faHeart, solidFaBookmark, solidFaHeart);

class MoviesPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
