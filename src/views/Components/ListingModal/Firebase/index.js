import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnHE-NWLT8gNKIuC9Cscu0MbrMNAAr1FY",
    authDomain: "rentnoww-3bbbb.firebaseapp.com",
    databaseURL: "https://rentnoww-3bbbb.firebaseio.com",
    projectId: "rentnoww-3bbbb",
    storageBucket: "rentnoww-3bbbb.appspot.com",
    messagingSenderId: "1019862397174",
    appId: "1:1019862397174:web:3217f235d2eee42df3fcd7",
    measurementId: "G-KSPVJ0DMHK"
  };

  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };