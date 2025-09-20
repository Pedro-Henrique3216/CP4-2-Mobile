// Context será o responsável pelo gerenciamento do tema (claro/escuro)

import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState(colorScheme || "light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const themeColors = {
        light: {
            background: "#ffffff",
            text: "#000000",
            primary: "#007bff",          // botões principais
            secondary: "#6c757d",        // botões secundários
            success: "#28a745",
            warning: "#ffc107",
            danger: "#dc3545",
            info: "#17a2b8",
            button: "#007bff",
            buttonText: "#ffffff",
            textInputBackground: "#f0f0f0",
            textInputText: "#000000",
            placeholderText: "#6c757d",
            border: "#cccccc",
            cardBackground: "#f8f9fa",
            shadow: "rgba(0, 0, 0, 0.1)",
            link: "#007bff",
            headerBackground: "#f1f1f1",
        },
        dark: {
            background: "#121212",
            text: "#ffffff",
            primary: "#1bf007",
            secondary: "#6c757d",
            success: "#28a745",
            warning: "#ffc107",
            danger: "#dc3545",
            info: "#17a2b8",
            button: "#1bf007",
            buttonText: "#000000",
            textInputBackground: "#333333",
            textInputText: "#ffffff",
            placeholderText: "#aaaaaa",
            border: "#444444",
            cardBackground: "#1e1e1e",
            shadow: "rgba(0, 0, 0, 0.5)",
            link: "#1bf007",
            headerBackground: "#1a1a1a",
        },
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
}