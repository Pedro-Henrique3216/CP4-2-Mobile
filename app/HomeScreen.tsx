import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteAccount } from "../src/service/LoginService";
import Task, { TaskProps } from "../src/components/Task";
import { useEffect, useState } from "react";
import { getItems } from "../src/service/DatabaseService";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from 'react-i18next';
import * as Notifications from "expo-notifications";
import { checkNotificationPermissions } from "../src/service/NotificationService";

// Configuração para receber notificações em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export default function HomeScreen() {
  const [listaItems, setListaItems] = useState<TaskProps[]>([]);
  const { colors } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const logoff = async () => {
    await AsyncStorage.removeItem("@user");
    router.push("/");
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      t("deleteAccount"),
      t("confirmDelete"),
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("delete"),
          style: "destructive",
          onPress: async () => {
            await deleteAccount();
          },
        },
      ]
    );
  };


  useEffect(() => {
    const findItems = async () => {
      try {
        const userJson = await AsyncStorage.getItem("@user");
        if (!userJson) return;

        const user = JSON.parse(userJson);
        await getItems(setListaItems, user.uid); 
      } catch (error) {
        console.error("Erro ao buscar tasks do usuário:", error);
      }
    };
    findItems();
  }, []);


  useEffect(() => {
    async function requestPermissions() {
      await checkNotificationPermissions();
    }
    requestPermissions();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("welcomeToTasks")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>
            {t("manageTasksQuickly")}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton label={t("logout")} onPress={logoff} color={colors.primary} />
          <CustomButton label={t("deleteAccount")} onPress={confirmDeleteAccount} color={colors.danger} />
          <CustomButton label={t("changePassword")} onPress={() => router.push("/ChangingPassword")} color={colors.primary} />
          <CustomButton label={t("addTask")} onPress={() => router.push("/AddTask")} color={colors.success} />
          <CustomButton label='Ver Tempo' onPress={() => router.push("/FindApi")} color={colors.primary} />
        </View>

        <View style={styles.listContainer}>
          {listaItems.length <= 0 ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : (
            <FlatList
              data={listaItems}
              renderItem={({ item }) => (
                <Task
                  title={item.title}
                  description={item.description}
                  dueDate={item.dueDate}
                  completed={item.completed}
                  id={item.id}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const CustomButton = ({ label, onPress, color }: { label: string; onPress: () => void; color: string }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginBottom: 20, alignItems: "center", paddingVertical: 10 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 14, marginTop: 4, textAlign: "center" },
  buttonsContainer: { width: "100%", marginBottom: 20, gap: 12 },
  button: { paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.15, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 4 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  listContainer: { flex: 1, borderTopWidth: 1, borderTopColor: "#ccc", paddingTop: 10 },
});
