import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getFirestore, query, serverTimestamp, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRrjMVXW0zRWWBxIM9NFrr-CjT5_Vgpcs",
  authDomain: process.env.REACT_NATIVE_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_NATIVE_APP_PROJECT_ID,
  storageBucket: process.env.REACT_NATIVE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_NATIVE_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_NATIVE_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

const addAuthenticatedUser = async (values) => {
  try {
    const { fullName, email, phoneNumber, password } = values;
    console.log(fullName, email, phoneNumber, password)
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
      displayName: fullName,
    })
    console.log("user created successfully!", user.displayName)
    await addUserToDatabase(user, { phoneNumber })
  } catch (error) {
    console.log(error.message)
  }
}

const addUserToDatabase = async (user, additionalData) => {
  const { email, displayName, uid } = user;
  const { phoneNumber } = additionalData;

  // add user data to firestore with same authenticated id
  const userRef = query(doc(db, 'users', uid))
  try {
    await setDoc(userRef, {
      fullName: displayName,
      email,
      phoneNumber,
      createdAt: serverTimestamp()
    })
    console.log("user added to database successfully!")
  } catch (error) {
    console.log(error.message, "error creating user!")
  }
}

const loginUser = async (email, password, navigation) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    navigation.replace('HomeScreen');
    console.log('User Logged In!', user.email);
  } catch (error) {
    console.log(error.message)
  }
}

const logoutUser = async (navigation) => {
  try {
    await signOut(auth)
    navigation.replace('LoginScreen');
    console.log("User Logged Out!")
  } catch (error) {
    console.log(error.message)
  }
}

export { auth, addAuthenticatedUser, loginUser, logoutUser }
