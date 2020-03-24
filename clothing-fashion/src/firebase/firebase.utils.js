import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/auth'


const config =  {
    apiKey: "AIzaSyAnc6viZxbSOS6qetlXxJYHMEd6dYNfKdM",
    authDomain: "clothing-store-32293.firebaseapp.com",
    databaseURL: "https://clothing-store-32293.firebaseio.com",
    projectId: "clothing-store-32293",
    storageBucket: "clothing-store-32293.appspot.com",
    messagingSenderId: "52565305382",
    appId: "1:52565305382:web:1bc3ebcfe3c1ecf76a9ee7",
    measurementId: "G-8HT314THGD"

}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
// google popup prompt:
provider.setCustomParameters({ prompt: 'select_account' });

// signInWithGoogle
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase