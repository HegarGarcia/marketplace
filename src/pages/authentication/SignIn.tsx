import React, { useState, FormEvent, useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert
} from "@ionic/react";
import { AuthContext } from "../../context/auth";
import { SIGNUP, CLIENT } from "../../constants/routes";

import "./styles.css";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { signInWithEmailAndPassword, user } = useContext(AuthContext);

  const onEmailChange = (event: any) => setEmail(event.target!.value);
  const onPasswordChange = (event: any) => setPassword(event.target.value!);
  const cleanErrors = () => setError("");
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDisabled(true);
    await signInWithEmailAndPassword({ email, password })
      .then(() => history.push(CLIENT))
      .catch(e => {
        setError(e);
        setIsDisabled(false);
      });
  };

  return user ? (
    <Redirect to={CLIENT} />
  ) : (
    <IonPage>
      <IonContent>
        <div className='container'>
          <h1 className='title'>Marketplace</h1>

          <form onSubmit={onSubmitHandler}>
            <IonItem className='input'>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput
                disabled={isDisabled}
                type='email'
                value={email}
                onIonInput={onEmailChange}
              />
            </IonItem>

            <IonItem className='input'>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput
                disabled={isDisabled}
                type='password'
                value={password}
                onIonInput={onPasswordChange}
              />
            </IonItem>

            <IonButton expand='block' type='submit' className='input'>
              Iniciar Sesión
            </IonButton>
          </form>

          <Link className='link' to={SIGNUP}>
            <IonButton fill='clear' color='dark' expand='block'>
              Registrarse
            </IonButton>
          </Link>
        </div>
        <IonAlert
          isOpen={!!error}
          onDidDismiss={cleanErrors}
          message={error}
          header='Error'
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
