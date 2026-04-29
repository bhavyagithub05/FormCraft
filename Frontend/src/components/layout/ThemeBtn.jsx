import useTheme from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const onChangeBtn = () => {
        if (themeMode === "dark") {
            lightTheme();
        } else {
            darkTheme();
        }
    }

    return (
        <button 
            onClick={onChangeBtn}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:ring-2 ring-blue-400 transition-all"
        >
            {themeMode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}