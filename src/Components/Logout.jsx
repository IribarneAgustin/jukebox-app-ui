import React, { useState } from 'react';

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setLogoutMessage('Logged out successfully');
      } else {
        setLogoutMessage('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setLogoutMessage('Error during logout');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{logoutMessage}</p>
    </div>
  );
};

export default Logout;
