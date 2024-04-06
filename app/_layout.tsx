// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { ref, onValue } from "firebase/database";
// import { db,app } from "../firebaseConfig.js";
// import { useColorScheme } from '@/components/useColorScheme';
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import { AuthContextProvider } from "../context/AuthContext"
// import { NativeBaseProvider } from "native-base";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// import { initializeApp } from '@firebase/app';
// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };
// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
// const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//     <View style={styles.box} >
//       <View style={styles.authContainer}>
//       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//       />
//       <View style={styles.buttonContainer}>
//         <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
//       </View>
//       <View style={styles.bottomContainer}>
//         <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
//         </Text>
//       </View>
//     </View>
//     </View>
//     </ThemeProvider>
//   );
// }

// export default function RootLayout() {

//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState(null); // Track user authentication state
//   const [isLogin, setIsLogin] = useState(true);

//   const auth = getAuth(app);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, [auth]);
//   const handleAuthentication = async () => {
//     try {
//       if (user) {
//         // If user is already authenticated, log out
//         console.log('User logged out successfully!');
//         await signOut(auth);
//       } else {
//         // Sign in or sign up
//         if (isLogin) {
//           // Sign in
//           await signInWithEmailAndPassword(auth, email, password);
//           console.log('User signed in successfully!');
//         } else {
//           // Sign up
//           await createUserWithEmailAndPassword(auth, email, password);
//           console.log('User created successfully!');
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:', error.message);
//     }
//   };
//   return (
//     <NativeBaseProvider >
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

//         {user ? (
//           // Show user's email if user is authenticated
//           <Stack>
//             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//           </Stack>
//         ) : (
//           // Show sign-in or sign-up form if user is not authenticated
//           <AuthScreen
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             isLogin={isLogin}
//             setIsLogin={setIsLogin}
//             handleAuthentication={handleAuthentication}
//           />
//         )}
//       </ThemeProvider>
//     </NativeBaseProvider>
//   );
// }
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { app } from "../firebaseConfig.js";
import { useColorScheme } from '@/components/useColorScheme';
import { NativeBaseProvider } from "native-base";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import * as Yup from 'yup';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface AuthScreenProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleAuthentication: (values: { email: string; password: string }) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  const colorScheme = useColorScheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.box}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleAuthentication}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.textError}>{errors.email}</Text>}

                <TextInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  secureTextEntry
                />
                {errors.password && <Text style={styles.textError}>{errors.password}</Text>}

                <View style={styles.buttonContainer}>
                  <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleSubmit} color="#3498db" />
                </View>

                <View style={styles.bottomContainer}>
                  <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any | null>(null); // Change 'User' to match the actual user object
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async (values: any, { resetForm }: any) => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, values.email, values.password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, values.email, values.password);
          console.log('User created successfully!');
        }
      }
      resetForm();
    } catch (error: any) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user ? (
          // Show user's email if user is authenticated
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        ) : (
          // Show sign-in or sign-up form if user is not authenticated
          <AuthScreen
            handleAuthentication={handleAuthentication}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        )}
      </ThemeProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    justifyContent: 'center'
  },
  authContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    height: 300,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  textError: {
    color: '#fc6d47',
    marginTop: 5,
  },
});
