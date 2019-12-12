import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "./App.module.css";
import "./firebaseui-styling.css";

const firebaseConfig = {
  apiKey: "AIzaSyDB04o3K42_V26aSQpfsi9juryuw-VCzHM",
  authDomain: "flapp-64d23.firebaseapp.com",
  databaseURL: "https://flapp-64d23.firebaseio.com",
  projectId: "flapp-64d23",
  storageBucket: "flapp-64d23.appspot.com",
  messagingSenderId: "481103473560",
  appId: "1:481103473560:web:687615c2b059098e7ed9ed"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const App = () => {
  const [user, authLoading, authError] = useAuthState(firebase.auth());

  if (authError) {
    return <div> auth error... </div>;
  }
  if (authLoading) {
    return <div> loading... </div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <i className={styles.logoIcon + " material-icons"}>photo</i> My App
      </div>
      <div className={styles.caption}>This is a cool demo app</div>
      {user !== undefined && !user && (
        <div>
          <StyledFirebaseAuth
            className={styles.firebaseUi}
            uiConfig={uiConfig}
            firebaseAuth={firebaseApp.auth()}
          />
        </div>
      )}
      {user && (
        <div className={styles.signedIn}>
          Hello {firebaseApp.auth().currentUser?.displayName || "Anon"}. You are
          now signed In!
          <button
            className={styles.button}
            onClick={() => firebaseApp.auth().signOut()}
          >
            Sign-out
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
