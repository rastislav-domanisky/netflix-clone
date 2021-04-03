import React, { useState } from "react";
import "./MainScreen.scss";
import { getCurrentUser } from "../../lib/Auth";
import { auth } from "../../lib/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";

import Avatar from "../../components/UI/Avatar/Avatar";
import Spinner from "../../components/UI/Spinner/Spinner";

import LogoAsset from "../../assets/logo.svg";
import DownIcon from "../../assets/icons/down.svg";
import MenuLogo from "../../assets/icons/menu.svg";

import TrendingScreen from "../nav/TrendingScreen/TrendingScreen";
import MoviesScreen from "../nav/MoviesScreen/MoviesScreen";
import SeriesScreen from "../nav/SeriesScreen/SeriesScreen";
import MediaDetailsScreen from "../MediaDetailsScreen/MediaDetailsScreen";
import MyListScreen from "../nav/MyListScreen/MyListScreen";

function MainScreen(props) {
  const [state, setState] = useState({
    isMenuOpened: false,
    isNavOpened: false,
  });

  const user = getCurrentUser();

  const handleLogOut = async () => {
    await auth.signOut();
  };

  const toggleMenu = () => {
    setState((current) => {
      return {
        ...current,
        isMenuOpened: !current.isMenuOpened,
      };
    });
  };

  const toggleNav = () => {
    setState((current) => {
      return {
        ...current,
        isNavOpened: !current.isNavOpened,
      };
    });
  };

  if (props.isError) {
    return (
      <div className="HomeScreenLoading">
        <img src={LogoAsset} alt="Netflix Logo" className="logoLoading" />
        <p className="errMsg">Something is wrong</p>
      </div>
    );
  }

  if (!props.isDataLoaded || props.data === null) {
    return (
      <div className="HomeScreenLoading">
        <img src={LogoAsset} alt="Netflix Logo" className="logoLoading" />
        <Spinner />
      </div>
    );
  }

  const strings = props.data.main_screen;

  return (
    <div className="MainScreen">
      <Router>
        {state.isNavOpened ? (
          <div className="dropdown-menu">
            <div className="a">
              <Link to="/" onClick={toggleNav}>{strings.nav.trending}</Link>
            </div>
            <div className="a">
              <Link to="/movies" onClick={toggleNav}>{strings.nav.movies}</Link>
            </div>
            <div className="a">
              <Link to="/series" onClick={toggleNav}>{strings.nav.series}</Link>
            </div>
            <div className="a">
              <Link to="/list" onClick={toggleNav}>{strings.nav.list}</Link>
            </div>
          </div>
        ) : null}
        <header>
          <img
            src={MenuLogo}
            onClick={toggleNav}
            alt="menu"
            className="menu-icon"
          />
          <div className="left">
            <img src={LogoAsset} alt="Netflix" className="logo" />
            <nav>
              <Link to="/">{strings.nav.trending}</Link>
              <Link to="/movies">{strings.nav.movies}</Link>
              <Link to="/series">{strings.nav.series}</Link>
              <Link to="/list">{strings.nav.list}</Link>
            </nav>
          </div>
          <div className="right">
            <div className="usrBtn" onClick={toggleMenu}>
              <Avatar img={user.photoURL} />
              <p className="usrName">{user.displayName}</p>
              <img
                src={DownIcon}
                alt="down"
                className={state.isMenuOpened ? "down rotate" : "down"}
              />
            </div>
            <div
              className={state.isMenuOpened ? "usr-menu opened" : "usr-menu"}
            >
              <div className="menu-btn">{user.displayName}</div>
              <div className="menu-btn" onClick={handleLogOut}>
                {strings.signOut}
              </div>
            </div>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/list" component={MyListScreen} exact />
            <Route path="/movies" component={MoviesScreen} exact />
            <Route path="/series" component={SeriesScreen} exact />
            <Route path="/media/:id" component={MediaDetailsScreen} exact />
            <Route path="/" component={TrendingScreen} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isDataLoaded: state.isDataLoaded,
    data: state.data,
    isError: state.isError,
    lang: state.lang,
  };
};

export default connect(mapStateToProps)(MainScreen);
