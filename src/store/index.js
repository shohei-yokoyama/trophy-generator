import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
// import db from "@/main.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    trophies: [],
    mylist: [],
  },
  getters: {
    userName: state => state.user ? state.user.displayName : "",
    photoURL : state => state.user ? state.user.photoURL : "", 
    getUser: state => state.user ? state.user : "",
    uid: state => state.user ? state.user.uid : null,
    getTrophByID: state => id => state.trophies.find(trophy => trophy.id === id),
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    deleteUser(state){
      state.user = null
    },
    checkTrophy(state, {id,trophy}){
      trophy.id = id,
      state.trophies.push(trophy)
    },
    updateTrophy(state, {id, trophy}){
      const index = state.trophies.findIndex(trophy => trophy.id === id)
      state.trophies[index] = trophy
    },
    deleteTrophy(state, {id}){
      const index = state.trophies.findIndex(trophy => trophy.id === id)
      state.trophies.splice(index, 1)
    }
  },
  actions: {
    setUser({commit}, user){
      commit("setUser", user)
    },
    login(){
      const twitter_auth_provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(twitter_auth_provider)
    },
    logout(){
      firebase.auth().signOut()
    },
    deleteUser({commit}){
      commit("deleteUser")
    },
    fetchTrophies({getters, commit}){
      firebase.firestore().collection(`users/${getters.uid}/trophies`).get().then(snapshot => {
        snapshot.forEach(doc => commit("checkTrophy", {id: doc.id, trophy: doc.data()}))
      })
    },
    checkTrophy({getters, commit}, trophy){
      if(getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/trophies`).add(trophy).then(doc=>{
          commit("checkTrophy", {id: doc.id, trophy})
        })
      }
    },
    updateTrophy({getters, commit}, {id, trophy}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/trophies`).doc(id).update(trophy).then(()=>{
          commit("updateTrophy", {id, trophy})
        })
      }
    },
    deleteTrophy({getters, commit}, {id}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/trophies`).doc(id).delete().then(()=>{
          commit("deleteTrophy", {id})
      })
    }
   }
  },
  modules: {
  }
})
