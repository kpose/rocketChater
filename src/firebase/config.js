import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  databaseUrl: "",
  //others from firebase
};

export default Firebase.initializeApp(firebaseConfig);
