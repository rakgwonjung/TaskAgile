import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// axios 부트스트랩
axios.defaults.baseURL = '/api'
// 응답을 json 형식으로만 받는다
axios.defaults.headers.common.Accpt = 'application/json'
// 에러를 전파하기 위한 인터셉터를 응답에 추가
axios.interceptors.response.use(
  reponse => response,
  (error) => {
    return Promise.reject(error)
  }
)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
