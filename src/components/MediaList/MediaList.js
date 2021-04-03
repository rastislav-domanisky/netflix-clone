import React from "react";
import "./MediaList.scss";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

function MediaList(props) {

  const history = useHistory();

  const handleRoute = (id) => {
    history.push("/media/" + id);
  };

  const renderItem = (item) => {
      return (
          <div className="item" key={item.id}>
              <img src={item.data().img} alt={item.data().name} className="item-img" onClick={() => {
                handleRoute(item.id);
              }} />
          </div>
      );
  };

  return (
    <div className="MediaList">
      <h3>{props.title}</h3>
      <div className="list">
          {props.media.map((el) => renderItem(el))}
      </div>
    </div>
  );
}

MediaList.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
};

export default MediaList;
