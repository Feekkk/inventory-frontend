import React from 'react';
import { Home, Package, Plus, List, Calendar, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Add Product', href: '/products/add', icon: Plus },
    { name: 'Pickup', href: '/categories', icon: List },
    { name: 'History', href: '/history', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      {/* Header with Logo */}
      <div className="flex items-center h-20 px-4 border-b" style={{ backgroundColor: '#191970' }}>
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="UniKL Logo" 
            className="w-12 h-12 rounded-full bg-white p-1 shadow-lg object-contain flex-shrink-0"
          />
          <div className="text-white">
            <h1 className="text-lg font-bold leading-tight">UniKL RCMP</h1>
            <p className="text-xs opacity-90 font-medium">Inventory System</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white border-r-4 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                }`}
                style={isActive ? { backgroundColor: '#191970', borderRightColor: '#191970' } : {}}
              >
                <Icon className={`w-5 h-5 mr-3 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: '#191970' }}
            ></div>
            <span className="text-xs text-gray-600 font-medium">System Online</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;