import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonList } from '@ionic/react';
import React,{useEffect, useState} from 'react';
import axios from 'axios';

const Home = (props) => {

  const [articles, setArticles] = useState ({})
  let articleItems
  useEffect(() => {
    getArticles().then(resp => {
      setArticles(resp)
    })
  }, [])
  const getArticles = async () => {
    let resp = await axios.get ('https://reactive-herald-api.herokuapp.com/api/v1/articles/')
    return resp.data.articles
  
  }
  if (articles.length > 0) {
  articleItems = articles.map(article => {
    return (
      <IonItem Key ={articles.id}>
        <IonLabel>{article.title}</IonLabel>
      </IonItem>
    )
  })
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Reactive Herald </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {articleItems}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
