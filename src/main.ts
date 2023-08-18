import {createSSRApp } from "vue";
import Vue from 'vue'
import Vuex from 'vuex'
import App from "./App.vue";
import userMainStore from "./common/store/index"
import loginStore from "./common/store/login"
import userPlayer from "./common/store/userPlayer"
import userStore from "./common/store/userStore"

export function createApp() {
  const app = createSSRApp(App);
  app.use(userMainStore);
  app.use(loginStore);
  app.use(userPlayer);
  app.use(userStore);  
  return {
    app,
  };
}
