import React, { useState } from 'react';

const SettingsScheduleSection = () => {
  const [fromHour, setFromHour] = useState('');
  const [toHour, setToHour] = useState('');

  const handleFromHourChange = (event) => {
    setFromHour(event.target.value);
  };

  const handleToHourChange = (event) => {
    setToHour(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle the form submission logic here, for example, send the schedule to the server.
    console.log('Service schedule submitted:', { fromHour, toHour });
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Horario de funcionamiento</h2>
      <form onSubmit={handleSubmit} className="flex">
        <div className="mb-4 flex items-center">
          <label htmlFor="fromHour" className="block text-sm font-medium text-white-800 mr-2">
            Desde
          </label>
          <input
            type="time"
            id="fromHour"
            name="fromHour"
            value={fromHour}
            onChange={handleFromHourChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
          />
        </div>
        <div className="mb-4 ml-4 flex items-center">
          <label htmlFor="toHour" className="block text-sm font-medium text-white-800 mr-2">
            Hasta
          </label>
          <input
            type="time"
            id="toHour"
            name="toHour"
            value={toHour}
            onChange={handleToHourChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
          />
        </div>
        <div className="ml-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
};

export default SettingsScheduleSection;
