import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, Package, AlertTriangle, Clock, User, ArrowUpDown } from 'lucide-react';

const History = () => {
  const [activeTab, setActiveTab] = useState('movements');
  const [dateRange, setDateRange] = useState('thisMonth');

  const reportCards = [
    {
      title: 'Total Movements',
      value: '1,247',
      change: '+8%',
      icon: ArrowUpDown,
      color: 'blue'
    },
    {
      title: 'Items Added',
      value: '156',
      change: '+12%',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Items Removed',
      value: '89',
      change: '-5%',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const movementHistory = [
    { id: 1, item: 'Dell Laptop XPS 13', action: 'Added', quantity: 5, user: 'John Doe', date: '2024-09-22 10:30 AM', type: 'in' },
    { id: 2, item: 'Office Chair Ergonomic', action: 'Removed', quantity: 2, user: 'Jane Smith', date: '2024-09-22 09:15 AM', type: 'out' },
    { id: 3, item: 'Wireless Mouse Logitech', action: 'Added', quantity: 10, user: 'Mike Johnson', date: '2024-09-21 04:45 PM', type: 'in' },
    { id: 4, item: 'HP Printer LaserJet', action: 'Removed', quantity: 1, user: 'Sarah Wilson', date: '2024-09-21 02:20 PM', type: 'out' },
    { id: 5, item: 'Samsung Monitor 24"', action: 'Added', quantity: 3, user: 'David Brown', date: '2024-09-21 11:00 AM', type: 'in' }
  ];

  const recentReports = [
    { id: 1, name: 'Inventory History Report - September 2024', date: '2024-09-20', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Movement Analysis Report', date: '2024-09-19', type: 'Excel', size: '1.2 MB' },
    { id: 3, name: 'Monthly Activity Report', date: '2024-09-15', type: 'PDF', size: '3.1 MB' },
    { id: 4, name: 'User Activity Report', date: '2024-09-10', type: 'Excel', size: '1.8 MB' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">History & Reports</h1>
        <div className="flex space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
          <button className="text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 flex items-center space-x-2" style={{ backgroundColor: '#191970' }}>
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className={`text-sm ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#191970', opacity: 0.1 }}>
                  <Icon className="w-6 h-6" style={{ color: '#191970' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Movement History Tab */}
      {activeTab === 'movements' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inventory Movements</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movementHistory.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {movement.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        movement.type === 'in' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {movement.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Report Generation */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Generate Reports</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <h3 className="font-medium text-gray-900">Movement History</h3>
                  <p className="text-sm text-gray-600 mt-1">Complete movement records</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <h3 className="font-medium text-gray-900">User Activity</h3>
                  <p className="text-sm text-gray-600 mt-1">Track user actions</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <h3 className="font-medium text-gray-900">Inventory Summary</h3>
                  <p className="text-sm text-gray-600 mt-1">Current stock overview</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                  <h3 className="font-medium text-gray-900">Monthly Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">Performance analytics</p>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="hover:opacity-75 flex items-center space-x-1 transition-opacity" style={{ color: '#191970' }}>
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;