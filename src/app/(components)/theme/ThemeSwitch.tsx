import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeChanger() {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            {/* The current theme is: {theme} */}
            {theme == "dark" && (
                <button onClick={() => setTheme("light")}>
                    <FiMoon size={25} />
                </button>
            )}
            {theme == "light" && (
                <button onClick={() => setTheme("dark")}>
                    <FiSun size={25} />
                </button>
            )}
        </div>
    );
}
