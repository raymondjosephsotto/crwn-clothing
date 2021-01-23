import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyCie-MD7aK9GWwLPQEYQtPLs9MomElxvKo",
    authDomain: "crwn-db-2621a.firebaseapp.com",
    databaseURL: "https://crwn-db-2621a.firebaseio.com",
    projectId: "crwn-db-2621a",
    storageBucket: "crwn-db-2621a.appspot.com",
    messagingSenderId: "48451546445",
    appId: "1:48451546445:web:e168f7a36ad91b84ea9b04",
    measurementId: "G-0567W54BFL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if(!snapShot.exists){
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch(error){
			console.log('error creating user', error.message);
		}
	}
	return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});
	return await batch.commit();
}

firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});
	return transformedCollection.reduce((accumulator, collection) =>{
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	} ,{})
} 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Setup Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
