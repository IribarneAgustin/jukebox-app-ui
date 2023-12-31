import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const redirectURL = new URL('http://localhost:8080/spotify/login');

  useEffect(() => {
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    const alertFromURL = getUrlParameter('error');
    if (alertFromURL) {
      setAlertMessage(decodeURIComponent(alertFromURL));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        console.log('Login successful');
        window.location.href = redirectURL;
      } else if (response.status === 401) {
        setAlertMessage('Usuario o contraseña inválidos');
      } else {
        console.log('Login failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full">
        {alertMessage && (
          <div className="bg-red-500 text-white p-3 mb-4 flex items-center justify-center">
            <span className="mr-2">Error:</span>
            {alertMessage}
          </div>
        )}
        <div className="bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">JukeboxApp</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="border border-gray-700 rounded-md p-2 w-full mb-4 bg-gray-600 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="border border-gray-700 rounded-md p-2 w-full mb-4 bg-gray-600 text-white focus:outline-none focus:border-blue-500"
          />
          <div className="text-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
