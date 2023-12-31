import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { PoweroffOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const SettingsEnableSection = () => {
  const [isActive, setIsActive] = useState(true); // Mock value for the service status

  const openNotification = (type) => {
    const message = isActive ? 'Aplicación desactivada' : 'Aplicación activada';
    notification[type]({
      message,
      duration: 2,
    });
  };

  const handleToggleService = () => {
    // Mock API call to toggle service status
    // In a real scenario, you would replace this with an actual API call
    setTimeout(() => {
      setIsActive((prevStatus) => !prevStatus);
      // Mock success message
      openNotification('success');
    }, 500); // Simulating a delay for the API call
  };

  return (
    <div className="settings-enable-section" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h2 className="text-2xl font-semibold mb-4">Estado de la Aplicación</h2>
      
      <div className="status-indicator" style={{ color: isActive ? 'green' : 'red', fontSize: '24px', marginBottom: '10px' }}>
        {isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        <span style={{ marginLeft: '8px' }}>{isActive ? 'Activo' : 'Inactivo'}</span>
      </div>

      <Button
        type="primary"
        size="large"
        onClick={handleToggleService}
        icon={<PoweroffOutlined />}
        style={{ width: '200px' }}
      >
        {isActive ? 'Desactivar' : 'Activar'}
      </Button>
    </div>
  );
};

export default SettingsEnableSection;
