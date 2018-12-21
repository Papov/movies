import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ movieStore }) => ({
  page: movieStore.page,
  total_pages: movieStore.total_pages,
  onChangePage: movieStore.onChangePage
}))
@observer
class Pagination extends React.Component {
  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number,
    total_pages: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  render() {
    const { onChangePage, page, total_pages } = this.props;
    //console.log("pagination");
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        <div className="mt-4 text-center">{`${page} of ${total_pages}`}</div>
      </React.Fragment>
    );
  }
}

export { Pagination };
