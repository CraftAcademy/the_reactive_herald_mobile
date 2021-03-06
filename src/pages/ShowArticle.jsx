import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonButton,
  IonPage,
  IonText
} from "@ionic/react";
import { connect } from "react-redux";
import axios from "axios";

const ShowArticle = props => {
  let [currentArticle, setCurrentArticle] = useState("");
  let headers;

  const getCurrentArticle = async (id, language) => {
    headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      const response = await axios({
        url: `/articles/${id}`,
        params: { locale: language },
        headers: headers
      });

      setCurrentArticle(response.data.article);
    } catch (error) {
      if (error.message === "Network Error") {
        props.changeMessage(error.message);
      } else {
        props.changeMessage(error.response.data.response);
      }
    }
  };

  useEffect(() => {
    getCurrentArticle(props.currentArticleId, props.language);
  }, [props.currentArticleId]);

  const onReturnHandler = () => {
    setCurrentArticle("");
    props.history.push("/home");
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
      {currentArticle && (
        <IonContent>
          <IonItem class="show-article">
            <IonText>
              <h3>{currentArticle.title}</h3>
              {currentArticle.body}
              <img src={currentArticle.image}></img>
              {!props.userAttrs ? (
                <p>You need to subscribe to read full article</p>
              ) : props.userAttrs.role === null ? (
                <p>You need to subscribe to read full article</p>
              ) : (
                <p></p>
              )}
            </IonText>
          </IonItem>
          {!props.authenticated && (
            <IonButton routerLink="/login">Login to subscribe</IonButton>
          )}
          <IonButton onClick={onReturnHandler}>Return to the Herald</IonButton>
        </IonContent>
      )}
    </IonPage>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  authenticated: state.authenticated,
  language: state.language,
  currentArticle: state.currentArticle,
  currentArticleId: state.currentArticleId,
  userAttrs: state.userAttrs
});

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: msg => {
      dispatch({ type: "CHANGE_MESSAGE", payload: msg });
    },
    changeAuthenticated: auth => {
      dispatch({ type: "CHANGE_AUTH", payload: auth });
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
