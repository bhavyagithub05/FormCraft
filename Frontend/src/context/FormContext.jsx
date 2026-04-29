import { createContext, useState, useContext } from 'react';
import { createForm } from '../services/api';

// 1. Create the Context
const FormContext = createContext();

// 2. Create the Provider Component
export const FormProvider = ({ children }) => {
  // This is the main state that holds our entire form blueprint
  const [formSchema, setFormSchema] = useState({
    title: 'Untitled Form',
    description: '',
    fields: [] // This array will hold all our inputs (text, dropdowns, etc.)
  });


  const [activeFieldId, setActiveFieldId] = useState(null);

  // Action: Add a new field
  const addField = (fieldType) => {
    const newFieldId = `field_${Date.now()}`; // Save the ID to a variable
    const newField = {
      id: `field_${Date.now()}`, // Generate a unique ID
      type: fieldType,
      label: `New ${fieldType} question`,
      required: false,
      options: fieldType === 'dropdown' || fieldType === 'radio' ? ['Option 1'] : []
    };
    
    setFormSchema((prev) => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));

    setActiveFieldId(newFieldId);
  };

  // Action: Update an existing field (like changing its label)
  const updateField = (id, updatedProperties) => {
    setFormSchema((prev) => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === id ? { ...field, ...updatedProperties } : field
      )
    }));
  };

  // Action: Delete a field
  const removeField = (id) => {
    setFormSchema((prev) => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== id)
    }));

    if (activeFieldId === id) setActiveFieldId(null);
  };

  // Action: Update main form details (Title/Description)
  const updateFormDetails = (key, value) => {
    setFormSchema((prev) => ({ ...prev, [key]: value }));
  };

  const saveFormToServer = async () => {
    try {
      // We pass the entire formSchema object to our backend
      const response = await createForm(formSchema);
      alert('✅ Form saved successfully!');
      console.log('Saved data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving form:', error);
      alert('❌ Failed to save the form. Check the console.');
    }
  };

  return (
    <FormContext.Provider value={{ 
      formSchema,
      setFormSchema, 
      addField, 
      updateField, 
      removeField, 
      updateFormDetails,
      activeFieldId,
      setActiveFieldId,
      saveFormToServer
    }}>
      {children}
    </FormContext.Provider>
  );
};

// 3. Create a custom hook so we can easily access this data anywhere
// eslint-disable-next-line react-refresh/only-export-components
export const useFormBuilder = () => {
  return useContext(FormContext);
};