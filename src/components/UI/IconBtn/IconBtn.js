import React from "react";
import "./IconBtn.scss";
import PropTypes from "prop-types";

function IconBtn(props) {
  return (
    <div
      className="IconBtn"
      onClick={props.onPress}
      style={{ backgroundColor: props.color }}
    >
      <div className="wrapper">
        <img src={props.icon} alt="Icon" className="icon" />
        <p className="txt">{props?.text}</p>
      </div>
    </div>
  );
}

IconBtn.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default IconBtn;
