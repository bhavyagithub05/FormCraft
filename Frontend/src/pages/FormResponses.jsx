import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFormById, getResponses } from '../services/api';
import { ArrowLeft, Download, Table as TableIcon } from 'lucide-react';

const FormResponses = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch both the Form (for column headers) and Responses (for rows)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formRes, responsesRes] = await Promise.all([
          getFormById(formId),
          getResponses(formId)
        ]);
        setForm(formRes.data);
        setResponses(responsesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formId]);

  // Utility Function: Download Table as CSV
  const downloadCSV = () => {
    if (!form || responses.length === 0) return;

    // 1. Create Headers (Date + All Question Labels)
    const headers = ['Date Submitted', ...form.fields.map(f => f.label)];
    
    // 2. Create Rows
    const rows = responses.map(response => {
      const date = new Date(response.submittedAt).toLocaleDateString();
      // Map through form fields to ensure answers line up with the correct column
      const answers = form.fields.map(field => {
        // Wrap answers in quotes to prevent commas in answers from breaking the CSV
        const answer = response.answers[field.id] || 'N/A';
        return `"${answer}"`; 
      });
      return [date, ...answers].join(',');
    });

    // 3. Combine and trigger download
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${form.title}_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center py-20">Loading responses...</div>;
  if (!form) return <div className="text-center py-20 text-red-500">Form not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/" className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2 font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Results: {form.title}</h1>
          <p className="text-gray-500 mt-1">Total Responses: {responses.length}</p>
        </div>

        <button 
          onClick={downloadCSV}
          disabled={responses.length === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
            responses.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <Download className="w-4 h-4 mr-2" /> Download CSV
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {responses.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <TableIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800">No responses yet</h3>
            <p className="text-gray-500">Share your live form link to start collecting data.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Date Submitted
                  </th>
                  {/* Dynamically render table headers based on the form's questions */}
                  {form.fields.map((field) => (
                    <th key={field.id} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Map through each user's response to create a row */}
                {responses.map((response) => (
                  <tr key={response._id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(response.submittedAt).toLocaleString()}
                    </td>
                    {/* Map through fields again to ensure answers go in the correct column */}
                    {form.fields.map((field) => (
                      <td key={field.id} className="px-6 py-4 text-sm text-gray-800">
                        {response.answers[field.id] ? response.answers[field.id] : <span className="text-gray-400 italic">No Answer</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormResponses;