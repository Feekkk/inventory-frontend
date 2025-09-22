import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Menu className="w-6 h-6 text-gray-500" />
          <h2 className="ml-4 text-lg font-semibold text-gray-900">
            Inventory Management
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, Admin</span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;