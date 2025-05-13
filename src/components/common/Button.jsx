import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  children,
  className = '',
  ...props 
}) => {
  const baseClasses = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  
  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label || children}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Button;