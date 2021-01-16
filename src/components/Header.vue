<template>
  <header>
  <v-app-bar
  app
  color="light-blue lighten-2"
  >
  <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
  <v-toolbar-title><router-link class="link" to="/"><v-icon></v-icon>トロフィージェネレーター</router-link></v-toolbar-title>
  <v-tabs>
    <v-tab>
      <router-link class="link" to="/create"><v-icon>mdi-pencil-plus-outline</v-icon>トロフィーを作る</router-link>
    </v-tab>
    <v-tab>
      <router-link class="link" to="/search"><v-icon>mdi-card-search</v-icon>トロフィーを探す</router-link>
    </v-tab>
    <v-tab v-show="user.uid">
      <router-link class="link" to="/mypage"><v-icon>mdi-home</v-icon>マイページ</router-link>
    </v-tab>
  </v-tabs>
  <v-tab class="d-xs-none">
      <div v-if="user.uid" key="login" class="d-flex twitter_user">
           <div class="user-name">ユーザーネーム：{{ userName }}</div>
           <div class="user-photo"><img :src="photoURL"></div>
        <v-btn
        color="white"
        class="signin ml-5 mt-4" @click="logout"><v-icon>mdi-login-variant</v-icon>ログアウト
        </v-btn>
       </div>
    <div v-else key="logout">
      <v-btn
        class="signin"
        color="white"
        @click="signIn"><v-icon>mdi-login-variant</v-icon>ログイン</v-btn>
    </div>
    </v-tab>
    </v-app-bar>
  <v-navigation-drawer
  v-model="drawer"
  fixed
  temporary
  color="light-blue lighten-2">
    <v-list
    nav
    dense>
    <v-list-item-group>
      <v-list-item
      >
      <v-list-item-title>
        <router-link class="link" to="/create"><v-icon>mdi-pencil-plus-outline</v-icon>トロフィーを作る</router-link>
      </v-list-item-title>
      </v-list-item>
    <v-list-item>
        <v-list-item-title>
          <router-link class="link" to="/search"><v-icon>mdi-card-search</v-icon>トロフィーを探す</router-link>
        </v-list-item-title>
    </v-list-item>
    <v-list-item v-show="user.uid">
      <v-list-item-title>
        <router-link class="link" to="/mypage"><v-icon>mdi-home</v-icon>マイページ</router-link>
      </v-list-item-title>
    </v-list-item>
    </v-list-item-group>
    </v-list>
    <div class="d-flex mx-auto text-center" v-if="user.uid" key="login">
        <div class="twitter_user">
          <div class="user-name text-center">ユーザーネーム：{{ userName }}</div>
          <div class="user-photo text-center"><img :src="photoURL"></div>
        <v-btn
        color="white"
        class="signin mt-5" @click="logout"><v-icon>mdi-login-variant</v-icon>ログアウト
        </v-btn>
        </div>
    </div>
    <div class="text-center" v-else key="logout">
        <v-btn
        class="signin"
        color="white"
        @click="login"><v-icon>mdi-login-variant</v-icon>ログイン</v-btn>
    </div>
  </v-navigation-drawer>
  </header>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from "vuex"

export default {
  data(){
    return {
      user: {}, 
      drawer: false
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
  },
  methods: {
    signIn(){
      this.login()
      this.$router.push("/")
    },
    ...mapActions(["login", "logout"]),
  },
  computed:{
    ...mapGetters(["userName", "photoURL"])
  }
}
</script>

<style scoped lang="scss">
.v-toolbar__title {
  font-family: 'Kosugi Maru', sans-serif;
  overflow: visible !important;
  margin-right: 50px !important;
}

.link,
.signin
 {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-family: 'Kosugi Maru', sans-serif;
}

.signin {
  color: white;
  font-weight: bold;
  font-family: 'Kosugi Maru', sans-serif;
}

.login {
  margin-left: 40%;
  cursor:
  pointer;
}

.twitter_user {
  width: 800px;
}

.twitter_user > .user-name {
  color: white;
  font-weight: bold;
  line-height: 64px;
  white-space: nowrap;
}

.user-photo > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 10px;
}

.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}

.v-tabs {
  display: none;
 
  @include display_pc {
    display: block !important;
  }
}

@media screen and (max-width: 375px){
  .d-xs-none {
    display: none;
  }
}



</style>