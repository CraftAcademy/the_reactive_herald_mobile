import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList } from '@ionic/react';
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import '../theme/variables.css'

const Home = () => {
const [articles, setArticles] = useState ({})

  const getArticles = async () => {
    let resp = await axios.get('https://reactive-herald-api.herokuapp.com/api/v1/articles')
    setArticles(resp.data.articles)
  }

  useEffect(() => {
    getArticles()
    }, [])

  let articleItems
  if (articles.length > 0) {
  articleItems = articles.map(article => {
    return (
      <IonItem Key ={articles.id}>
        <IonContent><h3>{article.title}</h3>{article.body}</IonContent>
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
