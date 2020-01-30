import React from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonPage
} from "@ionic/react";
import auth from "../services/auth";

const LoginForm = () => {

  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        console.log(userDatas.data.email);
      })
      .catch(error => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Reactive Herald </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={onLogin}>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput type="email" name="email" />
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput type="password" name="password" />
          </IonItem>
          <IonButton type="submit">Log in</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default LoginForm;
