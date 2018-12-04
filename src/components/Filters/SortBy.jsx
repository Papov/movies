import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UI/UISelect";
import FilterConsumer from "../../HOC/FilterConsumer";

class SortBy extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };

  render() {
    const {
      onChangeFilters,
      filters: { sort_by },
      options
    } = this.props;
    // console.log("sortBy");
    return (
      <UISelect
        label="Сортировать по:"
        id="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
        name="sort_by"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}

export default FilterConsumer(SortBy);
