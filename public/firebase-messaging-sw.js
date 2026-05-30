importScripts(
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'
)

importScripts(
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js'
)

firebase.initializeApp({

  apiKey: "AIzaSyACjmwTnGSI7ZsBTJH2eBj6_nL4KPsabOw",

  authDomain: "zeit-2cf11.firebaseapp.com",

  projectId: "zeit-2cf11",

  storageBucket: "zeit-2cf11.firebasestorage.app",

  messagingSenderId: "351524437425",

  appId: "1:351524437425:web:18cd182a75e44132b35190"

})

const messaging =
  firebase.messaging()