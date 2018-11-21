import React, { Component } from "react";

export default class PrimaryReleaseYear extends Component {
  static defaultProps = {
    years: [
      {
        label: "Все года",
        value: ""
      },
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2017",
        value: "2017"
      },
      {
        label: "2016",
        value: "2016"
      },
      {
        label: "2015",
        value: "2015"
      }
    ]
  };
  render() {
    const { years, primary_release_year, onChangeFilters } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год релиза: </label>
        {/*ВЫБИРАЕМ ГОД РЕЛИЗА*/}
        <select
          id="primary_release_year"
          className="form-control"
          value={primary_release_year}
          onChange={onChangeFilters} /*МЕНЯЕМ СТЕЙТ РОДИТЕЛЯ, И ПЕРЕДЕНДЕРИМ ПО ВЫБРАНОМУ*/
          name="primary_release_year"
        >
          {years.map(year => (
            <option key={`year${year.value}`} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
