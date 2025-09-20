import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { createUser } from '../src/service/LoginService';
import { useRouter } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../src/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation(); // hook do i18n

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert(t("error"), t("fillAllFields")); // usando traduções
      return;
    }
    createUser(email, senha);
    router.push('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.titulo, { color: colors.text }]}>{t("createAccount")}</Text>

        {/* Campo Nome */}
        <View style={[styles.inputContainer, { backgroundColor: colors.textInputBackground, borderColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder={t("title")}
            placeholderTextColor={colors.placeholderText}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Campo Email */}
        <View style={[styles.inputContainer, { backgroundColor: colors.textInputBackground, borderColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder="E-mail"
            placeholderTextColor={colors.placeholderText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo Senha */}
        <View style={[styles.inputContainer, { backgroundColor: colors.textInputBackground, borderColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder={t("password")}
            placeholderTextColor={colors.placeholderText}
            secureTextEntry={hiddenPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <Ionicons
            onPress={() => setHiddenPassword(!hiddenPassword)}
            name={hiddenPassword ? "eye-off" : "eye"}
            size={22}
            color={colors.placeholderText}
          />
        </View>

        {/* Botão Cadastrar */}
        <TouchableOpacity style={[styles.botao, { backgroundColor: colors.primary }]} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>{t("createAccount")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  innerContainer: { padding: 25 },
  titulo: { fontSize: 30, fontWeight: "800", marginBottom: 40, textAlign: "center" },
  inputContainer: { flexDirection: "row", alignItems: "center", borderRadius: 12, paddingHorizontal: 12, height: 55, marginBottom: 18, borderWidth: 1 },
  textInput: { flex: 1, fontSize: 16, paddingVertical: 10 },
  botao: { paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10, shadowOpacity: 0.25, shadowRadius: 6, elevation: 4 },
  textoBotao: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});
