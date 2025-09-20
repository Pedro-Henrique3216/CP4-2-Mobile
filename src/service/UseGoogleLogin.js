import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { useEffect } from 'react';
import { makeRedirectUri } from 'expo-auth-session';
;

export const useGoogleLogin = () => {

  const router = useRouter();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1053218590646-b5ulttn3v3ubsak71qogiuie898hmdav.apps.googleusercontent.com',
    iosClientId: '1053218590646-fciu6ccjqca6h3gme06t3kj77so05uk2.apps.googleusercontent.com',
    androidClientId: '1053218590646-g685u830tuin2b4rlhnbo773lfdesgqu.apps.googleusercontent.com',
    webClientId: '1053218590646-b5ulttn3v3ubsak71qogiuie898hmdav.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    console.log(response);
    
    if (response?.type === 'success') {
      console.log("oi");
    
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await AsyncStorage.setItem(
            '@user',
            JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName })
          );
          router.push('/HomeScreen');
        })
        .catch((error) => Alert.alert('Erro', error.message));
    }
  }, [response]);

  return { promptAsync, request };
};