<template>
  <v-app class="container">
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import Home from "@/views/Home"
import firebase from "firebase"
import {mapActions} from "vuex"

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    // Home,
  },

  data: () => ({
    //
  }),
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setUser(user)
        this.fetchTrophies()
      } else {
        this.deleteUser()
        this.$router.push("/")
      }
    })
  },
  methods: {
    ...mapActions(["setUser", "deleteUser", "fetchTrophies"])
  }
};
</script>

<style scoped>
  .container {
    width: 100%;
    /* height: 100vh; */
    }
</style>
