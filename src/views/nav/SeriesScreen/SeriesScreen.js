import React, { useState, useEffect } from "react";
import "./SeriesScreen.scss";
import { loadMedia } from "../../../lib/Data";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import MediaList from "../../../components/MediaList/MediaList";

import { filterByCategory } from "../../../lib/Filters";
import { sortByRate } from "../../../lib/Sorters";

function SeriesScreen(props) {
  const [state, setState] = useState({
    media: [],
    isLoaded: false,
  });

  const getMedia = async () => {
    const media = await loadMedia();
    setState((current) => {
      return {
        ...current,
        isLoaded: true,
        media: [...media],
      };
    });
  };

  useEffect(() => {
    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isLoaded) {
    return (
      <div className="SeriesScreenLoading">
        <Spinner />
      </div>
    );
  }

  const strings = props.data?.series_screen;

  return (
    <div className="SeriesScreen">
      <h1>{strings?.heading}</h1>
        <MediaList media={sortByRate(filterByCategory(state.media, "series"))} title={strings.recommended} />
        <MediaList media={filterByCategory(state.media, "series")} title={strings.others} />
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

export default connect(mapStateToProps)(SeriesScreen);
