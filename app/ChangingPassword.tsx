import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { changePassword } from '../src/service/LoginService';

export default function ChangingPassword() {
  // Estados para armazenar os valores digitados
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  // Função para simular o envio do formulário
  const handleChangePassword = () => {
    if (!confirmarSenha || !senhaAtual || !novaSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não conferem!');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Atenção', 'A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    // Chame a função de alteração de senha aqui
    changePassword(senhaAtual, novaSenha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

      {/* Campo Senha Atual */}
      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      {/* Campo Nova Senha */}
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* Campo Confirmar Senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />   

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleChangePassword}>
        <Text style={styles.textoBotao}>Alterar Senha</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
