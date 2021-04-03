import React from 'react';
import './Avatar.scss';
import PropTypes from 'prop-types';

function Avatar(props) {
    return (
        <div className="Avatar">
            {<img src={props.img} alt="Avatar" className="avatar_image" />}
        </div>
    )
}

Avatar.propTypes = {
    img: PropTypes.string.isRequired,
};

export default Avatar
