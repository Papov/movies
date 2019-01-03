import React from "react";
import { Header } from "./header/Header";
import { LoginModal } from "../components/modals/LoginModal";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject(({ userStore, loginFormStore }) => ({
  showLoginForm: loginFormStore.showLoginForm,
  getSessionIdFromCookie: userStore.getSessionIdFromCookie
}))
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.getSessionIdFromCookie();
  }
  render() {
    const { showLoginForm } = this.props;
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          {showLoginForm && <LoginModal />}
        </React.Fragment>
      </Router>
    );
  }
}

export { App };
