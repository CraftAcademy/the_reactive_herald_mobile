import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React,{useEffect, useState} from 'react';
import axios from 'axios';

const Home = (props) => {

  const [articles, setArticles] = useState ({})

  useEffect(() => {
    getArticles().then(resp => {
      setArticles(resp)
    })
  }, [])
  const getArticles = async () => {
    let resp = await axios.get ('https://reactive-herald-api.herokuapp.com/api/v1/articles/')
    return resp.data.articles
  
  }
  debugger
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Reactive Herald </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          This is the  best mobile news app.{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            Subscribe Here!
          </a>{' '}
          WELCOME!
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
