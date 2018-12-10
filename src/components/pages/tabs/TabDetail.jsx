import React from "react";
import { Table } from "reactstrap";
import { Loader } from "../../ui/UILoader";

export default class TabDetail extends React.Component {
  render() {
    const { movieData } = this.props;
    if (!movieData) {
      return <Loader />;
    }
    return (
      <Table className="container">
        <tbody>
          {movieData.status && (
            <tr>
              <th>Статус</th>
              <th>{movieData.status}</th>
            </tr>
          )}

          {movieData.release_date && (
            <tr>
              <th>Дата выхода</th>
              <th>{movieData.release_date}</th>
            </tr>
          )}

          {movieData.runtime && (
            <tr>
              <th>Продолжительность</th>
              <th>{`${movieData.runtime} минут`}</th>
            </tr>
          )}

          {movieData.original_language && (
            <tr>
              <th>Язык оригинала</th>
              <th>{movieData.original_language}</th>
            </tr>
          )}

          {movieData.production_countries.length && (
            <tr>
              <th>Страна</th>
              <th>{movieData.production_countries[0].name}</th>
            </tr>
          )}

          {movieData.budget && (
            <tr>
              <th>Бюджет</th>
              <th>{`${movieData.budget} $`}</th>
            </tr>
          )}

          {movieData.production_companies.length && (
            <tr>
              <th>Компания</th>
              <th>
                {movieData.production_companies.map(company => (
                  <React.Fragment key={`company${company.id}`}>
                    <span className="badge badge-secondary">
                      {company.name}
                    </span>
                    <br />
                  </React.Fragment>
                ))}
              </th>
            </tr>
          )}

          {movieData.genres.length && (
            <tr>
              <th>Жанр</th>
              <th>
                {movieData.genres.map(genre => (
                  <React.Fragment key={`genre${genre.id}`}>
                    <span className="badge badge-secondary">{genre.name}</span>
                    <br />
                  </React.Fragment>
                ))}
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
