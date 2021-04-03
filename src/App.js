import React from "react";
import "./App.css";
import { loadData } from "./lib/Data";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions";
import { auth } from "./lib/firebase";
import { useCookies } from 'react-cookie';

import HomeScreen from "./views/HomeScreen/HomeScreen";
import MainScreen from "./views/MainScreen/MainScreen";

function App(props) {

  const [cookies] = useCookies([]);
  let lang = "en";
  if(cookies.lang) {
    lang = cookies.lang;
  }

  if (!props.isDataLoaded) {
    const initData = async () => {
      const result = await loadData(lang);
      props.onInitData(result);
    };

    auth.onAuthStateChanged((usr) => {
      if (usr) {
        props.onAuthChange(true);
      } else {
        props.onAuthChange(false);
      }
    });

    initData();
  }

  return (
    <div className="App">
      {props.isLoggedIn ? <MainScreen /> : <HomeScreen />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isDataLoaded: state.isDataLoaded,
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitData: (data) =>
      dispatch({ type: actionTypes.LOAD_DATA, payload: data }),
    onAuthChange: (data) =>
      dispatch({ type: actionTypes.UPDATE_LOGIN_STATE, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
