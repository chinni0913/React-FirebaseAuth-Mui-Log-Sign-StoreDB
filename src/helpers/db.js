import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDT23OW-D4XLsNV0mfGyPkrdITgzjAUPhc",
  authDomain: "shreya-2ca88.firebaseapp.com",
  projectId: "shreya-2ca88",
  storageBucket: "shreya-2ca88.appspot.com",
  messagingSenderId: "497511254725",
  appId: "1:497511254725:web:0a292ee5b99ef1b436beac"
  };
 const fire =  firebase.initializeApp(firebaseConfig);

 export default fire;