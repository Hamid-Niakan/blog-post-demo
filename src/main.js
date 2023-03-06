import * as Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'

const app = Vue.createApp(App)

const axiosInstance = axios.create({
  baseURL: 'https://stoplight.io/mocks/diginext-interview/website-interviews/144194864/',
  headers: {
    'Content-Type': 'application/json',
  },
})

app.use(VueAxios, axiosInstance)

app.mount('#app')