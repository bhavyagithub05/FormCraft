import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFormById, getResponses } from '../services/api';
import { ArrowLeft, Download, Table as TableIcon } from 'lucide-react';

const FormResponses = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const downloadCSV = () => {
    if (!form || responses.length === 0) return;

    const headers = ['Date Submitted', ...form.fields.map(f => f.label)];
    const rows = responses.map(response => {
      const date = new Date(response.submittedAt).toLocaleDateString();
      const answers = form.fields.map(field => {
        const answer = response.answers[field.id] || 'N/A';
        return `"${answer}"`; 
      });
      return [date, ...answers].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${form.title}_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center py-20 dark:text-white">Loading responses...</div>;
  if (!form) return <div className="text-center py-20 text-red-500">Form not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link to="/" className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2 font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Results: {form.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Total Responses: {responses.length}</p>
        </div>

        <button 
          onClick={downloadCSV}
          disabled={responses.length === 0}
          className={`flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold text-white transition-all shadow-sm ${
            responses.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } w-full md:w-auto`}
        >
          <Download className="w-4 h-4 mr-2" /> Download CSV
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        {responses.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <TableIcon className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">No responses yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Share your live form link to start collecting data.</p>
          </div>
        ) : (
          /* Scrollable Container for Table */
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Date Submitted
                  </th>
                  {form.fields.map((field) => (
                    <th key={field.id} className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {responses.map((response) => (
                  <tr key={response._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(response.submittedAt).toLocaleString()}
                    </td>
                    {form.fields.map((field) => (
                      <td key={field.id} className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {response.answers[field.id] ? (
                          response.answers[field.id]
                        ) : (
                          <span className="text-gray-400 dark:text-slate-500 italic text-xs">No Answer</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Tip */}
      <div className="mt-4 md:hidden text-center text-xs text-gray-400 italic">
        Tip: Scroll horizontally to view all columns
      </div>
    </div>
  );
};

export default FormResponses;