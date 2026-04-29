import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById, createForm, updateForm } from '../services/api';
import { useFormBuilder } from '../context/FormContext';
import { Type, List, CheckSquare, CircleDot, Trash2, Share2, Check } from 'lucide-react';
import FieldPreview from '../components/builder/FieldPreview';
import FieldProperties from '../components/builder/FieldProperties';

const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const { formSchema, setFormSchema, addField, updateFormDetails, removeField, activeFieldId, setActiveFieldId } = useFormBuilder();

  const [isLoading, setIsLoading] = useState(formId ? true : false);
  const [isSaving, setIsSaving] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // Generates the full URL based on whatever domain you are currently on
    const shareableLink = `${window.location.origin}/form/${formId}`;
    
    // Copies it to the user's clipboard
    navigator.clipboard.writeText(shareableLink);
    
    // Shows the checkmark for 2 seconds, then reverts back
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (formId) {
      const fetchForm = async () => {
        try {
          const response = await getFormById(formId);
          setFormSchema(response.data); 
        } catch (error) {
          console.error("Failed to fetch form", error);
          alert("Form not found");
          navigate('/'); 
        } finally {
          setIsLoading(false);
        }
      };
      fetchForm();
    } else {
      setFormSchema({ title: 'Untitled Form', description: '', fields: [] });
    }
  }, [formId, navigate, setFormSchema]);

  const handleSaveForm = async () => {
    setIsSaving(true);
    try {
      if (formId) {
        await updateForm(formId, formSchema);
        alert('✅ Form updated successfully!');
      } else {
        await createForm(formSchema);
        alert('✅ Form created successfully!');
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('❌ Failed to save the form.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-74px)] items-center justify-center bg-gray-50 dark:bg-slate-950">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Loading form workspace...</p>
      </div>
    );
  }

  return (
    // OUTER WRAPPER: Stacks naturally on mobile, strict 3-column height on Desktop
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-74px)] lg:h-[calc(100vh-74px)] bg-gray-50 dark:bg-slate-950 transition-colors duration-500 lg:overflow-hidden">
      
      {/* LEFT SIDEBAR: Tool Panel */}
      <div className="w-full lg:w-64 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/5 p-4 flex flex-col shrink-0 lg:overflow-y-auto transition-colors duration-500 relative z-10">
        <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-6">Form Elements</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          <button 
          onClick={() => addField('text')} 
          className="flex items-center w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors">
            <Type className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Text Input
          </button>
          
          <button onClick={() => addField('dropdown')} className="flex items-center w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors">
            <List className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Dropdown
          </button>

          <button onClick={() => addField('checkbox')} className="flex items-center w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors">
            <CheckSquare className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Checkbox
          </button>
          
          <button onClick={() => addField('radio')} className="flex items-center w-full p-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors">
            <CircleDot className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Radio Button
          </button>
        </div>
      </div>

      {/* CENTER CANVAS: Live Preview Area */}
      {/* min-w-0 prevents flexbox from collapsing the canvas to 0 width */}
      <div className="flex-1 min-w-0 p-4 lg:p-8 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t-8 border-blue-600 dark:border-blue-500 dark:ring-1 dark:ring-white/5 p-6 lg:p-8 transition-colors duration-500 relative overflow-hidden mb-10">
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
          
          {/* Form Header Editable Area */}
          <div className="mb-8 border-b border-gray-200 dark:border-slate-700 pb-6 relative z-10">
            <input 
              type="text" 
              value={formSchema.title}
              onChange={(e) => updateFormDetails('title', e.target.value)}
              className="text-3xl lg:text-4xl font-bold w-full bg-transparent dark:bg-transparent! text-gray-900 dark:text-white focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-500 placeholder-gray-300 dark:placeholder-gray-600 mb-3 transition-colors"
              placeholder="Form Title"
            />
            <textarea 
              value={formSchema.description}
              onChange={(e) => updateFormDetails('description', e.target.value)}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              rows={1}
              className="text-sm lg:text-base text-gray-600 dark:text-gray-300 w-full bg-transparent dark:bg-transparent! focus:outline-none focus:ring-0 focus:border-b-2 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-600 resize-none overflow-hidden transition-colors"
              placeholder="Form Description (Optional)"
            />
          </div>

          {/* Render the added fields here */}
          <div className="space-y-6 relative z-10">
            {formSchema.fields.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg text-gray-400 dark:text-gray-500">
                Click an element from the sidebar to add it to your form.
              </div>
            ) : (
              formSchema.fields.map((field) => (
                <div 
                key={field.id} 
                onClick={() => setActiveFieldId(field.id)}
                className={`p-4 lg:p-5 border rounded-xl relative group cursor-pointer transition-all duration-300 ${
                  activeFieldId === field.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-400/50 dark:shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                    : 'border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-white/2'
                }`}>
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{field.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">[{field.type} field preview]</p>
                  
                  <FieldPreview field={field} />

                  {/* Delete Button */}
                  <button 
                    onClick={() => removeField(field.id)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>


          {/* Save Button */}
          <div className="mt-10 flex justify-end gap-4 relative z-10">

            {formId && (
               <button
                 onClick={handleCopyLink}
                 className="flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm w-full lg:w-auto"
               >
                 {copied ? (
                   <>
                     <Check className="w-5 h-5 mr-2 text-green-500" />
                     <span className="text-green-600 dark:text-green-400">Copied!</span>
                   </>
                 ) : (
                   <>
                     <Share2 className="w-5 h-5 mr-2" />
                     Share Link
                   </>
                 )}
               </button>
             )}
             <button
             onClick={handleSaveForm}
             disabled={isSaving} 
             className="w-full lg:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-colors">
                {isSaving ? 'Saving...' : formId ? 'Update Form' : 'Save Form'}
             </button>
          </div>

        </div>
      </div>

      {/* RIGHT SIDEBAR: Properties Panel */}
      <FieldProperties />
    </div>
  );
};

export default FormBuilder;