<template>
  <div class="create">
    <div class="form">
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      <v-text-field
      :counter="50"
      required
      label="タイトル"
      placeholder="例：人間的な生活を送るトロフィー"
      v-model="title"
      :rules="titleRules"></v-text-field>
      <v-text-field
      :counter="50"
      placeholder="例：人間的な生活を達成したときにもらえるトロフィーです"
      label="説明"
      v-model="description"></v-text-field>
      <div class="blonze">
      <img src="@/assets/img/blonze_trophy.png"><v-text-field
      :counter="50"
      placeholder="例：朝ちゃんと起きた"
      label="ブロンズトロフィー"
      :rules="blonzeRules"
      required
      v-model="blonze.blonzeTitle"></v-text-field>
      </div>
      <div class="silver">
      <img src="@/assets/img/silver_trophy.png"><v-text-field
      :counter="50"
      required
      placeholder="例：ご飯をちゃんと食べた"
      label="シルバートロフィー"
      :rules="silverRules"
      v-model="silver.silverTitle"></v-text-field>
      </div>
      <div class="golden">
      <img src="@/assets/img/golden_trophy.png"><v-text-field
      :counter="50"
      required
      placeholder="例：外に出た"
      label="ゴールデントロフィー"
      :rules="goldenRules"
      v-model="golden.goldenTitle"></v-text-field>
      </div>
      <div class="completetext">
        <v-text-field
        :counter="50"
        placeholder="例：おめでとう！"
        label="トロコンしたときのメッセージ"
        required
        :rules="overlayRules"
        v-model="overlayText"
        >
        </v-text-field>
      </div>
      <v-btn
      color="primary"
      :disabled="!valid"
      class="mr-4" @click="addTrophy">作成する</v-btn>
    </v-form>
    </div>
    <p class="preview__title">プレビュー</p>
    <v-card
    class="mx-auto xs"
    max-width="800">
      <v-card-title class="justify-center card-title" v-model="title">{{ title }}</v-card-title>
      <v-row
      class="row_class">
        <v-col cols="4">
        <v-img
        :class ="{getBronze :blonze.bronzeImage}"
        width="180"
        height="200"
        src="@/assets/img/blonze_trophy.png"></v-img>
        <p class="sub-title">{{ blonze.blonzeTitle }}</p>
        <v-btn class="responsive" width="180" @click.stop="getBlonzeBtn">{{ blonze.getBlonze ? "達成" : "未達成" }}</v-btn>
        </v-col>
      <v-col cols="4">
      <v-img
      :class ="{getSilver :silver.silverImage}"
      width="180"
      height="200"
      src="@/assets/img/silver_trophy.png"></v-img>
      <p class="sub-title">{{ silver.silverTitle }}</p>
      <v-btn
      class="responsive"
      width="180" @click.stop="getSilverBtn">{{ silver.getSilver ? "達成" : "未達成" }}</v-btn>
      </v-col>
      <v-col cols="4">
      <v-img
      :class ="{getGolden :golden.goldenImage}"
      width="180"
      height="200"
      src="@/assets/img/golden_trophy.png"></v-img>
      <p class="sub-title">{{ golden.goldenTitle }}</p>
      <v-btn class="responsive" width="180" @click.stop="getGoldenBtn">{{ golden.getGolden ? "達成" : "未達成" }}</v-btn>
      </v-col>
      <v-btn
      color="orange lighten-2"
      class="complete white--text responsive"
      width="180"
      v-if="blonze.getBlonze === true && silver.getSilver === true && golden.getGolden === true" @click="getComplete">トロコンした！</v-btn>
      </v-row>
    </v-card>
      <v-overlay :value="overlay">{{ overlayText }}<v-btn @click="overlay = false">閉じる</v-btn></v-overlay>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data(){
    return {
      user: {},
      id: "",
      trophy_id: "",
      title: "",
      titleRules: [
        v => !!v || "タイトルは必須です",
        v => (v && v.length < 50) || "タイトルは50文字以内にしてください"
      ],
      description:"",
      blonze: {
        blonzeTitle: "",
        getBlonze: false,
        bronzeImage: true,
      },
      blonzeRules: [
        v => !!v || "トロフィー名は必須です",
        v => (v && v.length < 50) || "トロフィー名は50文字以内にしてください"
      ],
      silver: {
        silverTitle: "",
        getSilver: false,
        silverImage: true,
      },
      silverRules: [
        v => !!v || "トロフィー名は必須です",
        v => (v && v.length < 50) || "トロフィー名は50文字以内にしてください"
      ],
      golden: {
        goldenTitle: "",
        getGolden: false,
        goldenImage: true,
      },
      goldenRules: [
        v => !!v || "トロフィー名は必須です",
        v => (v && v.length < 50) || "トロフィー名は50文字以内にしてください"
      ],
      completeCount: 0,
      myListCount: 0,
      overlay: false,
      overlayRules: [
        v => !!v || "メッセージは必須です",
        v => (v && v.length < 50) || "メッセージは50文字以内にしてください"
      ],
      overlayText: "",
      valid: true,
    }
  },
  created(){
      firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
  },
  methods: {
    getBlonzeBtn(){
      this.blonze.getBlonze = !this.blonze.getBlonze;
      this.blonze.bronzeImage = !this.blonze.bronzeImage;
    },
    getSilverBtn(){
      this.silver.getSilver = !this.silver.getSilver;
      this.silver.silverImage = !this.silver.silverImage;
    },
    getGoldenBtn(){
      this.golden.getGolden = !this.golden.getGolden;
      this.golden.goldenImage = !this.golden.goldenImage;
    },
    getComplete(){
      if(this.blonze.getBlonze === true && this.silver.getSilver === true && this.golden.getGolden === true) {
        this.overlay = !this.overlay
      } else {
        this.overlay = false
      }
    },
    checkValidate(){
      this.$refs.form.validate()
    },
    addTrophy(){
      if(this.$refs.form.validate()){
      const collection = firebase.firestore().collection("trophies");
      collection.add({
        user: this.$store.getters.uid,
        id: "",
        trophy_id: "",
        title: this.title,
        description: this.description,
        blonze: {
        blonzeTitle: this.blonze.blonzeTitle,
        getBlonze: false,
        bronzeImage: true,
       },
      silver: {
        silverTitle: this.silver.silverTitle,
        getSilver: false,
        silverImage: true,
      },
      golden: {
        goldenTitle: this.golden.goldenTitle,
        getGolden: false,
        goldenImage: true,
      },
      completeCount: 0,
      myListCount: 0,
      overlay: false,
      overlayText: this.overlayText
      }).then(doc => {
        collection.doc(doc.id).update({
          id : doc.id,
          trophy_id : doc.id
        })
      })
      this.$router.push("/")
      }
    }
  }
}
</script>

<style lang="scss">
  .create {
    width: 100%;
    height: 100vh;
    font-family: 'Kosugi Maru', sans-serif;
  }
  .form {
    width: 400px;
    margin: 50px auto;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .blonze,
  .silver,
  .golden {
    display: flex;
  }

  .sub-title {
    display: inline-block;
    width: 180px;
    text-align: center;
  }

  .preview__title {
    text-align: center;
  }
  .card-title {
    text-align: center;
  }

  .row_class {
    margin-left: 40px;
  }

  .complete {
    margin: 20px 279px;
  }

.getBronze,
.getSilver,
.getGolden {
  opacity: 0.3;
}

@media screen and (max-width: 375px) {
  .create {
    width: 100%;
  }
  .xs {
    width: 100%;
  }
  .row_class {
    margin: 0;
  }
  .v-image__image--cover {
    background-size: contain !important;
  }
  .responsive {
    width: 99.33px !important;
    &.complete {
      width: 120px !important;
    }
  }
  .complete {
    margin: 0 auto;
  }
  .form {
    margin: 0;
  }

}
</style>