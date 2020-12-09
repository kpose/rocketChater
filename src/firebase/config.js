import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCxU8piznKceAhzQUK8AKLq1Locpp6E0Dw",
  authDomain: "rocketchater.firebaseapp.com",
  projectId: "rocketchater",
  storageBucket: "rocketchater.appspot.com",
  messagingSenderId: "380401739842",
  appId: "1:380401739842:web:4904582311f777b58de5db",
  measurementId: "G-E2652C26TJ",
  databaseURL: "https://rocketchater-default-rtdb.firebaseio.com/",
};

export default Firebase.initializeApp(firebaseConfig);
