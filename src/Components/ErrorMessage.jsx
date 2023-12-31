import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/ErrorMessage.css"

const ErrorMessage = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('ErrorMessage component mounted');
    const params = new URLSearchParams(location.search);
    const messageParam = params.get('message');
    
    if (messageParam) {
      setErrorMessage(messageParam);
    }
  }, [location.search]);
  

  return (
    <div className="error-container">
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
