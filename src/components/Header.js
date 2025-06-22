import React, { useState } from 'react';
import { Search, Diamond, Menu, X, User, Settings, LogOut } from 'lucide-react';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Profile Modal Content
const ProfileModal = ({ user, onClose }) => (
  <Modal isOpen={true} onClose={onClose} title="Profile">
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user?.name || 'John Doe'}</h3>
          <p className="text-gray-600">{user?.email || 'john@example.com'}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            defaultValue={user?.name || 'John Doe'}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue={user?.email || 'john@example.com'}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue={user?.phone || '+1 (555) 123-4567'}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
);

// Settings Modal Content
const SettingsModal = ({ onClose }) => (
  <Modal isOpen={true} onClose={onClose} title="Settings">
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only" />
              <div className="w-12 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-inner"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 right-1 transition"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Push Notifications</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency</h3>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
          <option>USD - US Dollar</option>
          <option>EUR - Euro</option>
          <option>GBP - British Pound</option>
          <option>INR - Indian Rupee</option>
        </select>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
          Save Settings
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
);

// Help & Support Modal Content
const HelpModal = ({ onClose }) => (
  <Modal isOpen={true} onClose={onClose} title="Help & Support">
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <h3 className="font-semibold text-gray-900 mb-2">📚 Getting Started</h3>
          <p className="text-gray-600 text-sm">Learn how to set up your budget and track expenses effectively.</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Tips & Tricks</h3>
          <p className="text-gray-600 text-sm">Discover advanced features to maximize your financial management.</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <h3 className="font-semibold text-gray-900 mb-2">📞 Contact Support</h3>
          <p className="text-gray-600 text-sm">Get in touch with our support team for personalized assistance.</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <h3 className="font-semibold text-gray-900 mb-2">🐛 Report a Bug</h3>
          <p className="text-gray-600 text-sm">Found an issue? Let us know so we can fix it quickly.</p>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
          Contact Support
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </Modal>
);

// ProfileDropdown component with working modals
const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
    setIsOpen(false);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span className="hidden sm:block font-medium">{user?.name || 'John Doe'}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'John Doe'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'john@example.com'}</p>
            </div>
            <button
              onClick={() => handleModalOpen('profile')}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4 mr-3" />
              View Profile
            </button>
            <button
              onClick={() => handleModalOpen('settings')}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>
            <button
              onClick={() => handleModalOpen('help')}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help & Support
            </button>
            <hr className="my-2" />
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Render Modals */}
      {activeModal === 'profile' && (
        <ProfileModal user={user} onClose={handleModalClose} />
      )}
      {activeModal === 'settings' && (
        <SettingsModal onClose={handleModalClose} />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={handleModalClose} />
      )}
    </>
  );
};

const Header = ({ activeTab = 'Dashboard', setActiveTab, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['Dashboard', 'Expenses', 'Budget', 'Reports'];

  return (
    <header className="bg-slate-900 border-b border-purple-500/20 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <Diamond className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                SpendWise
              </h1>
              <span className="text-purple-300 text-sm font-medium tracking-wide">Smart Finance Management</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab?.(item)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-purple-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-white/10 backdrop-blur-sm border border-gray-300/30 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/20 w-80 transition-all duration-300 text-sm shadow-lg"
              />
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Search className="h-5 w-5 text-purple-300 hover:text-white transition-colors cursor-pointer" />
              </button>
            </div>

            {/* Profile Button with Dropdown */}
            <ProfileDropdown
              user={user}
              onLogout={onLogout}
            />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-purple-200 p-3 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`md:hidden mt-6 pt-6 border-t border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? 'block animate-in slide-in-from-top-2' : 'hidden'
        }`}>
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab?.(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 text-left ${
                  activeTab === item
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 transform scale-105'
                    : 'text-purple-200 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 hover:transform hover:translate-x-2'
                }`}
              >
                {item}
              </button>
            ))}
            
            {/* Mobile Search */}
            <div className="relative mt-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-white/10 backdrop-blur-sm border border-gray-300/30 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/20 transition-all duration-300 text-sm shadow-lg"
              />
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Search className="h-5 w-5 text-purple-300 hover:text-white transition-colors cursor-pointer" />
              </button>
            </div>

            {/* Mobile Profile with Dropdown functionality */}
            <div className="mt-3">
              <ProfileDropdown
                user={user}
                onLogout={onLogout}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;