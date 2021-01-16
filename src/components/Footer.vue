<template>
  <v-footer
  class="footer"
  padless
  color="grey darken-3"
  >
   <v-row
   justify="center"
   no-gutters>
    <v-btn
      v-for="link in links"
      :key="link.title"
      color="white"
      text
      rounded
      class="my-1 footer__title"
      :to="link.url"
    >
      {{ link.title }}
    </v-btn>
    <v-col
        class="grey darken-3 py-1 text-center white--text"
        cols="12"
      >
       Copyright &copy; 2021 — <strong>トロフィージェネレーター</strong>
    </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data(){
    return {
      links: [
        {title: "利用規約", url: "/rule"},
        {title: "お問い合わせ", url: "/contact"},
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 50px;
}

.footer__title {
  margin: 0 20px;
}

</style>