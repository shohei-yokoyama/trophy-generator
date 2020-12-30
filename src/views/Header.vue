<template>
  <v-app-bar
  app
  color="light-blue lighten-2">
     <v-toolbar-title>
       <router-link class="link" to="/"><v-icon></v-icon>トロフィージェネレーター</router-link>
     </v-toolbar-title>
       <div><v-toolbar-items><router-link class="link" to="#"><v-icon>mdi-pencil-plus-outline</v-icon>トロフィーを作る</router-link></v-toolbar-items></div>
       <div><v-toolbar-items><router-link class="link" to="#"><v-icon>mdi-card-search</v-icon>トロフィーを探す</router-link></v-toolbar-items></div>
       <div><v-toolbar-items><router-link class="link" to="#"><v-icon>mdi-crown</v-icon>ランキング</router-link></v-toolbar-items></div>
       <!-- <v-spacer></v-spacer> -->
       <div class="login"><v-toolbar-items><router-link class="link" to="#"><v-icon>mdi-login-variant</v-icon>ログイン</router-link></v-toolbar-items></div>

  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style scoped>
v-app-bar {
  /* width: 100%; */
  text-align: center;
}
v-toolbar-title {
  width: 100%;
}
.link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 0 10px;
  margin: 0 auto;
}

.login {
  margin-left: 40%;
}


</style>