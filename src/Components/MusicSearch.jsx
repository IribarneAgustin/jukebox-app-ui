import React, { useState, useEffect } from 'react';
import UserLayout from './UserLayout';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "../assets/MusicSearch.css";

const MusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [preferenceId, setPreferenceId] = useState();

  initMercadoPago("TEST-c2a8b2c6-e634-44b6-b5af-7b150e92222f");

  const searchMusic = async () => {
    try {
      const response = await fetch(`/api/spotify/track/name=${searchQuery}`);
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  // Debouncing function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Debounced search function
  const debouncedSearch = debounce(searchMusic, 500);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, debouncedSearch]);

  const createPreference = async (track) => {
    
    const trackInfoDTO = {
      trackUri: track.uri,
      trackName: track.name,
      artistName: track.artists[0].name,
      albumCover: track.album.images[0].url
    };

    try {
      const response = await fetch("api/payment/generatePaymentId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackInfoDTO),
      });

      if (response.ok) {
        return response.text();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleBuy = async (track) => {
    const id = await createPreference(track);
    if (id) {
      setPreferenceId(id);
  
      // Open Mercado Pago payment interface in the same window
      const paymentUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${id}`;
      window.location.href = paymentUrl;
    }
  };
  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <UserLayout>
      <div className="container mx-auto my-8 text-center">
      <h1 className="text-5xl font-extrabold mb-4 custom-bounce">Jukebox App</h1>

        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300">
          <input
            type="text"
            placeholder="Buscá una canción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-700 rounded-md p-2 w-full mb-4 bg-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={searchMusic}
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Buscar
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {tracks.map((track) => (
            <div key={track.id} className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition duration-300 mx-4"> {/* Added mx-4 for left and right margin */}
              <img src={track.album.images[0].url} alt={track.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{track.name}</h3>
                <p className="text-gray-400">{track.artists[0].name}</p>
                {track.preview_url && (
                  <div className="mt-2">
                    <audio controls className="w-full">
                      <source src={track.preview_url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                <button
                  onClick={() => handleBuy(track)}
                  className="mt-2 inline-block bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                >
                  Escuchar!
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {preferenceId && (
          <div className="mt-6">
            <Wallet initialization={{ preferenceId }} />
          </div>
        )}
      </div>
      </UserLayout>
    </div>
  );
  
  
};

export default MusicSearch;
