import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const PaymentHistorySection = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  useEffect(() => {
    // Mock data for transaction history
    const mockData = Array.from({ length: 200 }, (_, index) => ({
      key: index + 1,
      date: `2023-01-${index + 1}`,
      amount: Math.floor(Math.random() * 100),
    }));

    setTransactions(mockData);
  }, []);

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hora',
      dataIndex: 'hour',
      key: 'hour',
    },
    {
      title: 'Canción',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="mb-8">
      {/* Use the same background color as Ant Design Table */}
      <h2 className="text-2xl font-semibold mb-4">Historial de Pagos</h2>

      <Table
        style={{
          background: '#f0f2f5',
          borderRadius: '8px', // Set border-radius for rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Apply box-shadow for a subtle effect
        }}
        dataSource={currentTransactions}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: transactionsPerPage,
          total: transactions.length,
          onChange: handlePaginationChange,
          showSizeChanger: false,
        }}
      />
    </section>
  );
};

export default PaymentHistorySection;
