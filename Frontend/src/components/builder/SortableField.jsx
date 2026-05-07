import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import FieldPreview from './FieldPreview';

const SortableField = ({ field, activeFieldId, setActiveFieldId, removeField }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      onClick={() => setActiveFieldId(field.id)}
      className={`p-4 lg:p-5 border rounded-xl relative group cursor-pointer transition-all duration-300 ${
        activeFieldId === field.id 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-400/50' 
          : 'border-transparent bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-white/10'
      }`}
    >
      {/* DRAG HANDLE - This makes only the icon grabbable */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing p-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded shadow-sm text-gray-400 hover:text-blue-500 transition-all"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{field.label}</p>
      <FieldPreview field={field} />

      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent selecting field while deleting
          removeField(field.id);
        }}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SortableField;