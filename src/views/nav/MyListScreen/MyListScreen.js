import React, { useState, useEffect } from "react";
import "./MyListScreen.scss";
import { connect } from "react-redux";
import { getMyList, loadMediaData } from "../../../lib/Data";
import { useHistory } from "react-router-dom";

import Spinner from "../../../components/UI/Spinner/Spinner";

function MyListScreen(props) {
  const [state, setState] = useState({
    list: [],
    isLoaded: false,
  });

  const history = useHistory();

  const getMedia = async () => {
    const media = await getMyList();
    let myList = [];

    for (const el of media) {
      const info = await loadMediaData(el);
      myList.push(info);
    }

    setState((current) => {
      return {
        ...current,
        isLoaded: true,
        list: [...myList],
      };
    });
  };

  useEffect(() => {
    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoute = (id) => {
    history.push("/media/" + id);
  };

  if (!state.isLoaded) {
    return (
      <div className="MyListScreenLoading">
        <Spinner />
      </div>
    );
  }

  const renderItem = (item) => {
    const data = item.data();
    return (
      <div className="item" key={item.id}>
        <img src={data.img} alt={data.name} className="item-img" onClick={() => {
            handleRoute(item.id);
        }} />
      </div>
    );
  };

  const strings = props.data?.myList_screen;

  return (
    <div className="MyListScreen">
      <h1>{strings.heading}</h1>
      <div className="list">
        {state.list.map(el => renderItem(el))}
      </div>
      <footer></footer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    lang: state.lang,
  };
};

export default connect(mapStateToProps)(MyListScreen);
