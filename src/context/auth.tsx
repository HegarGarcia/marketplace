import React, { FC, createContext, useState } from "react";
import { auth } from "../firebase";

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  email: string;
  password: string;
  username: string;
}

interface AuthContextType {
  user: firebase.User | null;
  error: string;
  signInWithEmailAndPassword: (params: SignInParams) => void;
  signUpWithEmailAndPassword: (params: SignUpParams) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: auth.currentUser,
  error: "",
  signInWithEmailAndPassword: (params: SignInParams) => {},
  signUpWithEmailAndPassword: (params: SignUpParams) => {},
  signOut: () => {}
});

export const AuthProvider: FC = props => {
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState("");

  auth.onAuthStateChanged(
    userCredentials => userCredentials && setUser(userCredentials)
  );

  const signInWithEmailAndPassword = async ({
    email,
    password
  }: SignInParams) => {
    let errorMessage = "";
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!userCredentials.user!.emailVerified) {
        auth.signOut();
        errorMessage = "Cuenta no verificada";
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Ya hay una cuenta create con tu email";
          break;
        case "auth/user-not-found":
          errorMessage = "Usuario no registrado";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña inválida";
          break;
        default:
          errorMessage = "Credenciales inválidas";
          break;
      }
    }

    if (errorMessage) {
      setError(errorMessage);
    }
  };

  const signUpWithEmailAndPassword = async ({
    email,
    password,
    username
  }: SignUpParams) => {
    let errorMessage = "";

    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await userCredentials.user!.sendEmailVerification();

      if (user) {
        await userCredentials.user!.updateProfile({ displayName: username });
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Ya hay una cuenta registrada con su email";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido";
          break;
        case "auth/weak-password":
          errorMessage = "Su password es débil";
          break;
      }
    }

    if (errorMessage) {
      setError("Error en creación de cuenta");
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        signOut
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
