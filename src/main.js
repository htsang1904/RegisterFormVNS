import Vue from 'vue'
import App from './App.vue'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
Vue.config.productionTip = false
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);


const messages = {
  en: {
    message: {
      titleGroupItem1: 'Candidate information',
    },
  },
  vi: {
    message: {
      titleGroupItem1: 'Thông tin thí sinh',
    },
  },
};
const i18n = new VueI18n({
  locale: 'en',
  messages,
});
new Vue({
   i18n,
  render: h => h(App),
}).$mount('#app')
