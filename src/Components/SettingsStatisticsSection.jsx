import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SettingStatisticsSection = () => {
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  useEffect(() => {
    // Fetch data for daily, weekly, monthly, and yearly revenue
    const fetchData = async () => {
      try {
        // Simulating data fetch with mock data
        const mockData = () => Math.floor(Math.random() * 1000);

        setDailyRevenue(mockData());
        setWeeklyRevenue(Array.from({ length: 7 }, () => ({ day: 'Day', revenue: mockData() })));
        setMonthlyRevenue(Array.from({ length: 30 }, () => ({ day: 'Day', revenue: mockData() })));
        setYearlyRevenue(mockData());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const commonChartProps = {
    width: '100%',
    height: 200,
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Ganancias obtenidas</h2>

      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Ganancia del día</h3>
          <ResponsiveContainer {...commonChartProps}>
            <BarChart data={[{ day: 'Day', revenue: dailyRevenue }]}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Revenue</h3>
          <ResponsiveContainer {...commonChartProps}>
            <BarChart data={weeklyRevenue}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
          <ResponsiveContainer {...commonChartProps}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Yearly Revenue</h3>
          <ResponsiveContainer {...commonChartProps}>
            <BarChart data={[{ year: 'Year', revenue: yearlyRevenue }]}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default SettingStatisticsSection;
