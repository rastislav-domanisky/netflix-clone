import React from 'react'
import './MainBtn.scss';
import PropTypes from 'prop-types';

export default function MainBtn(props) {
    return (
        <div className="MainBtn" onClick={props.onPress}>
            {props.text}
        </div>
    )
}

MainBtn.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
}
