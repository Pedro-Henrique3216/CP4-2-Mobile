import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Animated, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const anim = useRef(new Animated.Value(theme === "dark" ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: theme === "dark" ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 32],
  });

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#111" : "#eee" },
      ]}
      onPress={toggleTheme}
    >
      {/* Ícones de sol e lua */}
      <View style={styles.iconLeft}>
        <Ionicons name="sunny" size={18} color={theme === "dark" ? "#555" : "#f9a825"} />
      </View>
      <View style={styles.iconRight}>
        <Ionicons name="moon" size={18} color={theme === "dark" ? "#f1f1f1" : "#777"} />
      </View>

      {/* Bolinha animada */}
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 30,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    position: "relative",
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
    top: 3,
    left: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  iconLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 6,
  },
  iconRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 6,
  },
});
