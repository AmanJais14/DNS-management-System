import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DNSList = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dns/records');
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError("Failed to fetch records. Please try again later.");
      }
    };
    fetchRecords();
  }, [records]);

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">DNS Records</h2>
      {records.length === 0 ? (
        <p className="text-gray-500">No records found. Try adding some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Domain</th>
                <th className="px-4 py-2 text-left text-gray-600">Record Type</th>
                <th className="px-4 py-2 text-left text-gray-600">Value</th>
                <th className="px-4 py-2 text-left text-gray-600">Resolved IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records?.map(record => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{record.domain}</td>
                  <td className="px-4 py-2">{record.recordType}</td>
                  <td className="px-4 py-2">{record.value}</td>
                  <td className="px-4 py-2">{record.resolvedIp || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DNSList;