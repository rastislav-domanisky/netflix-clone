import React, { useState, useEffect } from "react";
import "./MediaDetailsScreen.scss";
import { loadMediaData, isInList, addToMyList, removeFromMyList } from "../../lib/Data";

import Spinner from "../../components/UI/Spinner/Spinner";
import IconBtn from "../../components/UI/IconBtn/IconBtn";

import PlayIcon from "../../assets/icons/play.svg";
import AddIcon from "../../assets/icons/add.svg";
import RemoveIcon from "../../assets/icons/remove.svg";

function MediaDetailsScreen(props) {
  const [state, setState] = useState({
    isLoaded: false,
    isError: false,
    data: null,
    isInList: false,
  });

  const getData = async () => {
    const data = await loadMediaData(props.match.params.id);
    const isInMyList = await isInList(props.match.params.id);

    setState((current) => {
      return {
        ...current,
        isLoaded: true,
        isError: !data.exists,
        data: data.data(),
        isInList: isInMyList,
      };
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleList = () => {
    if (state.isInList) {
      setState((current) => {
        return {
          ...current,
          isInList: false,
        };
      });
      removeFromMyList(props.match.params.id);
    } else {
      setState((current) => {
        return {
          ...current,
          isInList: true,
        };
      });
      addToMyList(props.match.params.id);
    }
  };

  if (!state.isLoaded) {
    return (
      <div className="MediaDetailsScreenLoading">
        <Spinner />
      </div>
    );
  }

  if (state.isError || state.data === null) {
    return (
      <div className="MediaDetailsScreenLoading">
        <p>404</p>
        <p>Are you lost?</p>
      </div>
    );
  }

  return (
    <div className="MediaDetailsScreen">
      <div className="info">
        <img src={state.data.img} alt={state.data.name} className="img" />
        <h1>{state.data.name}</h1>
        <p>
          Some description about movie or TV shows. Text about actors and
          production.
        </p>
        <div className="controlls">
          <IconBtn
            icon={PlayIcon}
            onPress={() => {}}
            color="#FFF"
            text="Play"
          />
          <IconBtn
            icon={state.isInList ? RemoveIcon : AddIcon}
            onPress={handleList}
            color="#666"
            text="My List"
          />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default MediaDetailsScreen;
