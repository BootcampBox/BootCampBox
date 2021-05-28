// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Make Auth and firestore refences
const auth = firebase.auth();
const fireStore = firebase.firestore(); //Update firestore settings db.settings
// const db = firebase.database();
({
    timestampsinsnapshots: true
});