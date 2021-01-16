<template>
<div class="container">
  <div class="home">
    <div class="main__title">
     <p>作って遊ぶ × 達成して遊ぶ × ゲーム感覚で目標を達成しよう</p>
     <h1>トロフィージェネレーター</h1><br>
     <router-link to="/create"><v-btn rounded color="primary" dark>トロフィーを作る</v-btn></router-link><br>
    <br><h2>みんなが作ったトロフィー</h2>
    <br><h3>今 {{ trophies.length  }} 種類のトロフィーが作成されています</h3>
    </div>
  </div>
  <div class="trophy__table">
      <ul class="trophy__list">
        <li v-for="(trophy) in trophies" :key="trophy.id">
          <v-card
          class="mx-auto"
          max-width="400"
          >
            <v-card-title
            class="justify-center text__ristriction">{{ trophy.title }}</v-card-title>
            <v-card-subtitle
            class="text-center text__ristriction">{{ trophy.description}}</v-card-subtitle>
            <v-row
            class="row_class">
              <v-col cols="4">
                <v-img
                :class ="{getBronze :trophy.blonze.bronzeImage}"
                width="90"
                height="100"
                src="@/assets/img/blonze_trophy.png"></v-img>
                <p class="desc text__ristriction">{{ trophy.blonze.blonzeTitle }}</p>
                <v-btn
                @click="getBlonzeBtn(trophy)"
                width="90">{{ trophy.blonze.getBlonze ? "達成" : "未達成" }}</v-btn>
              </v-col>
              <v-col cols="4">
                <v-img
                :class ="{getSilver :trophy.silver.silverImage}"
                width="90"
                height="100"
                src="@/assets/img/silver_trophy.png"></v-img>
                <p class="desc text__ristriction">{{ trophy.silver.silverTitle }}</p>
                <v-btn
                @click="getSilverBtn(trophy)"
                width="90">{{ trophy.silver.getSilver ? "達成" : "未達成" }}</v-btn>
              </v-col>
              <v-col cols="4">
                <v-img
                :class ="{getGolden :trophy.golden.goldenImage}"
                width="90"
                height="100"
                src="@/assets/img/golden_trophy.png"></v-img>
                <p class="desc text__ristriction">{{ trophy.golden.goldenTitle }}</p>
                <v-btn
                @click="getGoldenBtn(trophy)"
                width="90">{{ trophy.golden.getGolden ? "達成" : "未達成" }}</v-btn>
              </v-col>
              <v-col cols="12"
              class="action__btn">
              <v-card-actions>
                <v-btn
                v-if="user.uid"
                color="primary"
                @click.prevent="register(trophy)"
                class="mr-5 mylist">マイリスト</v-btn>
              </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </li>
      </ul>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import db from "@/main.js"
import firebase from 'firebase'
import {mapActions} from "vuex"

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      link: "/create",
      trophy: {},
      trophies: []
      }
    },
    created(){
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    }),
    db.collection("trophies").get().then(trophy => {
      const array = [];
      trophy.forEach(val => {
        array.push(val.data());
        this.trophies = array;
      })
    })
    },
    methods: {
      register(trophy){
        if(this.$route.params.trophy_id){
          this.updateTrophy({id: this.$route.params.trophy_id, trophy: trophy})
        } else {
          this.checkTrophy(trophy)
        }
        this.$router.push("/mypage")
      },
      ...mapActions(["checkTrophy", "updateTrophy"]),
      getBlonzeBtn(trophy){
      trophy.blonze.getBlonze = !trophy.blonze.getBlonze;
      trophy.blonze.bronzeImage = !trophy.blonze.bronzeImage;
    },
    getSilverBtn(trophy){
      trophy.silver.getSilver = !trophy.silver.getSilver;
      trophy.silver.silverImage = !trophy.silver.silverImage;
    },
    getGoldenBtn(trophy){
      trophy.golden.getGolden = !trophy.golden.getGolden;
      trophy.golden.goldenImage = !trophy.golden.goldenImage;
    },
    },
  }
</script>

<style scoped>
  .container{
    width: 100%;
    font-family: 'Kosugi Maru', sans-serif;
  }
  .home {
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
  .trophy__list {
    list-style: none;
  }

  .desc {
    display: inline-block;
    width: 90px;
    text-align: center;
  }

  .row_class {
    margin-left: 5px;
  }

  .trophy__list {
  width: 1000px;
  margin: 30px auto;
  display: grid;
	grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  }

  .text__ristriction {
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    font-size: 2vw;
    font-size: 2vh;
  }
  .action__btn {
    display: flex;
    justify-content: center;
  }

  .getBronze,
.getSilver,
.getGolden {
  opacity: 0.3;
}

@media screen and (max-width: 375px){
  .container {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .trophy__list {
    padding: 0;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
 .trophy__list li {
   margin-top: 20px;
 }
 .main__title {
   font-size: 10px;
 }
 .mylist {
   margin-left: 8px !important;
 }

}
</style>
