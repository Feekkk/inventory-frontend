import React, { useState, useEffect } from 'react';
import { User, Package, Calendar, CheckCircle, AlertCircle, Printer, Save } from 'lucide-react';

const Pickup = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // User Information
    userName: '',
    userId: '',
    email: '',
    phone: '',
    department: '',
    
    // Pickup Details
    pickupDate: '',
    pickupTime: '',
    technicianName: '',
    technicianId: '',
    
    // Items
    selectedItems: [],
    
    // Consent
    userConsent: false,
    signature: '',
    
    // Additional
    notes: '',
    urgency: 'normal'
  });

  const [availableItems, setAvailableItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAvailableItems();
  }, []);

  const fetchAvailableItems = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setAvailableItems([
        { id: 1, name: 'Dell Laptop XPS 13', sku: 'LAP-001', category: 'Electronics', available: 5, location: 'Storage A-1' },
        { id: 2, name: 'Wireless Mouse Logitech', sku: 'MOU-002', category: 'Accessories', available: 15, location: 'Storage B-2' },
        { id: 3, name: 'Office Chair Ergonomic', sku: 'CHR-003', category: 'Furniture', available: 8, location: 'Warehouse C-1' },
        { id: 4, name: 'HP Printer LaserJet', sku: 'PRT-004', category: 'Electronics', available: 3, location: 'Storage A-3' },
        { id: 5, name: 'Samsung Monitor 24"', sku: 'MON-005', category: 'Electronics', available: 12, location: 'Storage A-2' }
      ]);
    } catch (error) {
      alert('Error loading available items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemSelect = (item, quantity) => {
    setFormData(prev => {
      const existingItem = prev.selectedItems.find(selected => selected.id === item.id);
      
      if (existingItem) {
        return {
          ...prev,
          selectedItems: prev.selectedItems.map(selected =>
            selected.id === item.id 
              ? { ...selected, quantity: parseInt(quantity) }
              : selected
          ).filter(selected => selected.quantity > 0)
        };
      } else if (quantity > 0) {
        return {
          ...prev,
          selectedItems: [...prev.selectedItems, { ...item, quantity: parseInt(quantity) }]
        };
      }
      
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userConsent) {
      alert('User consent is required to proceed with pickup');
      return;
    }
    
    if (formData.selectedItems.length === 0) {
      alert('Please select at least one item for pickup');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Pickup request submitted successfully!');
      
      // Reset form
      setFormData({
        userName: '', userId: '', email: '', phone: '', department: '',
        pickupDate: '', pickupTime: '', technicianName: '', technicianId: '',
        selectedItems: [], userConsent: false, signature: '', notes: '', urgency: 'normal'
      });
      setCurrentStep(1);
      
    } catch (error) {
      alert('Error submitting pickup request');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.userName && formData.userId && formData.email && formData.department;
      case 2:
        return formData.pickupDate && formData.pickupTime && formData.technicianName && formData.technicianId;
      case 3:
        return formData.selectedItems.length > 0;
      case 4:
        return formData.userConsent;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: '#191970' }} />
                User Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#191970' }}
                    placeholder="Enter user's full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => handleInputChange('userId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Enter user ID or staff number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="user@unikl.edu.my"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="+60 12-345-6789"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT">Information Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business & Management</option>
                    <option value="Science">Applied Sciences</option>
                    <option value="Admin">Administration</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">Human Resources</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" style={{ color: '#191970' }} />
                Pickup Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time *</label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name *</label>
                  <input
                    type="text"
                    value={formData.technicianName}
                    onChange={(e) => handleInputChange('technicianName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technician ID *</label>
                  <input
                    type="text"
                    value={formData.technicianId}
                    onChange={(e) => handleInputChange('technicianId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Your staff ID"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" style={{ color: '#191970' }} />
                Item Selection
              </h3>
              
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search items by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
              
              {/* Available Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">SKU: {item.sku} • Available: {item.available} • Location: {item.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700">Qty:</label>
                      <input
                        type="number"
                        min="0"
                        max={item.available}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                        onChange={(e) => handleItemSelect(item, e.target.value)}
                        defaultValue={formData.selectedItems.find(selected => selected.id === item.id)?.quantity || 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Selected Items Summary */}
              {formData.selectedItems.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Items:</h4>
                  {formData.selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" style={{ color: '#191970' }} />
                User Consent & Confirmation
              </h3>
              
              {/* Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Pickup Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>User:</strong> {formData.userName} ({formData.userId})</p>
                    <p><strong>Department:</strong> {formData.department}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                  </div>
                  <div>
                    <p><strong>Pickup Date:</strong> {formData.pickupDate}</p>
                    <p><strong>Pickup Time:</strong> {formData.pickupTime}</p>
                    <p><strong>Technician:</strong> {formData.technicianName}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Items to Pickup:</h5>
                  {formData.selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-1">
                      <span>{item.name} (SKU: {item.sku})</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Consent Section */}
              <div className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                  User Consent Required
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>I acknowledge and consent to the following:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>I am authorized to collect the above-mentioned items on behalf of UniKL</li>
                    <li>I will be responsible for the proper handling and usage of these items</li>
                    <li>I understand that these items are property of UniKL and must be returned when requested</li>
                    <li>I will report any damage or loss immediately to the IT department</li>
                    <li>I agree to follow all university policies regarding equipment usage</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="userConsent"
                    checked={formData.userConsent}
                    onChange={(e) => handleInputChange('userConsent', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    style={{ accentColor: '#191970' }}
                  />
                  <label htmlFor="userConsent" className="text-sm text-gray-700">
                    <strong>I have read and agree to the terms above. I consent to this pickup request.</strong>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature</label>
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Type your full name as digital signature"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Any additional notes or special instructions..."
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Equipment Pickup Request</h1>
        <p className="text-gray-600">Complete the form below to process equipment pickup</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                style={step <= currentStep ? { backgroundColor: '#191970' } : {}}
              >
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-full h-1 mx-4 ${
                    step < currentStep ? '' : 'bg-gray-200'
                  }`}
                  style={step < currentStep ? { backgroundColor: '#191970' } : {}}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>User Info</span>
          <span>Pickup Details</span>
          <span>Item Selection</span>
          <span>Consent</span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNext()}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#191970' }}
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.userConsent}
                  className="px-6 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  style={{ backgroundColor: '#191970' }}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Submitting...' : 'Submit Pickup Request'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Pickup;