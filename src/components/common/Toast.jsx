import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';
import './Toast.css';

const Toast = ({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 5000,
  className = '' 
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const baseClasses = 'toast';
  const typeClass = `toast-${type}`;
  
  return (
    <div className={`${baseClasses} ${typeClass} ${className}`}>
      <div className="toast-content">
        {message}
      </div>
      {onClose && (
        <button 
          className="toast-close" 
          onClick={onClose}
          aria-label="Close notification"
        >
          <BsX size={20} />
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func,
  duration: PropTypes.number,
  className: PropTypes.string
};

export default Toast;