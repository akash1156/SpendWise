import React, { useState } from 'react';

const HelpModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems = [
    {
      question: "How do I create a new transaction?",
      answer: "To create a new transaction, click the '+' button in the top navigation or go to the Transactions page and click 'Add Transaction'. Fill out the required fields and click 'Save'."
    },
    {
      question: "How can I view my spending summary?",
      answer: "Your spending summary is available on the dashboard. You can also access detailed reports by going to the Reports section in the main navigation."
    },
    {
      question: "How do I change my account settings?",
      answer: "Click on your profile icon in the top right corner and select 'Settings' from the dropdown menu. You can update your preferences, notifications, and account details there."
    },
    {
      question: "Can I export my transaction data?",
      answer: "Yes, you can export your transaction data from the Transactions page. Click the 'Export' button and choose your preferred format (CSV, PDF, or Excel)."
    },
    {
      question: "How do I set up budget categories?",
      answer: "Go to the Budget section and click 'Add Category'. You can create custom categories and set spending limits for each one."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you instructions to reset your password."
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shortcuts = [
    { key: 'Ctrl + N', action: 'Create new transaction' },
    { key: 'Ctrl + S', action: 'Save current form' },
    { key: 'Ctrl + F', action: 'Search transactions' },
    { key: 'Ctrl + D', action: 'Go to Dashboard' },
    { key: 'Ctrl + B', action: 'Go to Budget' },
    { key: 'Ctrl + R', action: 'Go to Reports' },
    { key: 'Ctrl + ,', action: 'Open Settings' },
    { key: 'Ctrl + ?', action: 'Open Help' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Help & Support</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'shortcuts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Keyboard Shortcuts
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Support
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'faq' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFAQ.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No FAQ items found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Use these keyboard shortcuts to navigate and perform actions quickly:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{shortcut.action}</span>
                    <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono text-gray-600">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                  <p className="text-gray-600 text-sm mb-4">Get help via email</p>
                  <a href="mailto:support@spendwise.com" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    support@spendwise.com
                  </a>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <svg className="w-8 h-8 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h4 className="font-medium text-gray-900 mb-2">Live Chat</h4>
                  <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                <p className="text-gray-600 text-sm">
                  We typically respond to emails within 24 hours and live chat within 5 minutes during business hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;