import { auth } from "../config/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser, updatePassword, EmailAuthProvider, reauthenticateWithCredential, signInWithCredential } from "firebase/auth";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const router = useRouter();

// Criação de usuário
export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem('@user', JSON.stringify({ uid: user.uid, email: user.email }));
      router.push('/HomeScreen');
    })
    .catch((error) => Alert.alert("Erro", error.message));
};

// Login com email/senha
export const userLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem('@user', JSON.stringify({ uid: user.uid, email: user.email }));
      router.push('/HomeScreen');
    })
    .catch((error) => Alert.alert("Erro", error.message));
};


// Reset de senha
export const passwordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => Alert.alert("Sucesso", "E-mail de recuperação enviado"))
    .catch((error) => Alert.alert("Erro", error.message));
};

// Alterar senha
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("Usuário não encontrado");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    Alert.alert("Sucesso", "Senha alterada com sucesso");
    router.push("/HomeScreen");
  } catch (error) {
    Alert.alert("Erro", error.message);
  }
};

// Deletar conta
export const deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não encontrado");
    await deleteUser(user);
    await AsyncStorage.removeItem("@user");
    router.push("/");
  } catch (error) {
    Alert.alert("Erro", error.message);
  }
};

// Login com Google
export const googleLogin = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    await AsyncStorage.setItem("@user", JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName }));
    router.push("/HomeScreen");
  } catch (error) {
    Alert.alert("Erro", error.message);
  }
};
