import firebase from "firebase/compat/app";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCb0s70gZLcBNqrQIAI00qiDBtDcWssnuE",
    authDomain: "swp-vinclean-7b1d3.firebaseapp.com",
    projectId: "swp-vinclean-7b1d3",
    storageBucket: "swp-vinclean-7b1d3.appspot.com",
    messagingSenderId: "519269369630",
    appId: "1:519269369630:web:12ef40c2be51bc9733eb0f",
    measurementId: "G-36476ZCVWM"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase };