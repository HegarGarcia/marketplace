import React, { useState, FormEvent, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { SIGNIN } from "../../constants/routes";

import "./styles.css";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { signUpWithEmailAndPassword } = useContext(AuthContext);

  const onEmailChange = (event: any) => setEmail(event.target!.value);
  const onPasswordChange = (event: any) => setPassword(event.target.value!);
  const onUsernameChange = (event: any) => setUsername(event.target.value!);
  const cleanErrors = () => setError("");
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDisabled(true);
    await signUpWithEmailAndPassword({ email, password, username })
      .then(() => {
        history.push(SIGNIN);
      })
      .catch(e => {
        setError(e);
        setIsDisabled(false);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <div className='container'>
          <h1 className='title'>Marketplace</h1>

          <form onSubmit={onSubmitHandler}>
            <IonItem className='input'>
              <IonLabel position='floating'>Usuario</IonLabel>
              <IonInput
                disabled={isDisabled}
                type='text'
                value={username}
                onIonInput={onUsernameChange}
              />
            </IonItem>

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
              Registrarse
            </IonButton>
          </form>

          <Link className='link' to={SIGNIN}>
            <IonButton fill='clear' color='dark' expand='block'>
              Iniciar Sesión
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

export default SignUp;
