import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where, getDoc } from 'firebase/firestore'
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCRrjMVXW0zRWWBxIM9NFrr-CjT5_Vgpcs",
  authDomain: "shopping-app-be469.firebaseapp.com",
  projectId: "shopping-app-be469",
  storageBucket: "shopping-app-be469.appspot.com",
  messagingSenderId: "780380821788",
  appId: "1:780380821788:web:a5bd10bb51ea131b8402d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app)

const addAuthenticatedUser = async (values, navigation) => {
  try {
    const { fullName, email, phoneNumber, password } = values;
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    navigation.goBack();
    await updateProfile(auth.currentUser, {
      displayName: fullName,
    })
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
      cart: [],
      createdAt: serverTimestamp()
    })
  } catch (error) {
    console.log(error.message, "error creating user!")
  }
}

const loginUser = async (email, password, navigation) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    navigation.replace('HomeScreen');
  } catch (error) {
    console.log(error.message)
  }
}

const logoutUser = async (navigation) => {
  try {
    await signOut(auth)
    navigation.replace('LoginScreen');
  } catch (error) {
    console.log(error.message)
  }
}

const getPopular = (setPopularDb, popular, isMounted) => {
  const ref = query(doc(db, 'popular', popular))
  onSnapshot(ref, (field) => {
    let tempDb = []
    field.data().products.forEach((item) => {
      tempDb.push(item);
    })
    if (isMounted.current) {
      setPopularDb(tempDb)
    }
  })
}

const getCategories = (setCategories) => {
  const ref = query(collection(db, 'categories'))
  onSnapshot(ref, (snapshot) => {
    let tempDb = []
    snapshot.docs.forEach((doc) => {
      tempDb.push(doc.data())
    })
    setCategories(tempDb)
  })
}

const getCart = (setCartDb, setTotal) => {
  const q = query(doc(db, 'users', auth.currentUser.uid));
  onSnapshot(q, snapshot => {
    let tempCartDb = []
    let tempTotalPrice = 0
    snapshot.data().cart.map((product) => {
      tempCartDb.push(product)
      tempTotalPrice += parseInt(product.price);
    })

    setTotal(tempTotalPrice)
    setCartDb(tempCartDb)
  })
}

const addToCart = (product) => {
  const q = query(doc(db, 'users', auth.currentUser.uid));
  getDoc(q)
    .then(async (field) => {
      const generatedId = Math.floor(Math.random() * 10000) + 1;
      product.cartId = product.id + generatedId.toString();
      await updateDoc(q, {
        cart: [...field.data()?.cart, product]
      })
    })
}

const addToCategory = (categories) => {
  const q = query(collection(db, 'products'), where('categories', '==', categories))
  onSnapshot(q, async (snapshot) => {
    let categoryDb = []
    snapshot.docs.forEach((doc) => {
      categoryDb.push({ ...doc.data(), id: doc.id });
    })

    await updateDoc(doc(db, 'categories', categories), {
      products: [...categoryDb]
    })
  })
}

const addToPopular = (popular) => {
  const q = query(collection(db, 'products'), where('popular', '==', popular))
  onSnapshot(q, async (snapshot) => {
    let popularDb = []
    snapshot.docs.forEach((doc) => {
      popularDb.push({ ...doc.data(), id: doc.id });
    })

    await updateDoc(doc(db, 'popular', popular), {
      products: [...popularDb]
    })
  })
}

const addProducts = async (values, sizes, imageUri) => {
  const { categories, popular, description, quantity, productName, price } = values
  const createdAt = serverTimestamp()
  let imageURL = ''
  if (imageUri !== '') {
    const storageRef = ref(storage, `/images/products/${productName}`)

    const img = await fetch(imageUri);
    const bytes = await img.blob()

    await uploadBytes(storageRef, bytes, { contentType: 'image/jpg' })
    imageURL = await getDownloadURL(storageRef)
  }

  const productsCol = collection(db, 'products')
  await addDoc(productsCol, {
    categories, popular, description, quantity, productName, price, sizes, imageURL, createdAt
  })

  addToCategory(categories)
  addToPopular(popular)
}

export { auth, db, addAuthenticatedUser, loginUser, logoutUser, getPopular, getCategories, getCart, addProducts, addToCart }