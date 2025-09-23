import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DisposalForm = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    reason: '',
    condition_description: '',
    disposal_date: new Date().toISOString().split('T')[0],
    disposal_method: '',
    approver_name: '',
    notes: ''
  });

  useEffect(() => {
    // if navigated with state.item, use it immediately (no network)
    if (location.state && location.state.item) {
      setItem(location.state.item);
    } else {
      fetchItemDetails();
    }
  }, [itemId, location.state]);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit disposal request
      await axios.post(`http://localhost:8000/api/items/${itemId}/dispose`, {
        ...formData,
        item_id: itemId
      });

      // Update item status to inactive
      await axios.patch(`http://localhost:8000/api/items/${itemId}`, {
        status: 'inactive'
      });

      navigate('/disposal');
    } catch (error) {
      console.error('Error submitting disposal form:', error);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Asset Disposal Request</h1>
              <p className="mt-2 text-sm text-gray-600">Complete this form to initiate the disposal process for the selected asset.</p>
            </div>
            <button
              onClick={() => navigate('/disposal')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Assets
            </button>
          </div>
        </div>

        {/* Item Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Asset Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Asset Tag</p>
                    <p className="text-lg font-semibold text-gray-900">{item.asset_tag}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-900">{item.location}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Asset Name</p>
                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Purchase Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(item.purchase_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Disposal Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Disposal Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Reason for Disposal */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Reason for Disposal
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              >
                <option value="">Select a reason</option>
                <option value="obsolete">Obsolete/Outdated</option>
                <option value="damaged">Damaged Beyond Repair</option>
                <option value="end-of-life">End of Life</option>
                <option value="upgrade">Replaced by Upgrade</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Disposal Method */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Disposal Method
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="disposal_method"
                value={formData.disposal_method}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              >
                <option value="">Select a method</option>
                <option value="recycle">Recycle</option>
                <option value="trash">Trash</option>
                <option value="donation">Donation</option>
                <option value="sale">Sale</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Disposal Date */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Disposal Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                name="disposal_date"
                value={formData.disposal_date}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            {/* Condition Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Condition Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="condition_description"
                value={formData.condition_description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Describe the current condition of the asset..."
              />
            </div>

            {/* Approver Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Approver Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="approver_name"
                value={formData.approver_name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Enter the name of the approving authority"
              />
            </div>

            {/* Additional Notes */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Any additional information about the disposal..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/disposal')}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                  transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium
                  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-red-500 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Disposal Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default DisposalForm;
