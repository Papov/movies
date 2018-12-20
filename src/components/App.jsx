import React from "react";
import { Header } from "./header/Header";
import { CallApi } from "../api/api";
import { LoginModal } from "../components/modals/LoginModal";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

const cookies = new Cookies();
export const AppContext = React.createContext();

export class App extends React.Component {
	state = {
		user: null,
		session_id: null,
		showLoginForm: false,
		favorite: [],
		watchlist: []
	};

	updateAddedMovie = listName => {
		const { user, session_id } = this.state;
		const moviesId = [];
		let page = 1;
		const getAddedMovies = async () => {
			const responseApi = await CallApi.get(
				`/account/${user.id}/${listName}/movies`,
				{
					params: {
						language: "ru-RU",
						session_id: session_id,
						page: page
					}
				}
			);
			moviesId.push(...responseApi.results.map(item => item.id));
			if (responseApi.total_pages > page) {
				page++;
				getAddedMovies();
			} else {
				this.setState({
					[listName]: moviesId
				});
			}
		};
		getAddedMovies();
	};

	updateUser = user => {
		this.setState({
			user
		});
	};

	onLogOut = () => {
		cookies.remove("session_id", {
			path: "/"
		});
		this.setState({
			user: null,
			session_id: null
		});
	};

	toogleLoginForm = () => {
		this.setState(prevState => ({
			showLoginForm: !prevState.showLoginForm
		}));
	};

	updateSessionId = session_id => {
		this.setState({
			session_id
		});
		cookies.set("session_id", session_id, {
			path: "/",
			expires: new Date(Date.now() + 2592000)
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.user !== this.state.user) {
			if (this.state.user) {
				this.updateAddedMovie("watchlist");
				this.updateAddedMovie("favorite");
			} else if (!this.state.user) {
				this.setState({
					favorite: [],
					watchlist: []
				});
			}
		}
	}

	async componentDidMount() {
		const session_id = cookies.get("session_id");
		if (session_id) {
			const user = await CallApi.get("/account", {
				params: {
					session_id: session_id
				}
			});
			this.setState({
				user,
				session_id
			});
		}
	}

	render() {
		const { user, session_id, showLoginForm, watchlist, favorite } = this.state;
		return (
			<Router>
				<AppContext.Provider
					value={{
						user: user,
						session_id: session_id,
						updateSessionId: this.updateSessionId,
						updateUser: this.updateUser,
						onLogOut: this.onLogOut,
						toogleLoginForm: this.toogleLoginForm,
						updateAddedMovie: this.updateAddedMovie,
						watchlist: watchlist,
						favorite: favorite
					}}
				>
					<Header user={user} toogleLoginForm={this.toogleLoginForm} />
					<Route exact path="/" component={MoviesPage} />
					<Route path="/movie/:id" component={MoviePage} />
					{showLoginForm && (
						<LoginModal
							showLoginForm={showLoginForm}
							toogleLoginForm={this.toogleLoginForm}
						/>
					)}
				</AppContext.Provider>
			</Router>
		);
	}
}
