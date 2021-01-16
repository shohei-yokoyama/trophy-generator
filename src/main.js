import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCwuIMcUFMZSQ7JB7v9SJeNf3Skv-MUPcc",
  authDomain: "trophy-generator-8e71b.firebaseapp.com",
  projectId: "trophy-generator-8e71b",
  storageBucket: "trophy-generator-8e71b.appspot.com",
  messagingSenderId: "1018967618009",
  appId: "1:1018967618009:web:537f9d45f826b061de69c8",
  measurementId: "G-2PSDN537TL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

firebase.analytics();

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
export default db

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

