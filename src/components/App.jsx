import React from "react";
import { Header } from "./header/Header";
import { LoginModal } from "../components/modals/LoginModal";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";

export const AppContext = React.createContext();

@inject(({ userStore }) => ({
  user: userStore.user,
  session_id: userStore.session_id,
  showLoginForm: userStore.showLoginForm,
  watchlist: userStore.watchlist,
  favorite: userStore.favorite,
  updateSessionId: userStore.updateSessionId,
  updateUser: userStore.updateUser,
  onLogOut: userStore.onLogOut,
  toogleLoginForm: userStore.toogleLoginForm,
  updateAddedMovie: userStore.updateAddedMovie,
  getSessionIdFromCookie: userStore.getSessionIdFromCookie
}))
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.getSessionIdFromCookie();
  }

  render() {
    const {
      toogleLoginForm,
      updateAddedMovie,
      updateSessionId,
      onLogOut,
      updateUser,
      user,
      session_id,
      showLoginForm,
      watchlist,
      favorite
    } = this.props;
    return (
      <Router>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            updateSessionId: updateSessionId,
            updateUser: updateUser,
            onLogOut: onLogOut,
            toogleLoginForm: toogleLoginForm,
            updateAddedMovie: updateAddedMovie,
            watchlist: watchlist,
            favorite: favorite
          }}
        >
          <Header user={user} toogleLoginForm={toogleLoginForm} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          {showLoginForm && (
            <LoginModal
              showLoginForm={showLoginForm}
              toogleLoginForm={toogleLoginForm}
            />
          )}
        </AppContext.Provider>
      </Router>
    );
  }
}

export { App };
