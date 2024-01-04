import React from 'react';

const MusicCard = ({ track, onBuy }) => {
  return (
    <div className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition duration-300 mx-4">
      <img src={track.album.images[0].url} alt={track.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{track.name}</h3>
        <p className="text-gray-400">{track.artists[0].name}</p>
        {/*track.preview_url && (
          <div className="mt-2">
            <audio controls className="w-full">
              <source src={track.preview_url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )*/}
        <button
          onClick={onBuy}
          className="mt-2 inline-block bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Escuchar!
        </button>
      </div>
    </div>
  );
};

export default MusicCard;
