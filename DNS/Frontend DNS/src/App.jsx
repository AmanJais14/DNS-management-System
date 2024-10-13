import React, { useState } from 'react';
import DNSList from './components/DNSList';
import DNSForm from './components/DNSForm';

function App() {


  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">DNS Server Management</h1>
            <DNSForm/>
            <DNSList/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 