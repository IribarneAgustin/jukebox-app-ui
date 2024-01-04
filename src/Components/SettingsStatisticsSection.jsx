import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MonthlyBarChart from './MonthlyBarChart';

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
    <MonthlyBarChart></MonthlyBarChart>
  );
};

export default SettingStatisticsSection;
