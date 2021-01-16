<template>
  <div>
    <p class="text-center mt-10"><v-icon>mdi-magnify</v-icon>トロフィーを探す</p>
    <v-row>
      <v-col
      class="mx-auto"
       cols="md-6 xs-8">
        <v-text-field
        label="キーワードから検索"
        solo
        clearable
        v-model="keyword"></v-text-field>
      </v-col>
    </v-row>
      <div class="trophy__table">
          <ul class="trophy__list">
            <li v-for="(trophy) in filter" :key="trophy.title">
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
                    width="90"
                    height="100"
                    :class ="{getBronze :trophy.blonze.bronzeImage}"
                    src="@/assets/img/blonze_trophy.png"></v-img>
                    <p class="desc text__ristriction">{{ trophy.blonze.blonzeTitle }}</p>
                    <v-btn
                    width="90">{{ trophy.blonze.getBlonze ? "達成" : "未達成" }}</v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                    width="90"
                    height="100"
                    :class ="{getSilver :trophy.silver.silverImage}"
                    src="@/assets/img/silver_trophy.png"></v-img>
                    <p class="desc text__ristriction">{{ trophy.silver.silverTitle }}</p>
                    <v-btn
                    width="90">{{ trophy.silver.getSilver ? "達成" : "未達成" }}</v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                    width="90"
                    height="100"
                    :class ="{getGolden :trophy.golden.goldenImage}"
                    src="@/assets/img/golden_trophy.png"></v-img>
                    <p class="desc text__ristriction">{{ trophy.golden.goldenTitle }}</p>
                    <v-btn
                    width="90">{{ trophy.golden.getGolden ? "達成" : "未達成" }}</v-btn>
                  </v-col>
                  <v-col cols="12"
                  class="action__btn"
                  v-if="user.uid">
                  <v-card-actions>
                    <v-btn
                    color="primary"
                      @click="register(trophy)"
                      class="mr-5">マイリスト</v-btn>
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
import db from "@/main.js"
import {mapActions} from "vuex"
import firebase from "firebase"

export default {
  data(){
    return {
      keyword: "",
      trophies:[]
    }
  },
  computed: {
    filter(){
      let trophies = [];
      for(let i in this.trophies) {
        let trophy = this.trophies[i]
        if(trophy.title.indexOf(this.keyword) !== -1){
          trophies.push(trophy)
        }
      }
      return trophies
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
  },
  mounted(){
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
      ...mapActions(["checkTrophy", "updateTrophy"])
  }
}
</script>

<style>
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

@media screen and (max-width:560px) {
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
 .v-application ul, .v-application ol {
    padding-left: 0px;
}
}

</style>