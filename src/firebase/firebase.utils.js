import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAz95UGjKsQcJZU9JQh5ksnldJSSNC6GVY",
    authDomain: "react-clothing-db-6fb77.firebaseapp.com",
    databaseURL: "https://react-clothing-db-6fb77.firebaseio.com",
    projectId: "react-clothing-db-6fb77",
    storageBucket: "react-clothing-db-6fb77.appspot.com",
    messagingSenderId: "483534403860",
    appId: "1:483534403860:web:bb7d5b4666538037832a01",
    measurementId: "G-8C4JTNFEFZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) {
        return
    };
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user ", error.message);
        }
    }
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;