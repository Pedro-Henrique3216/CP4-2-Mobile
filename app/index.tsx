import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { passwordReset, userLogin } from '../src/service/LoginService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import { useTranslation } from 'react-i18next';
import LenguageToggleButton from '../src/components/LenguageToggleButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [hiddenPassword, sethiddenPassword] = useState(true);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('@user');
      if (user) {
        router.push('/HomeScreen');
      }
    };
    checkUser();
  }, []);

  const showPassword = () => sethiddenPassword(!hiddenPassword);

  const handleLogin = () => {
    if (email && senha) {
      userLogin(email, senha);
    } else {
      Alert.alert(t('attention'), t('fillAllFields'));
    }
  };

  const forgotPassword = () => {
    if (!email) {
      Alert.alert(t('attention'), t('enterEmailToReset'));
      return;
    }
    passwordReset(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.titulo, { color: colors.text }]}>{t("login")}</Text>

        {/* Campo Email */}
        <TextInput
          style={[styles.input, { backgroundColor: colors.textInputBackground, color: colors.textInputText }]}
          placeholder={t('email')}
          placeholderTextColor={colors.placeholderText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo Senha */}
        <View style={[styles.input, { backgroundColor: colors.textInputBackground }]}>
          <TextInput
            style={[styles.textInput, { color: colors.textInputText }]}
            placeholder={t('password')}
            placeholderTextColor={colors.placeholderText}
            secureTextEntry={hiddenPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <Ionicons
            onPress={showPassword}
            name={hiddenPassword ? "eye-off" : "eye"}
            size={22}
            color={colors.icon || "#00B37E"}
          />
        </View>

        {/* Botão Login */}
        <TouchableOpacity style={[styles.botao, { backgroundColor: colors.button }]} onPress={handleLogin}>
          <Text style={[styles.textoBotao, { color: colors.buttonText }]}>{t('login')}</Text>
        </TouchableOpacity>

        {/* Links */}
        <Text style={[styles.link, { color: colors.text }]} onPress={forgotPassword}>
          {t('forgotPassword')}
        </Text>
        <Link href="CadastrarScreen" style={[styles.link, { color: colors.text }]}>
          {t('createAccount')}
        </Link>

        {/* Alternadores */}
        <View style={styles.toggleContainer}>
          <ThemeToggleButton />
          <View style={styles.langContainer}>
            <LenguageToggleButton lang="pt" />
            <LenguageToggleButton lang="en" />
            <LenguageToggleButton lang="es" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  botao: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00B37E",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 18,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  toggleContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  langContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
});
