<template>
  <div>
    <h2
    class="text-center mt-5"
    >マイトロフィー</h2>
      <ul class="trophy__list">
        <li v-for="(trophy) in trophies" :key="trophy.id">
          <button
          @click.prevent="deleteConfirm(trophy.id)"><v-icon>mdi-close</v-icon></button>
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
                @click.stop="getBlonzeBtn(trophy); update(trophy)"
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
                @click.prevent="getSilverBtn(trophy); update(trophy)"
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
                @click.prevent="getGoldenBtn(trophy); update(trophy)"
                width="90">{{ trophy.golden.getGolden ? "達成" : "未達成" }}</v-btn>
              </v-col>
              <v-btn
              color="orange lighten-2"
              class="complete white--text"
              width="180"
              v-if="trophy.blonze.getBlonze === true && trophy.silver.getSilver === true && trophy.golden.getGolden === true" @click="getComplete(trophy)">トロコンした！</v-btn>
            </v-row>
          </v-card>
            <v-overlay :value="trophy.overlay">{{ trophy.overlayText }}<v-btn @click="trophy.overlay = false">閉じる</v-btn></v-overlay>
        </li>
      </ul>
  </div>
</template>

<script>
// import firebase from 'firebase'
import {mapGetters, mapActions} from "vuex"
import db from "@/main.js"

export default {
  name: "mypage",
  data(){
    return {
      trophies: [],
      trophy: {}
    }
  },
  computed: {
    ...mapGetters(["uid", "getTrophByID"])
    },
  created(){
    this.trophies = this.$store.state.trophies
  },
  methods: {
    getBlonzeBtn(trophy){
      trophy.blonze.getBlonze = !trophy.blonze.getBlonze
      trophy.blonze.bronzeImage = !trophy.blonze.bronzeImage
    },
    getSilverBtn(trophy){
      trophy.silver.getSilver = !trophy.silver.getSilver
      trophy.silver.silverImage = !trophy.silver.silverImage
    },
    getGoldenBtn(trophy){
      trophy.golden.getGolden = !trophy.golden.getGolden
      trophy.golden.goldenImage = !trophy.golden.goldenImage
    },
    update(trophy){
      db.collection(`users/${this.uid}/trophies`).doc(trophy.id).update(trophy)
    },
    getComplete(trophy){
        trophy.overlay = !trophy.overlay
    },
    deleteConfirm(id){
      if(confirm("削除してよろしいですか？")){
        this.deleteTrophy({id})
      }
    },
    ...mapActions(["deleteTrophy"])
  }
}
</script>

<style scoped>
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

  .complete {
    margin: 10px 100px;
  }

  @media screen and (max-width:560px) {
    .trophy__list {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>