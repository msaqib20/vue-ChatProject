import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Filter from "bad-words";
import { ref, onUnmounted, computed } from "vue";

// firebase settings

firebase.initializeApp({
  apiKey: "AIzaSyB020aZUFjz1WuMvpgUUFVZZgt2RFzI1Lc",
  authDomain: "test-project-8af4d.firebaseapp.com",
  projectId: "test-project-8af4d",
  storageBucket: "test-project-8af4d.appspot.com",
  messagingSenderId: "821782322695",
  appId: "1:821782322695:web:bf6c184f98c2ddbcea14a2",
});

// User Authentication

const auth = firebase.auth();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
  };
  const signOut = () => auth.signOut();

  return { user, isLogin, signIn, signOut };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection("messages");
const messagesQuery = messagesCollection
  .orderBy("createdAt", "desc")
  .limit(100);
const filter = new Filter();

export function useChat() {
  const messages = ref([]);
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
