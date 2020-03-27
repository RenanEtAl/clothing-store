import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAnc6viZxbSOS6qetlXxJYHMEd6dYNfKdM",
  authDomain: "clothing-store-32293.firebaseapp.com",
  databaseURL: "https://clothing-store-32293.firebaseio.com",
  projectId: "clothing-store-32293",
  storageBucket: "clothing-store-32293.appspot.com",
  messagingSenderId: "52565305382",
  appId: "1:52565305382:web:1bc3ebcfe3c1ecf76a9ee7",
  measurementId: "G-8HT314THGD"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // create a new doc
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// sending shop data to firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log("collection Ref =>", collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log("newDocRef =>", newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// getting collection data from firebase
export const convertCollectionsSnapshotToMap = collections => {
  // get query collections
  const transformedCollection = collections.docs.map(doc => {
    // get title and items props
    const { title, items } = doc.data();
    // return data representing all the data we want for frontend
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// recreating persistence
// return a promise to work with redux-saga
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// google popup prompt:
googleProvider.setCustomParameters({ prompt: "select_account" });

// signInWithGoogle
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
