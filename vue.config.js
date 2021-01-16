module.exports = {
  publicPath: "",
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/common/common.scss";`
      }
    }
  }
}