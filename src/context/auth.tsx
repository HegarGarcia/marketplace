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

const authContextDefaultValue = {
  user: auth.currentUser,
  signInWithEmailAndPassword: (params: SignInParams) => Promise.resolve(),
  signUpWithEmailAndPassword: (params: SignUpParams) => Promise.resolve(),
  signOut: () => Promise.resolve()
};

export const AuthContext = createContext<typeof authContextDefaultValue>(
  authContextDefaultValue
);

export const AuthProvider: FC = props => {
  const [user, setUser] = useState(auth.currentUser);

  auth.onAuthStateChanged(userCredentials => setUser(userCredentials));

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
        await signOut();
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
      throw errorMessage;
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
      throw errorMessage;
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        signOut
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
