import React, { useState } from 'react';
import { BarChart3, Download, Filter } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('inventory');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { id: 'inventory', name: 'Inventory Report', description: 'Current stock levels and product details' },
    { id: 'lowstock', name: 'Low Stock Report', description: 'Products below minimum stock levels' },
    { id: 'movement', name: 'Stock Movement', description: 'Track stock in/out transactions' },
    { id: 'value', name: 'Inventory Value', description: 'Total inventory value by category' },
  ];

  const sampleData = {
    inventory: [
      { sku: 'WH-001', name: 'Wireless Headphones', category: 'Electronics', stock: 45, value: 4499.55 },
      { sku: 'UC-002', name: 'USB Cable', category: 'Accessories', stock: 5, value: 64.95 },
      { sku: 'LS-003', name: 'Laptop Stand', category: 'Accessories', stock: 12, value: 599.88 },
    ],
    lowstock: [
      { sku: 'UC-002', name: 'USB Cable', current: 5, minimum: 10, shortage: 5 },
      { sku: 'PC-005', name: 'Phone Case', current: 3, minimum: 15, shortage: 12 },
    ],
    movement: [
      { date: '2024-01-15', product: 'Wireless Headphones', type: 'Stock In', quantity: 20, notes: 'New shipment' },
      { date: '2024-01-14', product: 'USB Cable', type: 'Stock Out', quantity: 5, notes: 'Sales order' },
    ],
    value: [
      { category: 'Electronics', products: 45, totalValue: 85420.50 },
      { category: 'Accessories', products: 23, totalValue: 12350.75 },
      { category: 'Furniture', products: 12, totalValue: 8500.00 },
    ]
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Report generated successfully!');
  };

  const handleExportReport = async (format) => {
    setLoading(true);
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert(`Report exported as ${format.toUpperCase()}!`);
  };

  const renderReportData = () => {
    const data = sampleData[selectedReport] || [];
    
    if (selectedReport === 'inventory') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedReport === 'lowstock') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Minimum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shortage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{item.current}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.minimum}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{item.shortage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedReport === 'movement') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === 'Stock In' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedReport === 'value') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.totalValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return <div className="text-center py-8 text-gray-500">No data available</div>;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and export inventory reports</p>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Report Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  selectedReport === report.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">{report.name}</span>
                </div>
                <p className="text-sm text-gray-600">{report.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Report Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGenerateReport}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Filter className="w-4 h-4" />
                )}
                <span>{loading ? 'Generating...' : 'Generate Report'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {reportTypes.find(r => r.id === selectedReport)?.name || 'Report Results'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExportReport('csv')}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => handleExportReport('pdf')}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {renderReportData()}
        </div>
      </div>
    </div>
  );
};

export default Reports;