import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getForms, deleteForm } from '../services/api';
import { FileText, ExternalLink, Database, Activity, BarChart3, CheckCircle2,Trash2, Edit3 } from 'lucide-react';



const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyForms = async () => {
      try {
        const response = await getForms();
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form? This cannot be undone.")) {
      try {
        await deleteForm(id);
        // Remove the deleted form from the UI without refreshing the page
        setForms(forms.filter(form => form._id !== id));
      } catch (error) {
        console.error("Failed to delete form:", error);
        alert("Failed to delete form.");
      }
    }
  };

  return (
    // Updated: Changed bg-slate-50 to also have dark:bg-slate-900
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <div>
            {/* Updated: dark:text-white */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Workspace</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your forms and view responses.</p>
          </div>
          <Link 
            to="/builder" 
            className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm hover:shadow flex items-center"
          >
            + Create New Form
          </Link>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Stat Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center transition-colors">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Forms</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{loading ? '-' : forms.length}</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center transition-colors">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Responses</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">142</p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center transition-colors">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
              <div className="flex items-center mt-1">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <p className="text-lg font-bold text-gray-800 dark:text-white">Online</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Forms Grid Section Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recent Forms</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Activity className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Loading your workspace...</p>
          </div>
        ) : forms.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-12 text-center rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center transition-colors">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-full mb-4">
              <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">No forms created yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">Your workspace is empty. Create your first dynamic form to start collecting responses.</p>
            <Link to="/builder" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-md transition-colors">
              Get Started →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div 
                key={form._id} 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate pr-4">{form.title}</h3>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/builder/${form._id}`} 
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Edit Form"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(form._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Delete Form"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center">
                    Created {new Date(form.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <Link 
                      to={`/form/${form._id}`} 
                      target="_blank" 
                      className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> View Live Form
                    </Link>
                    
                    <Link 
                      to={`/responses/${form._id}`} 
                      className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Database className="w-4 h-4 mr-2" /> View Responses
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;