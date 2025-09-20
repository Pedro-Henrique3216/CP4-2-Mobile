import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CountryFlag from "react-native-country-flag";
import { useTranslation } from "react-i18next";


export default function LenguageToggleButton({ lang }) {
  const { i18n } = useTranslation();

  const handleChangeLanguage = () => {
    i18n.changeLanguage(lang);
  };

  const getFlagCode = () => {
    switch (lang) {
      case "pt":
        return "br"; // 🇧🇷
      case "en":
        return "us"; // 🇺🇸
      case "es":
        return "es"; // 🇪🇸
      default:
        return "us";
    }
  };

  return (
    <TouchableOpacity style={styles.flagButton} onPress={handleChangeLanguage}>
      <CountryFlag isoCode={getFlagCode()} size={28} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flagButton: {
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
