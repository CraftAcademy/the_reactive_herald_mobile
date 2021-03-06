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
import { connect } from "react-redux";

const LoginForm = props => {
  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        props.history.push("/home");
        props.changeAuthenticated(!props.authenticated);
        props.setUserAttrs(userDatas.data)
        props.changeMessage(`Logged in as: ${userDatas.data.email}`);
      })
      .catch(error => {
        props.changeMessage(error.message);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle id="header" routerLink="/home">
            The Reactive Herald{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {!props.authenticated && (
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
          <IonButton routerLink="/login">Return to the Herald</IonButton>
        </IonContent>
      )}
    </IonPage>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  authenticated: state.authenticated,
  lastPage: state.lastPage
});

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: msg => {
      dispatch({ type: "CHANGE_MESSAGE", payload: msg });
    },
    changeAuthenticated: auth => {
      dispatch({ type: "CHANGE_AUTH", payload: auth });
    },
    setUserAttrs: userAttrs => {
      dispatch({ type: "CHANGE_USER_ATTRIBUTES", payload: userAttrs });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
