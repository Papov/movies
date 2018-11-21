import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

export default class Pagination extends PureComponent {
  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number,
    total_pages: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  render() {
    const { onChangePage, page, total_pages } = this.props;
    console.log("pagination");
    return (
      <Fragment>
        <div className="btn-group d-flex justify-content-center">
          {/*КНОПКА НАЗАД*/}
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          {/*КНОПКА ВПЕРЕД*/}
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        {/*ТЕКУЩАЯ СТРАНИЦА И ОБЩЕЕ КОЛИЧЕСТВО*/}
        <div className="mt-4 text-center">{`${page} of ${total_pages}`}</div>
      </Fragment>
    );
  }
}
