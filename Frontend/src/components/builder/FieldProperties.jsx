import { useFormBuilder } from '../../context/FormContext';
import { Plus, X } from 'lucide-react';

const FieldProperties = () => {
  const { formSchema, activeFieldId, updateField, setActiveFieldId } = useFormBuilder();

  // Find the exact field the user clicked on
  const activeField = formSchema.fields.find(f => f.id === activeFieldId);

  // If no field is clicked, show a placeholder message
  if (!activeField) {
    return (
      <div className="w-full lg:w-80 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/5 p-6 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 shrink-0 min-h-50 lg:min-h-full transition-colors duration-500 relative z-10">
        <p>Click on a field in the canvas to edit its properties.</p>
      </div>
    );
  }

  // Helper to update options arrays (for dropdowns/radios)
  const handleAddOption = () => {
    const newOptions = [...activeField.options, `Option ${activeField.options.length + 1}`];
    updateField(activeField.id, { options: newOptions });
  };

  const handleUpdateOption = (index, value) => {
    const newOptions = [...activeField.options];
    newOptions[index] = value;
    updateField(activeField.id, { options: newOptions });
  };

  const handleRemoveOption = (index) => {
    const newOptions = activeField.options.filter((_, i) => i !== index);
    updateField(activeField.id, { options: newOptions });
  };

  return (
    <div className="w-full lg:w-80 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/5 p-4 lg:p-6 shrink-0 lg:overflow-y-auto transition-colors duration-500 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Field Settings</h3>
        <button onClick={() => setActiveFieldId(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Field Label Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Question Title</label>
        <input 
          type="text" 
          value={activeField.label}
          onChange={(e) => updateField(activeField.id, { label: e.target.value })}
          className="w-full p-2 bg-transparent dark:bg-slate-950! border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
        />
      </div>

      {/* Required Checkbox */}
      <div className="mb-6 flex items-center">
        <input 
          type="checkbox" 
          id="required"
          checked={activeField.required}
          onChange={(e) => updateField(activeField.id, { required: e.target.checked })}
          className="mr-2 w-4 h-4 text-blue-600 bg-white dark:bg-slate-950! border-gray-300 dark:border-slate-700 rounded focus:ring-blue-500 transition-colors"
        />
        <label htmlFor="required" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Required Field</label>
      </div>

      {/* Options Editor (Only shows up for Dropdowns and Radios) */}
      {(activeField.type === 'dropdown' || activeField.type === 'radio') && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Options</label>
          <div className="space-y-2 mb-3">
            {activeField.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input 
                  type="text" 
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  className="flex-1 p-1.5 bg-transparent dark:bg-slate-950! border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded text-sm focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button 
                  onClick={() => handleRemoveOption(index)}
                  className="ml-2 text-red-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={handleAddOption}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Option
          </button>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-400 dark:text-gray-500">
        Field Type: <span className="uppercase font-semibold text-gray-600 dark:text-gray-300">{activeField.type}</span>
      </div>
    </div>
  );
};

export default FieldProperties;