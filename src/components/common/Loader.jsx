import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ 
  size = 'medium', 
  color = 'primary',
  className = '',
  text = 'Loading...'
}) => {
  const baseClasses = 'loader';
  const sizeClass = `loader-${size}`;
  const colorClass = `loader-${color}`;
  
  return (
    <div className={`${baseClasses} ${sizeClass} ${colorClass} ${className}`}>
      <div className="loader-spinner">
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
      {text && <div className="loader-text">{text}</div>}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  className: PropTypes.string,
  text: PropTypes.string
};

export default Loader;