import React from 'react';
import { Heart, Mail, Phone, Globe, Shield, FileText } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* UniKL Branding */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="UniKL Logo" 
                  className="w-10 h-10 rounded-full bg-white shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#191970' }}>
                    UniKL Inventory System
                  </h3>
                  <p className="text-sm text-gray-600">
                    Department of Information Technology
                  </p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" style={{ color: '#191970' }} />
                  <span>support@unikl.edu.my</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" style={{ color: '#191970' }} />
                  <span>+60 3-2175 4000</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" style={{ color: '#191970' }} />
                  <span>www.unikl.edu.my</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Dashboard', href: '/' },
                  { name: 'Products', href: '/products' },
                  { name: 'Pickup Requests', href: '/categories' },
                  { name: 'History', href: '/history' },
                  { name: 'Settings', href: '/settings' }
                ].map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support & Resources</h4>
              <ul className="space-y-2">
                {[
                  { name: 'User Manual', icon: FileText },
                  { name: 'Technical Support', icon: Shield },
                  { name: 'Privacy Policy', icon: Shield },
                  { name: 'Terms of Service', icon: FileText }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <item.icon className="w-3 h-3" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                © {currentYear} Universiti Kuala Lumpur. All rights reserved.
              </span>
              <div className="flex items-center space-x-1 text-red-500">
              </div>
            </div>

            {/* Version & Build Info */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono">
                  v1.0.0
                </span>
                <span>•</span>
                <span>Build #{new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}</span>
                <span>•</span>
                <span>React 18</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div 
        className="h-1 w-full" 
        style={{ backgroundColor: '#191970' }}
      ></div>
    </footer>
  );
};

export default Footer;