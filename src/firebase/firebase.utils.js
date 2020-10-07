import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDRuVKF-8Ug8_vtt0DnhBqwWIipgjPYLAk',
	authDomain: 'crwn-db-1fce5.firebaseapp.com',
	databaseURL: 'https://crwn-db-1fce5.firebaseio.com',
	projectId: 'crwn-db-1fce5',
	storageBucket: 'crwn-db-1fce5.appspot.com',
	messagingSenderId: '645999402339',
	appId: '1:645999402339:web:58b90d549c9552aba38756',
	measurementId: 'G-RVEYPH4G1W',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Setup Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
