import React, { Component, Fragment } from "react";

export default class Pagination extends Component {
  render() {
    const { onChangePage, page, total_pages } = this.props;
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
