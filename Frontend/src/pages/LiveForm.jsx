import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, submitResponse } from '../services/api';

const LiveForm = () => {
  // Grab the form ID from the URL (e.g., /form/12345)
  const { formId } = useParams();
  
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // This object will hold all the user's answers. 
  // It will look like: { "field_123": "John Doe", "field_456": "Option 2" }
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Fetch the form blueprint when the page loads
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await getFormById(formId);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  // 2. Handle when the user types or selects something
  const handleChange = (fieldId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // 3. Handle the Submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create a FormData instance
      const formData = new FormData();
      formData.append('formId', formId);
      
      // 2. Loop through answers and append them
      // Note: If an answer is a file, it will be handled as binary; others as strings
      Object.keys(answers).forEach(key => {
        formData.append(key, answers[key]);
      });

      // Send it to the database!
      await submitResponse(formData);
      setSubmitted(true); // Show the success message
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI STATES: Loading and Success Pages
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading form...</div>;
  if (!form) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">Form not found.</div>;
  
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your response has been successfully recorded.</p>
        </div>
      </div>
    );
  }

  // MAIN UI: The actual form
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border-t-8 border-blue-600">
        
        {/* Form Header */}
        <div className="p-8 border-b border-gray-100 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{form.title}</h1>
          {form.description && <p className="text-gray-600">{form.description}</p>}
        </div>

        {/* The Questions */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {form.fields.map((field) => (
            <div key={field._id || field.id} className="space-y-2">
              <label className="block text-base font-medium text-gray-800">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {/* Render TEXT inputs */}
              {field.type === 'text' && (
                <input
                  type="text"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 border p-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your answer"
                />
              )}

              {/* Render DROPDOWN inputs */}
              {field.type === 'dropdown' && (
                <select
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 border p-3 focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="" // Forces user to select an option
                >
                  <option value="" disabled>Select an option</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {/* Render RADIO inputs */}
              {field.type === 'radio' && (
                <div className="space-y-2 mt-2">
                  {field.options.map((opt, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        name={field.id} // Name groups them together
                        value={opt}
                        required={field.required}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label className="ml-3 block text-gray-700">{opt}</label>
                    </div>
                  ))}
                </div>
              )}

              {/* Render EMAIL inputs */}
              {field.type === 'email' && (
                <input
                  type="email"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 border p-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              )}

              {/* Render DATE inputs */}
              {field.type === 'date' && (
                <input
                  type="date"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 border p-3 focus:border-blue-500 focus:ring-blue-500"
                />
              )}

              {/* Render file Inputs */}
              {field.type === 'file' && (
                <div className="mt-1 flex items-center justify-center w-full">
                  {!answers[field.id] ? (
                    // SHOW THIS: If no file is selected
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload file</p>
                        <p className="text-xs text-gray-400">
                          {field.fileConfig?.acceptedTypes || "Any file"} (Max: {field.fileConfig?.maxSize || 5}MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept={field.fileConfig?.acceptedTypes}
                        required={field.required}
                        onChange={(e) => handleChange(field.id, e.target.files[0])} 
                      />
                    </label>
                  ) : (
                    // SHOW THIS: If a file has been selected
                    <div className="flex items-center justify-between w-full p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="bg-blue-600 text-white p-2 rounded">
                          {/* You can use a File icon here */}
                          📄
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {answers[field.id].name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(answers[field.id].size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange(field.id, null)} // Clear the file
                        className="text-red-500 hover:text-red-700 font-bold p-2"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}
              
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answers'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LiveForm;