import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home = () => {
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
