import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/config/i18n";
import { QueryClient } from "@tanstack/react-query";
import QueryClientProvider from "../src/context/QueryClientProvider";

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <QueryClientProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
    
  );
}
