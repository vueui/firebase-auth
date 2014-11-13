
var Vue = require('vue');
var vueFirebaseAuth = require('..');

Vue.use(vueFirebaseAuth);

window.app = new Vue({
    events: {
        'signup:success': function (user) {
            console.log('New user ...', user);
        },
        'login:success': function (authData) {
            console.log('App user is now logged in. Do something else.');
            console.log(authData);
        }
    }
}).$mount('#app');
window.auth = app.$.auth;
