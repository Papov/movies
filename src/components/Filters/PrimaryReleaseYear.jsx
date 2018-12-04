import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UI/UISelect";
import FilterConsumer from "../../HOC/FilterConsumer";

class PrimaryReleaseYear extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
  };

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
    const {
      years,
      filters: { primary_release_year },
      onChangeFilters
    } = this.props;
    // console.log("year");
    return (
      <UISelect
        id="primary_release_year"
        label="Год релиза:"
        value={primary_release_year}
        onChange={onChangeFilters}
        name="primary_release_year"
      >
        {years.map(year => (
          <option key={`year${year.value}`} value={year.value}>
            {year.label}
          </option>
        ))}
      </UISelect>
    );
  }
}

export default FilterConsumer(PrimaryReleaseYear);
