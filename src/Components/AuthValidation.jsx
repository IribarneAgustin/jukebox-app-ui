import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const authValidation = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is authenticated by making a request to a protected endpoint
      const isAuthenticated = checkAuthentication(navigate);

      if (!isAuthenticated) {
        navigate('/admin/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  const checkAuthentication = async (navigate) => {
    try {
      const response = await fetch('/api/test/test', {
        method: 'GET',
        credentials: 'include', 
      });

      if (response.ok) {
        return true;
      } else if (response.status === 403) {
        navigate('/admin/login');
        return false;
      } else {
        console.error('Error checking authentication:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };

  return AuthWrapper;
};

export default authValidation;
