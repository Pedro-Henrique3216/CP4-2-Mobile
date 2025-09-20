import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addItem } from "../src/service/DatabaseService";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { scheduleTaskNotification } from "../src/service/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const selectDueDate = () => setShowDatePicker(true);
  const selectDueTime = () => setShowTimePicker(true);

  
const onDateChange = (event: any, selectedDate: Date | undefined) => {
  setShowDatePicker(false);
  if (selectedDate) {
    setDueDate((prev) => {
      const current = prev || new Date();
      return new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        current.getHours(),
        current.getMinutes()
      );
    });
  }
};

const onTimeChange = (event: any, selectedTime: Date | undefined) => {
  setShowTimePicker(false);
  if (selectedTime) {
    setDueDate((prev) => {
      const current = prev || new Date();
      return new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
    });
  }
};

  const saveTask = async () => {
  if (!title || !description || !dueDate) {
    Alert.alert(t("error"), t("fillAllFields"));
    return;
  }

  try {
    const userJson = await AsyncStorage.getItem("@user");
    if (!userJson) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      return;
    }
    const user = JSON.parse(userJson);

    const savedTask = await addItem(
      title,
      user.uid,
      description,
      dueDate,
      false,
      new Date(),
      new Date()
    );

    if (savedTask) {
      await scheduleTaskNotification(savedTask);
      Alert.alert("✅ Tarefa criada", "Notificação agendada para a validade.");
      router.push("/HomeScreen");
    }

    setTitle("");
    setDescription("");
    setDueDate(null);
  } catch (error) {
    console.error("Erro ao salvar a tarefa:", error);
    Alert.alert(t("error"), t("saveTaskError"));
  }
};


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>{t("addTask")}</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.textInputBackground, color: colors.text }]}
        placeholder={t("title")}
        placeholderTextColor={colors.placeholderText}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[
          styles.input,
          styles.description,
          { backgroundColor: colors.textInputBackground, color: colors.text }
        ]}
        placeholder={t("description")}
        placeholderTextColor={colors.placeholderText}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={selectDueDate}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {dueDate ? `${t("changeDate")}: ${dueDate.toLocaleDateString()}` : t("selectDueDate")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary, marginTop: 10 }]}
        onPress={selectDueTime}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {dueDate ? `${t("changeTime")}: ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : t("selectDueTime")}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.success, marginTop: 20 }]}
        onPress={saveTask}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{t("saveTask")}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  description: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
