<template>
  <div class="text-center">
    <div class="login-text">
    <p class="mt-10 pt-10">ボタンをクリックするとTwitterログイン画面に移動します</p>
    <v-btn
    large
    color="primary"
    class="mt-5 mb-5 btn-text"
    @click="login"><v-icon>mdi-twitter</v-icon>Twitterでログインする
    </v-btn>
     </div>
    <h3 class="mt-10">Twitterログインについて</h3>
    <p class="mt-5">ユーザー情報を保持するためにTwitterアカウントの連携を必要としています。</p>
    <div class="list">
    <ul>
      <li>・連携許可をログイン以外の目的で使用することはありません。</li>
      <li>・あなたのアカウントから勝手にツイートすることはありません。</li>
      <li>・DMなどを勝手に送信することはありません。</li>
    </ul>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    login(){
      this.$store.dispatch("login")
      this.$router.push("/")
    },
  }
}
</script>

<style scoped>
  div {
  font-family: 'Kosugi Maru', sans-serif;
  }

  .login-text {
    background: #BBDEFB;
    width: 50%;
    height: 200px;
    margin: 20px auto;
  }

  .btn-text {
    font-weight: bold;
  }

  ul {
    list-style: none;
  }

  li {
    text-align: left;
  }

  .list {
    width: 30%;
    white-space: nowrap;
    margin: 0 auto;
  }

  @media screen and (max-width: 375px) {
    .text-center,
    .login-text,
    .list {
      width: 100%;
      white-space:normal ;
    }
  }

</style>