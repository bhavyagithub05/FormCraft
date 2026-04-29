

const FieldPreview = ({ field }) => {
  // This component acts like a traffic cop. 
  // It looks at the field.type and returns the correct HTML.

  switch (field.type) {
    case 'text':
      return (
        <input 
          type="text" 
          disabled // Disabled in builder mode so the admin doesn't accidentally type in it
          placeholder="User will type their answer here..." 
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
        />
      );

    case 'dropdown':
      return (
        <select disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed">
          {field.options && field.options.length > 0 ? (
            field.options.map((opt, index) => (
              <option key={index} value={opt}>{opt}</option>
            ))
          ) : (
            <option>No options added yet</option>
          )}
        </select>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2 mt-2">
          <input type="checkbox" disabled className="w-4 h-4 cursor-not-allowed" />
          <span className="text-gray-600">Option 1</span>
        </div>
      );

    case 'radio':
      return (
        <div className="flex items-center space-x-2 mt-2">
          <input type="radio" disabled className="w-4 h-4 cursor-not-allowed" />
          <span className="text-gray-600">Option 1</span>
        </div>
      );

    default:
      return <p className="text-red-500">Unknown field type</p>;
  }
};

export default FieldPreview;