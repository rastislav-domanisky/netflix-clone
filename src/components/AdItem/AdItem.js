import React from 'react';
import './AdItem.scss';
import PropTypes from 'prop-types';

function AdItem(props) {
    return (
        <div className={props.isReversed ? "AdItem reversed" : "AdItem"}>
            <div className="left">
                <h3 className="adH">{props.heading}</h3>
                <p className="adP">{props.text}</p>
            </div>
            <div className="right">
                <img src={props.image} alt="NetflixImage" className="image" />
            </div>
        </div>
    )
}

AdItem.propTypes = {
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isReversed: PropTypes.bool,
};

export default AdItem
