import React, { useEffect } from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonPage
} from "@ionic/react";
import { connect } from "react-redux";
import getCurrentArticle from "../modules/article";

const ShowArticle = props => {
  let article
  const getArticleShowData = async id => {
    let article = await getCurrentArticle(id, props.language);
    if (article.error) {
      props.changeMessage(article.error);
    } else {
      props.changeCurrentArticle(article);
    }
  };

  // const getArticleShowData = async id => {
  //   debugger
  //   let article = await getCurrentArticle(id, props.language);
  //   if (article.error) {
  //     props.changeMessage(article.error);
  //   } else {
  //     props.changeCurrentArticle(article);
  //   }
  // };

  useEffect(() => {
    getArticleShowData(props.currentArticleId);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle id="header" routerLink="/home">
            The Reactive Herald{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {props.currentArticle && (
        <IonContent>
          <IonList>{props.currentArticle.title}</IonList>
        </IonContent>
      )}
    </IonPage>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  authenticated: state.authenticated,
  language: state.language,
  currentArticle: state.currentArticle
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
