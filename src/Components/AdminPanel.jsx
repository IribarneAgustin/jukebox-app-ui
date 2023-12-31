import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import Sidebar from './Sidebar';
import SettingStatisticsSection from './SettingsStatisticsSection';
import SettingsPriceSection from './SettingsPriceSection';
import SettingsScheduleSection from './SettingsScheduleSection'
import SettingsInstructionsSection from './SettingsInstructionsSection';
import SettingsPlaylistIdSection from './SettingsPlaylistIDSection';
import PaymentHistorySection from './PaymentHistorySection';
import SettingsEnableSection from './SettingsEnableSection'
import SupportSection from './SupportSection'


const AdminPanel = () => {
    const [currentSection, setCurrentSection] = useState('SettingsInstructionsSection');
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(document.cookie);

                // Fetch data from the "/test" endpoint
                const response = await fetch('/api/test/test', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.text();
                    setResponse(data);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    const renderSection = () => {
        switch (currentSection) {
            case 'SettingsInstructionsSection':
                return <SettingsInstructionsSection />;
            case 'SettingsPlaylistIdSection':
                return <SettingsPlaylistIdSection />;
            case 'SettingsPriceSection':
                return <SettingsPriceSection />;
            case 'SettingsScheduleSection':
                return <SettingsScheduleSection />;
            case 'SettingStatisticsSection':
                return <SettingStatisticsSection />;
            case 'PaymentHistorySection':
                return <PaymentHistorySection />;
            case 'SettingsEnableSection':
                return <SettingsEnableSection />
            case 'SupportSection':
                 return <SupportSection />
            default:
                return null;
        }
    };

    return (
        <>
            {/* Navigation */}
            <AdminNavBar setCurrentSection={setCurrentSection} />
            <div className="bg-gray-800 h-screen text-white font-sans">


                {/* Main Content */}
                <div className="flex h-full">
                    {/* Sidebar */}
                    <Sidebar setCurrentSection={setCurrentSection} />

                    {/* Main Content Area */}
                    <div className="w-3/4 p-4">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </>);
};

export default AdminPanel;
