import Vue from 'vue';
import App from './App';
import './main'

new Vue({
  el: '#app',
  render: (h) => h(App),
})

console.log(process.env.NODE_ENV)