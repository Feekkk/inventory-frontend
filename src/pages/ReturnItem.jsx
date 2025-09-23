import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/inventoryAPI';
import { Tag } from 'lucide-react';

const ReturnItem = () => {
  const [returnedItems, setReturnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    stolen: 'bg-red-100 text-red-800',
    death: 'bg-gray-100 text-gray-800',
    returned: 'bg-green-100 text-green-800',
    damaged: 'bg-yellow-100 text-yellow-800'
  };

  // Replace fetchReturnedItems with hardcoded data
  useEffect(() => {
    // Hardcoded sample data
    const sampleData = [
      {
        id: 1,
        name: "HP Laptop ProBook",
        user: "John Doe",
        returnDate: "2025-09-23",
        status: "returned",
        notes: "Returned in good condition"
      },
      {
        id: 2,
        name: "Dell Monitor P2419H",
        user: "Jane Smith",
        returnDate: "2025-09-22",
        status: "damaged",
        notes: "Screen has dead pixels"
      },
      {
        id: 3,
        name: "MacBook Pro 2023",
        user: "Mike Johnson",
        returnDate: "2025-09-21",
        status: "stolen",
        notes: "Reported stolen during business trip"
      },
      {
        id: 4,
        name: "Logitech Keyboard",
        user: "Sarah Wilson",
        returnDate: "2025-09-20",
        status: "death",
        notes: "Device no longer functional"
      },
      {
        id: 5,
        name: "iPhone 14 Pro",
        user: "Alex Brown",
        returnDate: "2025-09-19",
        status: "returned",
        notes: "Returned with all accessories"
      }
    ];

    setReturnedItems(sampleData);
    setLoading(false);
  }, []);

  const filteredItems = filterStatus === 'all'
    ? returnedItems
    : returnedItems.filter(item => item.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Returned Items</h1>
        
        {/* Status Filter */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilterStatus('all')}
            className={
              filterStatus === 'all'
                ? 'px-4 py-2 rounded-lg bg-blue-600 text-white'
                : 'px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          >
            All
          </button>
          {Object.keys(statusColors).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={
                filterStatus === status
                  ? 'px-4 py-2 rounded-lg capitalize bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-lg capitalize bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            >
              {status}
            </button>
          ))}
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No returned items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {item.user}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(item.returnDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.notes}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnItem;