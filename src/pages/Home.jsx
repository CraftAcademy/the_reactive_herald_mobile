import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonText
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import auth from "../services/auth";
import "../theme/variables.css";

const Home = props => {
  const [articles, setArticles] = useState({});

  const getArticles = async () => {
    let resp = await axios.get("/articles");
    setArticles(resp.data.articles);
  };

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeMessage("");
        props.changeAuthenticated(!props.authenticated);
      })
      .catch(error => {
        props.changeMessage(error.message);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [props.currentArticle]);

  let articleItems;
  if (articles.length > 0) {
    articleItems = articles.map(article => {
      return (
        <IonItem
          class="list-item"
          Key={articles.id}
          onClick={() => {
            props.changeCurrentArticleId(`${article.id}`);
          }}
          routerLink={`/articles/${article.id}`}
        >
          <IonContent>
            <h3>{article.title}</h3>
            {article.body}
          </IonContent>
        </IonItem>
      );
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle id="header">The Reactive Herald</IonTitle>
        </IonToolbar>
      </IonHeader>
      {!props.authenticated && <IonButton routerLink="/login">Login</IonButton>}
      {props.authenticated && <IonButton onClick={onLogout}>Log out</IonButton>}
      <IonContent>
        <IonList>{articleItems}</IonList>
      </IonContent>
      <IonText>{props.message}</IonText>
    </IonPage>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  authenticated: state.authenticated,
  currentArticle: state.currentArticle,
  currentArticleId: state.currentArticleId
});

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: msg => {
      dispatch({ type: "CHANGE_MESSAGE", payload: msg });
    },
    changeAuthenticated: auth => {
      dispatch({ type: "CHANGE_AUTH", payload: auth });
    },
    changeCurrentArticleId: id => {
      dispatch({ type: "CHANGE_ARTICLE_ID", payload: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
