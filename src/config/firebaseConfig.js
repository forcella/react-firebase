import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB4-eBuWm6oa7VKV--qBQ9ay_LvAaSmWgQ",
    authDomain: "sheets-rpg.firebaseapp.com",
    databaseURL: "https://sheets-rpg.firebaseio.com",
    projectId: "sheets-rpg",
    storageBucket: "",
    messagingSenderId: "566049902084",
    appId: "1:566049902084:web:9b0d7947015186a8"
  }

firebase.initializeApp(firebaseConfig)
export const firebaseDatabase = firebase.firestore()