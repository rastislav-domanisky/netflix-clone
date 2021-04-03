import React, { useState } from "react";
import "./HomeScreen.scss";
import { connect } from "react-redux";
import { logIn, isUserSignedIn } from "../../lib/Auth";
import { useHistory } from "react-router-dom";
import * as actionTypes from "../../store/actions";
import { loadData } from "../../lib/Data";
import { useCookies } from 'react-cookie';

import MainBtn from "../../components/UI/MainBtn/MainBtn";
import Spinner from "../../components/UI/Spinner/Spinner";
import AdItem from "../../components/AdItem/AdItem";

import LogoAsset from "../../assets/logo.svg";
import BgHomeAsset from "../../assets/bg_home.jpg";
import ImgTV from "../../assets/home-tv.jpg";
import ImgMobile from "../../assets/home-mobile.jpg";
import ImgImac from "../../assets/home-imac.jpg";

function HomeScreen(props) {

  const history = useHistory();

  const [cookies, setCookie] = useCookies([]);

  let lang = "en";
  if(cookies.lang) {
    lang = cookies.lang;
  }

  const handleLogIn = async () => {
    await logIn();
    const result = isUserSignedIn();
    if (result) {
      history.push("/");
    }
  };

  const [state, setState] = useState({
    lang: lang,
  });

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

  const initData = async (lng) => {
    setCookie('lang', lng, { path: '/' });
    const result = await loadData(lng);
    setState((current) => {
      return {
        ...current,
        lang: lng,
      };
    });
    props.onInitData(result);
  };

  const strings = props.data.home_screen;

  return (
    <div className="HomeScreen">
      <section
        style={{
          backgroundImage: "url(" + BgHomeAsset + ")",
        }}
      >
        <div className="dark">
          <div className="top">
            <img src={LogoAsset} alt="Netflix Logo" className="logo" />
            <select
              name="langSelect"
              className="lang-select"
              id="langSelect"
              value={state.lang}
              onChange={(event) => {
                initData(event.target.value);
              }}
            >
              <option value="sk">SK</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div className="heading">
            <p>{strings.welcome}</p>
            <h1>{strings.heading}</h1>
            <p>{strings.param}</p>
            <MainBtn text={strings.btn} onPress={handleLogIn} />
          </div>
        </div>
      </section>
      <div className="adList">
        <AdItem
          heading={strings.adItems[0].heading}
          text={strings.adItems[0].param}
          image={ImgTV}
        />
        <AdItem
          heading={strings.adItems[1].heading}
          text={strings.adItems[1].param}
          image={ImgMobile}
          isReversed
        />
        <AdItem
          heading={strings.adItems[2].heading}
          text={strings.adItems[2].param}
          image={ImgImac}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isDataLoaded: state.isDataLoaded,
    data: state.data,
    isError: state.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitData: (data) =>
      dispatch({ type: actionTypes.LOAD_DATA, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
