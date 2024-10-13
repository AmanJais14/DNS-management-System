import React, { useState } from 'react';
import axios from 'axios';

const DNSForm = () => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('');
  const [value, setValue] = useState('');
  const [ttl, setTTL] = useState(3600);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dns/records', {
        domain,
        recordType,
        value,
        ttl
      });
      alert('DNS record created successfully');
      setDomain('');
      setRecordType('');
      setValue('');
      setTTL(3600);
    } catch (error) {
      alert('Error creating DNS record');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Domain</label>
        <input
          type="text"
          id="domain"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="recordType" className="block text-sm font-medium text-gray-700">Record Type</label>
        <select
          id="recordType"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
          required
        >
          <option value="">Select Record Type</option>
          <option value="A">A</option>
          <option value="CNAME">CNAME</option>
        </select>
      </div>
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
        <input
          type="text"
          id="value"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="192.168.1.1 or example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="ttl" className="block text-sm font-medium text-gray-700">TTL</label>
        <input
          type="number"
          id="ttl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="3600"
          value={ttl}
          onChange={(e) => setTTL(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Record
      </button>
    </form>
  );
};

export default DNSForm;