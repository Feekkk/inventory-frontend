import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            © {currentYear} UniKL Inventory System. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Version 1.0.0</span>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Support
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;