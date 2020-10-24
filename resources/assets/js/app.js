

require('./bootstrap');

window.Vue = require('vue');

Vue.component('navbar-component', require('./components/NavBarComponent.vue').default);
Vue.component('articles-component', require('./components/ArticlesComponent.vue').default);

const app = new Vue({
    el: '#app'
});
