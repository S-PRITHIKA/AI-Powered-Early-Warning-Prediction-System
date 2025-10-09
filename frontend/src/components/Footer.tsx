import React from 'react';
import { Waves, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: 'Researchers', href: '#researchers' },
      { name: 'Fishermen', href: '#fishermen' },
      { name: 'Authorities', href: '#authorities' },
      { name: 'API Documentation', href: '#api' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Support', href: '#contact' },
      { name: 'System Status', href: '#status' },
      { name: 'Training Resources', href: '#training' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Data Protection', href: '#data-protection' },
      { name: 'Compliance', href: '#compliance' }
    ]
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BLUE-HARBOUR</span>
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Empowering maritime communities with intelligent ocean monitoring, 
              real-time alerts, and collaborative tools for safer seas.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-blue-200">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@blue-harbour.com</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-WAVE</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Maritime Innovation Center</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-200 text-sm">
              © 2025 BLUE-HARBOUR. All rights reserved. | Maritime Intelligence Platform
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-blue-200">System Operational</span>
              </div>
              <div className="text-sm text-blue-200">
                Last Updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Pattern at Bottom */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
    </footer>
  );
};

export default Footer;