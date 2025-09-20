import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const router = useRouter()

export const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
          .then(async(userCredential) => {
            const user = userCredential.user;
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            router.push('/HomeScreen');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(`Erro ${errorCode}`, `Erro ao cadastrar: ${errorMessage}`);
          });
}

export const userLogin = (email, password) =>  {
  signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      router.push("/HomeScreen");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(`Erro ${errorCode}`, `Erro ao cadastrar: ${errorMessage}`);
    })
}

export const passwordReset = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(()=> {
    alert("Enviado e-mail de recuperação")
  })
  .catch((error) => {
    console.log("Erro ao enviar email ", error.message);
    alert("Erro ao enviar email. Verifique se o email esta correto")
  })
}

export const deleteAccount = async () => {
  try{
  const user = auth.currentUser;
    user.delete();
    if (user) {
      await deleteUser(user);
      await AsyncStorage.removeItem("@user");
      router.push("/");
    } else {
      Alert.alert("Erro", "Usuário não encontrado");
    }
  } catch (error) {
    console.log("Erro ao deletar conta ", error.message);
    Alert.alert("Erro", "Erro ao deletar conta. Tente novamente mais tarde.");
  }
  
}

export const changePassword = async (currentPassword, newPassword) => {
  try{
    const user = auth.currentUser;
    if(user){
      reAuthenticate(user, currentPassword)
      updatePassword(user, newPassword).then(() => {
      Alert.alert("Sucesso", "Senha alterada com sucesso");
      router.push("/HomeScreen")
    }).catch((error) => {
      console.log("Erro ao alterar senha ", error.message);
      Alert.alert("Erro", "Erro ao alterar senha. Tente novamente mais tarde.");
    });
    } else {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }
  } catch (error) {
      console.log("Erro ao alterar senha ", error.message);
      Alert.alert("Erro", "Erro ao alterar senha. Tente novamente mais tarde.");
    }
}

export const reAuthenticate = async (user, currentPassword) => {
  const credential = EmailAuthProvider.credential(user.email, currentPassword)
  await reauthenticateWithCredential(user, credential)
}